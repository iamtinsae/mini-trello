# Generated by Django 4.1.7 on 2023-04-01 18:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_card_list_alter_list_board'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='list',
            name='board',
        ),
        migrations.DeleteModel(
            name='Board',
        ),
    ]
