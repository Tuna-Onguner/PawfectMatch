from django.db import models


class Examination(models.Model):
    ex_id = models.AutoField(primary_key=True)
    ex_description = models.TextField()
    ex_file = models.BinaryField(null=True)

    class Meta:
        db_table = "Examination"
        managed = False
