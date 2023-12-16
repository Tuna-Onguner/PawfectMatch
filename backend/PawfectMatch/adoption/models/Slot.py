from django.db import models


class Slot(models.Model):
    schedule = models.ForeignKey(
        "adoption.Schedule", on_delete=models.CASCADE, null=False
    )
    slot_id = models.AutoField(primary_key=True)
    is_reserved = models.BooleanField(default=False)
    date = models.DateField(null=False)
    start_hour = models.TimeField(null=False)
    end_hour = models.TimeField(null=False)

    class Meta:
        db_table = "Slot"
        managed = False
