from django.shortcuts import render
from rest_framework import generics, mixins
from .models import MyUser, Exercise, WeightEntry
from .serializers import  UserSerializer, ExerciseSerializers, UserLoginSerializer, PasswordRecoverySerializer, WeightEntrySerializer
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from django.views.decorators.csrf import csrf_exempt
from passlib.handlers.django import django_pbkdf2_sha256
from social_django.utils import load_backend, load_strategy
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
import datetime as dt
import random
import string
import requests



class ExerciseList(generics.GenericAPIView, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializers

    def get(self, request):
        return self.list(request)

    def post(self, request):
        return self.create(request)

class ExerciseDetail(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = Exercise.objects.all()
    serializer_class = ExerciseSerializers

    lookup_field = 'id'

    def get(self, request, id):
        return self.retrieve(request, id=id)
    
    def put(self, request, id):
        return self.update(request, id=id)

    def delete(self, request, id):
        return self.destroy(request, id=id)

class UserList(generics.GenericAPIView, mixins.ListModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, mixins.CreateModelMixin):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer
    def get(self, request):
        return self.list(request)
    def post(self, request):
        return self.create(request)

class UserDetail(generics.GenericAPIView, mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin):
    queryset = MyUser.objects.all()
    serializer_class = UserSerializer

    lookup_field = 'id'

    def get(self, request, id):
        return self.retrieve(request, id=id)
    
    def put(self, request, id):
        return self.update(request, id=id)

    def delete(self, request, id):
        return self.destroy(request, id=id)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def find_user(request):
    user_dto = UserLoginSerializer(data=request.data)
    if user_dto.is_valid():
        email = user_dto.data.get('email')
        password = user_dto.data.get('password')
        access_token = user_dto.data.get('accessToken')

        if access_token:
            strategy = load_strategy(request)
            backend = load_backend(strategy, 'facebook', redirect_uri=None)
            user = backend.do_auth(access_token)

            if user:
                return Response('User authenticated with Facebook')
            else:
                return Response('User authentication failed')

        else:
            userrr = MyUser.objects.all().filter(email=email).first()
            if userrr and django_pbkdf2_sha256.verify(password, userrr.password):
                return Response(UserSerializer(userrr).data, status=status.HTTP_200_OK)
            else:
                return Response("Incorrect Password/Username", status=status.HTTP_404_NOT_FOUND)

    return Response(user_dto.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['POST', 'GET'])
@permission_classes([AllowAny])
def print_exercise_as_id(request):
    if request.method == 'POST':
        serz_data = ExerciseSerializers(data=request.data)
        print(serz_data.is_valid())
        print(serz_data.errors)
        if (serz_data.is_valid() ):
            my_user_id = serz_data.data.get('id_for_user')
            print(my_user_id)
            exs = Exercise.objects.all().filter(id_for_user=my_user_id)
            print(exs)
            exs_dto = ExerciseSerializers(exs, many=True, context={'request': request})
            return Response(exs_dto.data, status=status.HTTP_202_ACCEPTED)
    return Response('BAD REQUEST', status=status.HTTP_400_BAD_REQUEST)


def generate_random_password(length=10):
    chars = string.ascii_letters + string.digits
    password = ''.join(random.choice(chars) for _ in range(length))
    return password

@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def password_recovery_view(request):
    if request.method == 'POST':
        serializer = PasswordRecoverySerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = get_object_or_404(MyUser, email=email)

            new_password = generate_random_password()
            hashed_password = django_pbkdf2_sha256.hash(new_password)

            user.password = hashed_password
            user.save()
            send_mail(
                'Password Recovery',
                f'Your new password for the GymBro Application is: {new_password} . If you did not request a new password please ignore this e-mail',
                'gymbrobot@fastmail.com',
                [email],
                fail_silently=False,
            )

            return JsonResponse({'message': 'Password recovery email sent successfully'}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)
    else:
        return JsonResponse({'message': 'Invalid request method'}, status=405)
    

def show_exercises_view(request):
    muscle = request.GET.get('muscle')

    api_url = 'https://api.api-ninjas.com/v1/exercises?muscle={}'.format(muscle)
    response = requests.get(api_url, headers={'X-Api-Key': 'kbsYXWFOCaLT1/F8qkcYyQ==Ci6bZf7TUE1KWUdH'}) #My API Key

    if response.status_code == requests.codes.ok:
        exercises = response.json()
        return JsonResponse(exercises, safe=False)
    else:
        return JsonResponse({'error': response.status_code})

@api_view(['POST'])
def create_weight_entry(request):
    if request.method == 'POST':
        serializer = WeightEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['date_added'] = dt.date.today()
            #print(dt.date.today)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET'])
def get_weight_data(request):
    user_id = request.query_params.get('user_id', None)
    
    if user_id is not None:
        weight_entries = WeightEntry.objects.filter(user_id=user_id)
    else:
        weight_entries = WeightEntry.objects.all()
    
    serializer = WeightEntrySerializer(weight_entries, many=True)
    return Response(serializer.data)