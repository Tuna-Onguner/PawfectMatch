# Generated by Django 4.2.7 on 2023-12-12 18:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='expert',
            name='blogger_ptr',
        ),
        migrations.RemoveField(
            model_name='veterinarian',
            name='user_ptr',
        ),
        migrations.DeleteModel(
            name='Blogger',
        ),
        migrations.DeleteModel(
            name='Expert',
        ),
        migrations.DeleteModel(
            name='Veterinarian',
        ),
    ]