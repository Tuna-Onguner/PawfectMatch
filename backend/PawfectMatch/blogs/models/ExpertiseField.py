from django.db import models

class ExpertiseField(models.Model):
    expertise_field_id = models.AutoField(primary_key=True)
    expertise_field_name = models.CharField(max_length=50, unique=True)
