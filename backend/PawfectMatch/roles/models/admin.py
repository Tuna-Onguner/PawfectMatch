from django.db import models
from authentication.models.User import User


class Admin(User):
    admin_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = "Admin"
        managed = False
