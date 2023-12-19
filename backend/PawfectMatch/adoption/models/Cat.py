from .Pet import Pet
from django.db import models


class Cat(Pet):
    cat_id = models.AutoField(primary_key=True)
