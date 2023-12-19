from django.db import models


class Counsels(models.Model):
    adopter_id = models.ForeignKey('Adopter', on_delete=models.CASCADE)
    expert_id = models.ForeignKey('Expert', on_delete=models.CASCADE)
    advice_date = models.DateTimeField(auto_now_add=True)
    expertise_field_id = models.ForeignKey('ExpertiseField', on_delete=models.DO_NOTHING)
    adopter_problem = models.TextField()
    expert_response = models.TextField(null=True, blank=True)
    expert_response_date = models.DateTimeField(null=True, blank=True)
    advice_status = models.CharField(max_length=8, default='PENDING')

    class Meta:
        unique_together = ('adopter_id', 'expert_id', 'advice_date')

    def __str__(self):
        return f'{self.adopter_id} - {self.expert_id} - {self.advice_date}'
