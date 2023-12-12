from django.db import models

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