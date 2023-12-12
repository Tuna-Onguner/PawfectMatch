from django.db import models
from backend.PawfectMatch.authentication.models.User import User


class Expert(User):
    expert_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'Expert'
        managed = False
