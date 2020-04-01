import os
import csv
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Gamathon.settings.dev')
django.setup()

from slingshot.models import User, Team
from tourney.models import Tournament, Game_validate, GameStat, Round, ScoreCard, Stage, Match

tour = Tournament.objects.get(id=11)

stage = Stage.objects.get(stage_name='Qualifiers', tour=tour)
match = Match.objects.get(round_id=Round.objects.get(round_name='Group 18', stage=stage), match_name='Match 2', tour=tour)
s = ScoreCard.objects.filter(match=match, tour=tour)

for i in s:
    if i.solo != None:
        try:
            g = GameStat.objects.get(user=i.solo, game=tour.tour_game)
            g.kills += i.kills
            g.points += i.points
            i.solo.kills += i.kills
            i.solo.points += i.points
            if i.in_game_rank == 20:
                g.wins += 1
                i.solo.wins += 1
            else:
                g.loss += 1
                i.solo.loss += 1
                g.deaths += 1
            g.save()
            i.solo.save()
        except:
            print(i.solo)
            print('Failed Solo')
            continue

    elif i.team != None:
        try:
            g = GameStat.objects.get(team=i.team, game=tour.tour_game)
            g.kills += i.kills
            g.points += i.points
            i.team.kills += i.kills
            i.team.points += i.points
            if i.in_game_rank == 20:
                g.wins += 1
                i.team.wins += 1
            else:
                g.loss += 1
                i.team.loss += 1
                g.deaths += 1
            g.save()
            i.team.save()
        except:
            print(i.team)
            print('Failed Team')
            continue
