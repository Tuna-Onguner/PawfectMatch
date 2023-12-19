# Generated by Django 4.2.7 on 2023-12-12 18:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Veterinarian',
            fields=[
                ('user_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, to=settings.AUTH_USER_MODEL)),
                ('vet_id', models.AutoField(primary_key=True, serialize=False)),
                ('vet_street', models.CharField(max_length=100)),
                ('vet_country', models.CharField(max_length=50)),
                ('vet_city', models.CharField(max_length=50)),
                ('vet_state', models.CharField(max_length=50)),
            ],
            options={
                'db_table': 'Veterinarian',
                'managed': False,
            },
            bases=('authentication.user',),
        ),
    ]
