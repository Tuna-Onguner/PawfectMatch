from django.db import models
from backend.PawfectMatch.authentication.models.User import User


class Blogger(User):
    blogger_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'Blogger'
        managed = False
