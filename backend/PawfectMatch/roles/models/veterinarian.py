from authentication.models.User import User
from django.db import models


class Veterinarian(User):
    vet_id = models.AutoField(primary_key=True)
    vet_name = models.CharField(max_length=100)
    vet_street = models.CharField(max_length=100)
    vet_city = models.CharField(max_length=100)
    vet_state = models.CharField(max_length=100)
    vet_country = models.CharField(max_length=100)

    class Meta:
        db_table = 'Veterinarian'
        managed = False
