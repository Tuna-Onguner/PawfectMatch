from django.db import models


class BlogField(models.Model):
    blog_field_id = models.AutoField(primary_key=True)
    blog_field_name = models.CharField(max_length=50, unique=True)
