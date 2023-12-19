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
