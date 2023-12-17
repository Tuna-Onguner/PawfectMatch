from django.db import models


class Breed(models.Model):
    breed_id = models.AutoField(primary_key=True)
    breed_name = models.CharField(max_length=100, unique=True)
    intelligence = models.IntegerField()
    playfulness = models.IntegerField()

    class Meta:
        db_table = 'Breed'
        managed = False

    def __str__(self):
        return self.breed_name


class Pet(models.Model):
    pet_id = models.AutoField(primary_key=True)
    pet_name = models.CharField(max_length=50)
    pet_size = models.DecimalField(max_digits=4, decimal_places=2)
    pet_image = models.CharField(max_length=100)
    pet_color = models.CharField(max_length=50)
    is_adopted = models.BooleanField(default=False)
    adopter = models.ForeignKey('main.Adopter', on_delete=models.SET_NULL, null=True)
    adoption_organization = models.ForeignKey('main.AdoptionOrganization', on_delete=models.CASCADE)
    breed = models.ForeignKey('Breed', on_delete=models.RESTRICT)

    class Meta:
        db_table = 'Pet'
        managed = False

    def __str__(self):
        return self.pet_name


class Cat(Pet):
    pass


class Dog(Pet):
    pass


class Other(Pet):
    other_type = models.CharField(max_length=50)

    def __str__(self):
        return self.other_type


# This application will hold a user_id, pet_id aap_date, aapp_status, aapp_response_date, amotaivation_text, aapp_file
# Pet_id and user_id will be foreign keys
class AdoptionApplication(models.Model):
    adopter = models.ForeignKey('main.Adopter', on_delete=models.CASCADE)
    app_date = models.DateTimeField(auto_now_add=True)
    pet = models.ForeignKey('Pet', on_delete=models.CASCADE)
    aapp_file = models.BinaryField(null=True)
    aapp_status = models.CharField(max_length=8, default='PENDING')
    aapp_response_date = models.DateTimeField(null=True)
    amotivation_text = models.TextField(null=True)

    class Meta:
        db_table = 'AdoptionApplication'
        managed = False

    def __str__(self):
        return self.app_date
