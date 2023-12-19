from django.db import models

from .Pet import Pet


class Dog(Pet):
    dog_id = models.AutoField(primary_key=True)
