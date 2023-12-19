from .Pet import Pet
from django.db import models


class Dog(Pet):
    dog_id = models.AutoField(primary_key=True)
