# Generated by Django 2.2.6 on 2020-02-28 23:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('tourney', '0053_auto_20200229_0153'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='scorecard',
            options={'ordering': ('-points',)},
        ),
    ]