# Generated by Django 2.2.6 on 2020-02-27 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='scorecard',
            name='name',
            field=models.SmallIntegerField(blank=True, null=True),
        ),
    ]