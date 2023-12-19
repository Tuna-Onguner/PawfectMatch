from django.contrib.auth.models import AbstractBaseUser
from django.db import models


# Create your models here.
class User(AbstractBaseUser):
    user_id = models.AutoField(primary_key=True)
    user_name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=50, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name', 'phone_number']

    class Meta:
        db_table = 'User'
        managed = False

    def get_user_id(self):
        return self.user_id

    def __str__(self):
        return self.user_name
