# Generated by Django 2.2.6 on 2020-01-19 15:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0038_tournament_start_date_time'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tournament',
            name='start_date_time',
        ),
    ]
