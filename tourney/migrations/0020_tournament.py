# Generated by Django 2.2.6 on 2019-10-28 13:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('slingshot', '0001_initial'),
        ('tourney', '0019_delete_tournament'),
    ]

    operations = [
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=60)),
                ('participants', models.PositiveIntegerField(blank=True, default=0)),
                ('sponsor', models.CharField(blank=True, max_length=50)),
                ('organizer', models.CharField(default='Gamathon', max_length=50)),
                ('entry_fee', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('banner', models.ImageField(blank=True, upload_to='tournament/banners')),
                ('prize_pool', models.PositiveIntegerField(blank=True, default=0)),
                ('start_date', models.DateField(blank=True)),
                ('start_time', models.TimeField(blank=True)),
                ('limit', models.PositiveIntegerField(blank=True, default=0)),
                ('status', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('rules', models.TextField(blank=True, max_length=500)),
                ('contact', models.TextField(blank=True, max_length=400)),
                ('schedule', models.TextField(blank=True, max_length=600)),
                ('tour_nature', models.CharField(blank=True, max_length=60)),
                ('tour_type', models.CharField(blank=True, max_length=60)),
                ('place_1', models.PositiveIntegerField(blank=True, default=0)),
                ('place_2', models.PositiveIntegerField(blank=True, default=0)),
                ('place_3', models.PositiveIntegerField(blank=True, default=0)),
                ('place_5', models.PositiveIntegerField(blank=True, default=0)),
                ('place_6', models.PositiveIntegerField(blank=True, default=0)),
                ('place_7', models.PositiveIntegerField(blank=True, default=0)),
                ('place_8', models.PositiveIntegerField(blank=True, default=0)),
                ('place_9', models.PositiveIntegerField(blank=True, default=0)),
                ('place_10', models.PositiveIntegerField(blank=True, default=0)),
                ('player', models.ManyToManyField(blank=True, related_name='participant', to='slingshot.User')),
                ('team', models.ManyToManyField(blank=True, related_name='team', to='slingshot.Team')),
                ('tour_game', models.ManyToManyField(blank=True, related_name='tour_game', to='tourney.Game')),
                ('winner', models.ManyToManyField(blank=True, related_name='winner', to='slingshot.User')),
            ],
        ),
    ]
