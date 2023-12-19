from django.db import models
from authentication.models.User import User


class AdoptionOrganization(User):
    ao_id = models.AutoField(primary_key=True)
    ao_street = models.CharField(max_length=100)
    ao_country = models.CharField(max_length=50)
    ao_city = models.CharField(max_length=50)
    ao_state = models.CharField(max_length=50)
    total_donation_received = models.IntegerField(default=0)
    total_grants_received = models.IntegerField(default=0)
    total_donators = models.IntegerField(default=0)
    pet_count = models.IntegerField(default=0)

    class Meta:
        db_table = 'AdoptionOrganization'
        managed = False

    def __str__(self):
        return self.ao_name


class Adopter(User):
    adopter_id = models.AutoField(primary_key=True)
    card_number = models.CharField(max_length=16)

    class Meta:
        db_table = 'Adopter'
        managed = False

    def __str__(self):
        return self.adopter_street


class Admin(User):
    pass
