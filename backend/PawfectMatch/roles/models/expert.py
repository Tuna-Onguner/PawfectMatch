from authentication.models.User import User
from django.db import models


class Expert(User):
    expert_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'Expert'
        managed = False
