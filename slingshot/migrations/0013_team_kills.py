# Generated by Django 2.2.6 on 2020-01-23 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slingshot', '0012_user_kills'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='kills',
            field=models.PositiveIntegerField(default=0),
        ),
    ]