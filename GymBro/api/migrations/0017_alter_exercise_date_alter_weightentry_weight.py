# Generated by Django 4.1.5 on 2023-06-11 18:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_exercise_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='exercise',
            name='date',
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AlterField(
            model_name='weightentry',
            name='weight',
            field=models.FloatField(default=1),
        ),
    ]
