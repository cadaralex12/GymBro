from django.urls import path
from .views import UserList, ExerciseList, ExerciseDetail, find_user, print_exercise_as_id, UserDetail

urlpatterns = [
    path("users/", UserList.as_view()),
    path("users/login/",find_user),
    path("users/<int:id>/", UserDetail.as_view()),
    path("exercise/", ExerciseList.as_view()),
    path("exercise/print/", print_exercise_as_id),
    path("exercise/<int:id>/", ExerciseDetail.as_view()),
]