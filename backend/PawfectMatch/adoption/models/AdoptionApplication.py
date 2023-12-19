from django.db import models


class AdoptionApplication(models.Model):
    adopter = models.ForeignKey('main.Adopter', on_delete=models.CASCADE)
    app_date = models.DateTimeField(auto_now_add=True)
    pet = models.ForeignKey('Pet', on_delete=models.CASCADE)
    aapp_file = models.BinaryField(null=True)
    aapp_status = models.CharField(max_length=8, default='PENDING')
    aapp_response_date = models.DateTimeField(null=True)
    amotivation_text = models.TextField(null=True)

    class Meta:
        db_table = 'AdoptionApplication'
        managed = False

    def __str__(self):
        return self.app_date
