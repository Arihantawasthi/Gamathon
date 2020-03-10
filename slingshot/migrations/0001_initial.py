# Generated by Django 2.2.6 on 2020-03-09 14:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('name', models.CharField(max_length=50)),
                ('username', models.CharField(max_length=50, primary_key=True, serialize=False)),
                ('email', models.EmailField(max_length=50)),
                ('password', models.CharField(max_length=100)),
                ('profile_pic', models.ImageField(blank=True, default='user/profile/default.jpg', upload_to='user/profile')),
                ('profile_back', models.ImageField(blank=True, default='user/profile/default-back.jpg', upload_to='user/profile')),
                ('bio', models.TextField(blank=True, default='', max_length=300)),
                ('date_joined', models.DateTimeField(auto_now_add=True, null=True)),
                ('wallet', models.PositiveIntegerField(blank=True, default=0)),
                ('earnings', models.PositiveIntegerField(blank=True, default=0)),
                ('wins', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('loss', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('tie', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('kills', models.PositiveIntegerField(default=0)),
                ('points', models.PositiveIntegerField(default=0)),
                ('is_active', models.BooleanField(default=False)),
                ('followers', models.ManyToManyField(related_name='followed_by', to='slingshot.User')),
            ],
        ),
        migrations.CreateModel(
            name='Team',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('logo', models.ImageField(blank=True, default='team/profile/default.jpg', upload_to='team/profile')),
                ('team_banner', models.ImageField(blank=True, default='team/profile/default-back.jpg', upload_to='team/profile')),
                ('password', models.CharField(blank=True, max_length=30, null=True)),
                ('captain', models.CharField(max_length=50)),
                ('wallet', models.PositiveIntegerField(blank=True, default=0)),
                ('earnings', models.PositiveIntegerField(blank=True, default=0)),
                ('wins', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('loss', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('tie', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('kills', models.PositiveIntegerField(default=0)),
                ('points', models.PositiveIntegerField(default=0)),
                ('members', models.ManyToManyField(blank=True, related_name='members', to='slingshot.User')),
            ],
        ),
        migrations.CreateModel(
            name='Invite',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.PositiveSmallIntegerField(blank=True, null=True)),
                ('team', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_name', to='slingshot.Team')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_name', to='slingshot.User')),
            ],
        ),
        migrations.AddIndex(
            model_name='user',
            index=models.Index(fields=['username'], name='slingshot_u_usernam_ccacb7_idx'),
        ),
    ]
