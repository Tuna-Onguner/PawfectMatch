from django.db import models
from main.models import Adopter
from main.models import AdoptionOrganization
from django.utils import timezone


class OverseeingReq(models.Model):
    ao_id = models.ForeignKey(AdoptionOrganization, on_delete=models.CASCADE)
    adopter_id = models.ForeignKey(Adopter, on_delete=models.CASCADE)
    oreq_date = models.DateTimeField(default=timezone.now)
    oreq_status = models.CharField(max_length=8, default="PENDING")
    oreq_response_date = models.DateTimeField(default=None)
    omotivation_text = models.TextField(default=None)
    oreq_result = models.CharField(max_length=14, default=None)

    class Meta:
        unique_together = (("ao_id", "adopter_id", "oreq_date"),)
