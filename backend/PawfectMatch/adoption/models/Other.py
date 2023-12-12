from django.db import models

from .Pet import Pet


class Other(Pet):
    other_type = models.CharField(max_length=50)

    def __str__(self):
        return self.other_type
