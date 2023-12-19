from django.db import models

from .Pet import Pet


class Other(Pet):
    other_type = models.CharField(max_length=50)
    other_id = models.AutoField(primary_key=True)
