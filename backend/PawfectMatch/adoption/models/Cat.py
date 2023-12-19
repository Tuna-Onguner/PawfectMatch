from django.db import models

from .Pet import Pet


class Cat(Pet):
    cat_id = models.AutoField(primary_key=True)
