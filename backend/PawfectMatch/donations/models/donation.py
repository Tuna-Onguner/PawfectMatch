from django.db import models


# Create your models here.
class Donation(models.Model):
    donation_id = models.AutoField(primary_key=True)
    donor_id = models.ForeignKey('authentication.User', on_delete=models.CASCADE)
    #ao_id = models.ForeignKey('main.AdoptionOrganization', on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=3, default='USD')
    ddate = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'Donation'
        managed = False

    def __str__(self):
        return f'{self.donor_id} donated {self.amount} {self.currency} to {self.ao_id}'
