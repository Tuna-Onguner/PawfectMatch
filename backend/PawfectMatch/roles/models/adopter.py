from authentication.models.User import User
from django.db import models


class Adopter(User):
    adopter_id = models.AutoField(primary_key=True)
    card_number = models.CharField(max_length=16)

    class Meta:
        db_table = 'Adopter'
        managed = False
