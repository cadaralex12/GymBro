# Generated by Django 4.1.5 on 2023-05-31 15:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0014_alter_weightentry_date_added'),
    ]

    operations = [
        migrations.AlterField(
            model_name='weightentry',
            name='date_added',
            field=models.DateField(),
        ),
    ]
