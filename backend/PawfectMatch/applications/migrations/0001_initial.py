# Generated by Django 4.2.7 on 2023-12-21 12:14

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("roles", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="GranteeApp",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("gapp_amount", models.IntegerField()),
                ("gapp_date", models.DateTimeField(auto_now_add=True)),
                (
                    "gapp_file",
                    models.FileField(
                        blank=True,
                        null=True,
                        upload_to="uploads/",
                        validators=[
                            django.core.validators.FileExtensionValidator(["pdf"])
                        ],
                    ),
                ),
                (
                    "gapp_status",
                    models.CharField(
                        choices=[("PENDING", "Pending")],
                        default="PENDING",
                        max_length=8,
                    ),
                ),
                ("gapp_response_date", models.DateTimeField(blank=True, null=True)),
                ("gmotivation_text", models.TextField()),
                ("gapp_decided_amount", models.IntegerField(blank=True, null=True)),
                (
                    "ao_id",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="roles.adoptionorganization",
                    ),
                ),
            ],
        ),
    ]