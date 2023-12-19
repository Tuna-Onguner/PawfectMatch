from django.db import models
from django.core.validators import FileExtensionValidator

class ExpertApp(models.Model):
    PENDING = 'PENDING'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
    ]

    adopter_id = models.ForeignKey('main.Adopter', on_delete=models.CASCADE)
    # Check if this is correct ExpertiseField does not exist, for now
    expertise_field_id = models.ForeignKey('main.ExpertiseField', on_delete=models.CASCADE)
    eadmin_id = models.ForeignKey('main.Admin', on_delete=models.SET_NULL, null=True)
    eapp_date = models.DateTimeField(auto_now_add=True)
    eapp_file = models.FileField(upload_to='uploads/', validators=[FileExtensionValidator(['pdf'])], null=True, blank=True)
    eapp_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default=PENDING)
    eapp_response_date = models.DateTimeField(null=True, blank=True)
    emotivation_text = models.TextField()

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(eapp_file__size__lte=3*1024*1024), name='eapp_file_size_limit'),
        ]
        unique_together = ('adopter_id', 'expertise_field_id', 'eapp_date')

    def __str__(self):
        return f'{self.adopter_id} - {self.expertise_field_id} - {self.eapp_date}'