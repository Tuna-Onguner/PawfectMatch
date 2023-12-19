from django.core.validators import FileExtensionValidator
from django.db import models


class AdoptionApp(models.Model):
    PENDING = 'PENDING'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
    ]

    adopter_id = models.ForeignKey('main.Adopter', on_delete=models.CASCADE)
    ao_id = models.ForeignKey('main.AdoptionOrganization', on_delete=models.CASCADE)
    pet_id = models.ForeignKey('main.Pet', on_delete=models.CASCADE)
    aapp_date = models.DateTimeField(auto_now_add=True)
    aapp_file = models.FileField(upload_to='uploads/', validators=[FileExtensionValidator(['pdf'])], null=True,
                                 blank=True)
    aapp_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default=PENDING)
    aapp_response_date = models.DateTimeField(null=True, blank=True)
    amotivation_text = models.TextField()

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(aapp_file__size__lte=3 * 1024 * 1024), name='aapp_file_size_limit'),
        ]
        unique_together = ('adopter_id', 'ao_id', 'aapp_date')

    def __str__(self):
        return f'{self.adopter_id} - {self.ao_id} - {self.aapp_date}'
