# Generated by Django 2.2.6 on 2020-02-03 00:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slingshot', '0013_team_kills'),
    ]

    operations = [
        migrations.AlterField(
            model_name='team',
            name='team_banner',
            field=models.ImageField(blank=True, default='team/profile/default-back.jpg', upload_to='team/profile'),
        ),
        migrations.AlterField(
            model_name='user',
            name='profile_back',
            field=models.ImageField(blank=True, default='user/profile/default-back.jpg', upload_to='user/profile'),
        ),
    ]
