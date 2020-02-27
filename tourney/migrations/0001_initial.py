# Generated by Django 2.2.6 on 2020-02-26 07:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('slingshot', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Game',
            fields=[
                ('name', models.CharField(max_length=60, primary_key=True, serialize=False)),
                ('fullname', models.CharField(max_length=60)),
                ('bg_image', models.ImageField(blank=True, upload_to='games/bg_images')),
                ('card_image', models.ImageField(blank=True, upload_to='games/card_images')),
                ('water_image', models.ImageField(blank=True, upload_to='games/water_marks')),
            ],
        ),
        migrations.CreateModel(
            name='Match',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('match_name', models.CharField(blank=True, max_length=20)),
                ('match_number', models.PositiveSmallIntegerField(default=0)),
                ('map_name', models.CharField(blank=True, max_length=10)),
                ('match_status', models.SmallIntegerField(blank=True, null=True)),
                ('start_time', models.TimeField(blank=True, null=True)),
                ('start_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tournament',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=60)),
                ('desc', models.CharField(blank=True, max_length=500, null=True)),
                ('participants', models.PositiveIntegerField(blank=True, default=0)),
                ('sponsor', models.CharField(blank=True, max_length=50)),
                ('organizer', models.CharField(blank=True, default='Gamathon', max_length=20)),
                ('entry_fee', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('banner', models.ImageField(default='tournament/banners/default-banner.jpg', upload_to='tournament/banners')),
                ('logo', models.ImageField(default='tournament/logos/default-logo.png', upload_to='tournament/logos')),
                ('sponsor_logo', models.ImageField(default='tournament/sponsors/sponsor-logo.png', upload_to='tournament/sponsors')),
                ('organizer_logo', models.ImageField(default='tournament/organizers/organizer-logo.png', upload_to='tournament/organizers')),
                ('prize_pool', models.PositiveIntegerField(blank=True, default=0)),
                ('start_date', models.DateField(blank=True)),
                ('start_time', models.TimeField(blank=True)),
                ('limit', models.PositiveIntegerField(blank=True, default=0)),
                ('status', models.PositiveSmallIntegerField(blank=True, default=0)),
                ('rules', models.TextField(blank=True, max_length=50000)),
                ('contact', models.TextField(blank=True, max_length=400)),
                ('schedule', models.TextField(blank=True, max_length=600)),
                ('tour_nature', models.CharField(blank=True, max_length=60)),
                ('tour_type', models.CharField(blank=True, max_length=60)),
                ('player', models.ManyToManyField(blank=True, related_name='participant', to='slingshot.User')),
                ('team', models.ManyToManyField(blank=True, related_name='team', to='slingshot.Team')),
                ('tour_game', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='tour_game', to='tourney.Game')),
                ('winner', models.ManyToManyField(blank=True, related_name='winner', to='slingshot.User')),
            ],
        ),
        migrations.CreateModel(
            name='Stage',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stage_name', models.CharField(blank=True, max_length=20)),
                ('solo', models.ManyToManyField(blank=True, related_name='solo_stage', to='slingshot.User')),
                ('team', models.ManyToManyField(blank=True, related_name='team_stage', to='slingshot.Team')),
                ('tour', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tourney_stage', to='tourney.Tournament')),
            ],
        ),
        migrations.CreateModel(
            name='ScoreCard',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('kills', models.PositiveSmallIntegerField(blank=True)),
                ('wins', models.PositiveSmallIntegerField(blank=True)),
                ('loss', models.PositiveSmallIntegerField(blank=True)),
                ('tie', models.PositiveSmallIntegerField(blank=True)),
                ('in_game_rank', models.PositiveSmallIntegerField(blank=True)),
                ('points', models.PositiveSmallIntegerField(blank=True)),
                ('match', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='match_score_card', to='tourney.Match')),
                ('solo', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='solo_score_card', to='slingshot.User')),
                ('team', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_score_card', to='slingshot.Team')),
                ('tour', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tour_scorecard', to='tourney.Tournament')),
            ],
        ),
        migrations.CreateModel(
            name='Round',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('round_name', models.CharField(blank=True, max_length=20)),
                ('start_date', models.DateField(blank=True, null=True)),
                ('start_time', models.TimeField(blank=True, null=True)),
                ('solo', models.ManyToManyField(blank=True, related_name='solo_round', to='slingshot.User')),
                ('stage', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='stage_round', to='tourney.Stage')),
                ('team', models.ManyToManyField(blank=True, related_name='team_round', to='slingshot.Team')),
                ('tour', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tourney_round', to='tourney.Tournament')),
            ],
        ),
        migrations.CreateModel(
            name='Prize',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('place', models.PositiveSmallIntegerField(blank=True, default=1)),
                ('prize', models.CharField(blank=True, max_length=10)),
                ('tour', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tour_prize', to='tourney.Tournament')),
            ],
        ),
        migrations.AddField(
            model_name='match',
            name='round_id',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='round_match', to='tourney.Round'),
        ),
        migrations.AddField(
            model_name='match',
            name='solo',
            field=models.ManyToManyField(blank=True, related_name='solo_match', to='slingshot.User'),
        ),
        migrations.AddField(
            model_name='match',
            name='stage',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='stage_match', to='tourney.Stage'),
        ),
        migrations.AddField(
            model_name='match',
            name='team',
            field=models.ManyToManyField(blank=True, related_name='team_match', to='slingshot.Team'),
        ),
        migrations.AddField(
            model_name='match',
            name='tour',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tourney_match', to='tourney.Tournament'),
        ),
        migrations.CreateModel(
            name='GameStat',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('games_played', models.PositiveIntegerField(default=0)),
                ('kills', models.PositiveIntegerField(default=0)),
                ('wins', models.PositiveIntegerField(default=0)),
                ('loss', models.PositiveIntegerField(default=0)),
                ('tie', models.PositiveIntegerField(default=0)),
                ('game', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='game_stats', to='tourney.Game')),
                ('team', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='team_stats', to='slingshot.Team')),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_stats', to='slingshot.User')),
            ],
        ),
        migrations.CreateModel(
            name='Game_validate',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('gameName', models.CharField(blank=True, max_length=60)),
                ('gameId', models.CharField(blank=True, max_length=60)),
                ('userName', models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, related_name='user', to='slingshot.User')),
            ],
        ),
        migrations.CreateModel(
            name='Announcements',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ann', models.CharField(blank=True, max_length=500)),
                ('tour', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='tour_ann', to='tourney.Tournament')),
            ],
        ),
    ]
