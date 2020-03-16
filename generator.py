import os
import csv
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Gamathon.settings.dev')
django.setup()

from slingshot.models import User, Team
from tourney.models import Tournament, Game_validate, GameStat, Round, ScoreCard, Stage, Match

tour = Tournament.objects.get(id=9)
group = Round.objects.get(tour=tour, stage=Stage.objects.get(stage_name='Quater-Final'), round_name='Group 2')
match = Match.objects.get(tour=tour, round_id=group, match_name='Overall')

scs_all = ScoreCard.objects.filter(tour=tour, match=match)

#with open (f'../tour_info/Group 2.csv', 'r') as f:
#    reader = csv.reader(f)
#    next(reader)
#    for r in reader:
#        print(f'{r[1]},   {r[2]},   {r[3]},  {r[4]},    {r[5]}')
#        team = group.team.get(name=r[1])
#        print(team)
#        if team in [i.team for i in scs_all]:
#            print('Team Already Exists!')
#            print(f'----------{team}-------------')
#            s = ScoreCard.objects.get(tour=tour, match=match, team=team)
#            s.in_game_rank = int(r[3])
#            s.kills += int(r[4])
#            s.points = s.in_game_rank + s.kills
#            s.save()
#        else:
#            print('Creating a Team!')
#            print(f'------------{team}------------')
#            s = ScoreCard(tour=tour, match=match, team=team)
#            s.save()
#            s.kills += int(r[4])
#            s.in_game_rank += int(r[3])
#            s.save()
#            scs_all = ScoreCard.objects.filter(tour=tour, match=match)
#        
#        try:
#            user = group.solo.get(username=Game_validate.objects.filter(gameId=r[2])[0].userName.username)
#            if user in [i.solo for i in scs_all]:
#                print('User Already Exists!')
#                print(f'---------{user}-----------')
#                s = ScoreCard.objects.get(tour=tour, match=match, solo=user)
#                s.save()
#                s.kills += int(r[4])
#                s.points += int(r[5])
#                s.in_game_rank += int(r[3])
#                s.save()
#            else:
#                s = ScoreCard(tour=tour, match=match, solo=Game_validate.objects.filter(gameId=r[2])[0].userName)
#                s.save()
#                s.kills += int(r[4])
#                s.points += int(r[5])
#                s.in_game_rank += int(r[3])
#                s.save()
#        except Exception as e:
#            print(e)
#            print('Returned Two Users')

#teams = group.team.all()
#print(len(teams))
#for team in teams:
#    ladder = ScoreCard.objects.get(tour=tour, match=match, team=team)
#    print(f'{ladder.team} | {ladder.in_game_rank} | {ladder.kills} | {ladder.points}')
#
#players = group.solo.all()
#for player in players:
#    try:
#        ladder = ScoreCard.objects.get(tour=tour, match=match, solo=player)
#    except:
#        pass
#    print(f'{ladder.solo} | {ladder.in_game_rank} | {ladder.kills} | {ladder.points}')


def overallGenerator():
    matches = group.round_match.all()
    for match in matches:
        if match.match_name != 'Overall':
            s = ScoreCard.objects.filter(match=match, tour=tour)

            #For Teams
            for i in s:
                if i.team != None:
                    print('------------Updating Team-------------')
                    print(f'             {i.team}                 ')
                    o = ScoreCard.objects.get(tour=tour, match=Match.objects.get(match_name='Overall', round_id=group, tour=tour), team=i.team)
                else:
                    print('------------Updating User--------------')
                    print(f'            {i.solo}                   ')
                    o = ScoreCard.objects.get(tour=tour, match=Match.objects.get(match_name='Overall', round_id=group, tour=tour), solo=i.solo)

                o.kills += i.kills
                o.in_game_rank += i.in_game_rank
                o.points += i.points
                o.save()
    print('Finished Bitch')
overallGenerator()
