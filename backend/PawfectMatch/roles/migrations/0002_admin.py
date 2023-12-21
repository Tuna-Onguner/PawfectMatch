# Generated by Django 4.2.7 on 2023-12-21 12:14

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("authentication", "0001_initial"),
        ("roles", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Admin",
            fields=[
                (
                    "user_ptr",
                    models.OneToOneField(
                        auto_created=True,
                        on_delete=django.db.models.deletion.CASCADE,
                        parent_link=True,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
                ("admin_id", models.AutoField(primary_key=True, serialize=False)),
            ],
            options={
                "db_table": "Admin",
                "managed": False,
            },
            bases=("authentication.user",),
        ),
    ]
