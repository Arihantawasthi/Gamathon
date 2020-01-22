# Generated by Django 2.2.6 on 2019-10-27 00:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0015_auto_20191026_2310'),
    ]

    operations = [
        migrations.AddField(
            model_name='tournament',
            name='entry_fee',
            field=models.PositiveSmallIntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='tournament',
            name='organizer',
            field=models.CharField(default='Gamathon', max_length=50),
        ),
        migrations.AddField(
            model_name='tournament',
            name='participants',
            field=models.PositiveIntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='tournament',
            name='sponsor',
            field=models.CharField(blank=True, max_length=50),
        ),
    ]
