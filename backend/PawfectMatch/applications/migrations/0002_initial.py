# Generated by Django 4.2.7 on 2023-12-21 12:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("roles", "0002_admin"),
        ("applications", "0001_initial"),
    ]

    operations = [
        migrations.AddField(
            model_name="granteeapp",
            name="gadmin_id",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="roles.admin",
            ),
        ),
    ]
