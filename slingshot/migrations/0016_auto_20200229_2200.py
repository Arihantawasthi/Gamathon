# Generated by Django 2.2.6 on 2020-02-29 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slingshot', '0015_auto_20200221_1155'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AddField(
            model_name='user',
            name='points',
            field=models.PositiveIntegerField(default=0),
        ),
    ]