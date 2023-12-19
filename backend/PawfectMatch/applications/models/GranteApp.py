from django.core.validators import FileExtensionValidator
from django.db import models


class GranteeApp(models.Model):
    PENDING = 'PENDING'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
    ]

    ao_id = models.ForeignKey('main.AdoptionOrganization', on_delete=models.CASCADE)
    gapp_amount = models.IntegerField()
    gapp_date = models.DateTimeField(auto_now_add=True)
    gapp_file = models.FileField(upload_to='uploads/', validators=[FileExtensionValidator(['pdf'])], null=True,
                                 blank=True)
    gapp_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default=PENDING)
    gapp_response_date = models.DateTimeField(null=True, blank=True)
    gmotivation_text = models.TextField()
    gapp_decided_amount = models.IntegerField(null=True, blank=True)
    gadmin_id = models.ForeignKey('main.Admin', null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return f'{self.ao_id} - {self.gapp_amount} - {self.gapp_date}'
