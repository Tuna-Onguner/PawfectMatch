from django.db import models
from authentication.models.User import User


class Blogger(User):
    blogger_id = models.AutoField(primary_key=True)
    blog_name = models.CharField(max_length=50)

    class Meta:
        db_table = 'Blogger'
        managed = False
