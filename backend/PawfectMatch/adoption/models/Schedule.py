from django.db import models


class Schedule(models.Model):
    schedule_id = models.AutoField(primary_key=True)
    is_restricted = models.BooleanField(default=True)
    schedule_beginning_date = models.DateField(null=False)
    schedule_end_date = models.DateField(null=False)
    veterinarian = models.ForeignKey(
        "main.Veterinarian", on_delete=models.CASCADE, null=False
    )

    class Meta:
        db_table = "Schedule"
        managed = False
