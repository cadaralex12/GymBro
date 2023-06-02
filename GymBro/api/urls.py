from django.urls import path
from .views import UserList, ExerciseList, ExerciseDetail, find_user, print_exercise_as_id, UserDetail, password_recovery_view, show_exercises_view, create_weight_entry, get_weight_data

urlpatterns = [
    path("users/", UserList.as_view()),
    path("users/login/", find_user),
    path("users/<int:id>/", UserDetail.as_view()),
    path("exercise/", ExerciseList.as_view()),
    path("exercise/print/", print_exercise_as_id),
    path("exercise/<int:id>/", ExerciseDetail.as_view()),
    path("password-recovery/", password_recovery_view, name='password_recovery'),
    path('exercise_list/<str:muscle>/', show_exercises_view, name='exercises'),
    path('weight/', create_weight_entry),
    path('weight-data/', get_weight_data),

]
