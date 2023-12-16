from django.db import models
from authentication.models import User

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
    
class Blogger(Adopter):
    blogger_id = models.AutoField(primary_key=True)
    
    class Meta:
        db_table = 'Blogger'
        managed = False

class Expert(Blogger):
    expert_id = models.AutoField(primary_key=True)
    
    class Meta:
        db_table = 'Expert'
        managed = False

class Veterinarian(User):
    vet_id = models.AutoField(primary_key=True)
    vet_street = models.CharField(max_length=100)
    vet_country = models.CharField(max_length=50)
    vet_city = models.CharField(max_length=50)
    vet_state = models.CharField(max_length=50)

    class Meta:
        db_table = 'Veterinarian'
        managed = False

class Admin(User):
    admin_id = models.AutoField(primary_key=True)
    
    class Meta:
        db_table = 'Admin'
        managed = False
        
class ExpertiseField(models.Model):
    expertise_field_id = models.AutoField(primary_key=True)
    expertise_field_name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'ExpertiseField'
        managed = False


class BlogField(models.Model):
    blog_field_id = models.AutoField(primary_key=True)
    blog_field_name = models.CharField(max_length=50, unique=True)

    class Meta:
        db_table = 'BlogField'
        managed = False
        
