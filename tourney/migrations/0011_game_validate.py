# Generated by Django 2.2.6 on 2019-10-26 20:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('slingshot', '0001_initial'),
        ('tourney', '0010_delete_game_validate'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game_validate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gameName', models.CharField(blank=True, max_length=60)),
                ('gameId', models.CharField(blank=True, max_length=60)),
                ('userName', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to='slingshot.User')),
            ],
        ),
    ]
