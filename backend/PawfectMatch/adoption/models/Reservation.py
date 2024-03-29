from django.db import models
from roles.models import Adopter

from .Examination import Examination
from .Pet import Pet


class Reservation(models.Model):
    reservation = models.AutoField(primary_key=True)
    adopter = models.ForeignKey(Adopter, on_delete=models.CASCADE)
    pet = models.ForeignKey(Pet, on_delete=models.CASCADE)
    rv_date = models.DateTimeField()
    ex = models.ForeignKey(Examination, on_delete=models.CASCADE)
    reasoning = models.TextField()
    rv_status = models.CharField(max_length=8)
    rv_response_date = models.DateTimeField()

    class Meta:
        db_table = "Reservation"
        managed = False
