# Generated by Django 4.1.5 on 2023-01-11 18:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("api", "0002_user"),
    ]

    operations = [
        migrations.CreateModel(
            name="Exercise",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "exercise_name",
                    models.CharField(default=1, max_length=50, unique=True),
                ),
                ("weight", models.IntegerField(default=1)),
                ("sets", models.IntegerField(default=1)),
                ("reps", models.IntegerField(default=1)),
            ],
        ),
    ]
