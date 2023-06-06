from django.db import models
from datetime import date

# Create your models here.

class Exercise(models.Model):
    exercise_name = models.CharField(max_length=100, default='', unique=True)
    weight = models.IntegerField(null=False, default=1)
    sets = models.IntegerField(null=False, default=1)
    reps = models.IntegerField(null=False, default=1)
    id_for_user = models.IntegerField(null=False, default=1)
    date = models.DateField(null=False, default=date.today)


class WeightEntry(models.Model):
    user_id = models.IntegerField(null=False, default=1)
    weight = models.IntegerField(null=False, default=1)
    date_added = models.DateField(null=False)

class MyUser(models.Model):
    email = models.EmailField(verbose_name='email address', max_length=255)
    username = models.CharField(max_length=25, unique=True)
    password = models.CharField(max_length=50)
    fb_id = models.CharField(max_length=100, default='')
    fb_access_token = models.CharField(max_length=100, default='')

    def __str__(self):
        return self.email + self.username + self.password

    def getUsername(self):
        return self.username