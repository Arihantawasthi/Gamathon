# Generated by Django 2.2.6 on 2019-11-28 08:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0032_round_total_participants'),
    ]

    operations = [
        migrations.AlterField(
            model_name='match',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='match',
            name='start_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='round',
            name='start_date',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='round',
            name='start_time',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
