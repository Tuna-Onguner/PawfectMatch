from .Pet import Pet
from django.db import models

class Other(Pet):
    other_type = models.CharField(max_length=50)

    def __str__(self):
        return self.other_type