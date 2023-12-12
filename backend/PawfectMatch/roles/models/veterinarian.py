from django.db import models
from authentication.models.User import User


class Veterinarian(User):
    vet_id = models.AutoField(primary_key=True)
    vet_street = models.CharField(max_length=100)
    vet_country = models.CharField(max_length=50)
    vet_city = models.CharField(max_length=50)
    vet_state = models.CharField(max_length=50)

    class Meta:
        db_table = 'Veterinarian'
        managed = False
