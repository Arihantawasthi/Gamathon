# Generated by Django 2.2.6 on 2020-02-29 17:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamestat',
            name='deaths',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='gamestat',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
