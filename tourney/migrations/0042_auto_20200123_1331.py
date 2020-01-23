# Generated by Django 2.2.6 on 2020-01-23 08:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0041_auto_20200123_1322'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tournament',
            name='announcement',
        ),
        migrations.RemoveField(
            model_name='tournament',
            name='prizes',
        ),
        migrations.AddField(
            model_name='announcements',
            name='tour',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tour_ann', to='tourney.Tournament'),
        ),
        migrations.AddField(
            model_name='prize',
            name='tour',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tour_prize', to='tourney.Tournament'),
        ),
    ]
