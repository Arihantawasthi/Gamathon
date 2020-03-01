# Generated by Django 2.2.6 on 2020-02-29 17:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('slingshot', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('org_name', models.CharField(max_length=60, primary_key=True, serialize=False)),
                ('org_desc', models.TextField(blank=True, max_length=500)),
                ('org_logo', models.ImageField(blank=True, upload_to='media/organazition/profile-pics')),
                ('org_email', models.CharField(blank=True, max_length=60)),
                ('org_website', models.CharField(blank=True, max_length=60)),
                ('org_insta', models.CharField(blank=True, max_length=60)),
                ('org_twitter', models.CharField(blank=True, max_length=60)),
                ('org_twitch', models.CharField(blank=True, max_length=60)),
                ('org_youtube', models.CharField(blank=True, max_length=60)),
                ('org_discord', models.CharField(blank=True, max_length=60)),
                ('org_owner', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='org', to='slingshot.User')),
            ],
        ),
        migrations.CreateModel(
            name='Notification',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('update', models.TextField(blank=True, max_length=300)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('org', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='org', to='organize.Organization')),
                ('team', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_notification', to='slingshot.Team')),
                ('user_1', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_1', to='slingshot.User')),
                ('user_2', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_2', to='slingshot.User')),
            ],
            options={
                'ordering': ('-created',),
            },
        ),
    ]
