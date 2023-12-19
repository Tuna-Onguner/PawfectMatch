from django.db import models
from main.models import AdoptionOrganization
from main.models import Veterinarian
from django.utils import timezone


class AgreementRequest(models.Model):
    ao_id = models.ForeignKey(AdoptionOrganization, on_delete=models.CASCADE)
    vet_id = models.ForeignKey(Veterinarian, on_delete=models.CASCADE)
    agreq_date = models.DateTimeField(default=timezone.now)
    agreq_status = models.CharField(max_length=8, default="PENDING")
    agreq_response_date = models.DateTimeField(default=None)
    agmotivation_text = models.TextField(default=None)
    agreq_term_date = models.DateTimeField(default=None)

    class Meta:
        unique_together = (("ao_id", "vet_id", "agreq_date"),)
