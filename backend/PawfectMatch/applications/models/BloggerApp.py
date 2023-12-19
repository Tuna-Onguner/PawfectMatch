from django.core.validators import FileExtensionValidator
from django.db import models


class BloggerApp(models.Model):
    PENDING = 'PENDING'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
    ]

    adopter_id = models.ForeignKey('main.Adopter', on_delete=models.CASCADE)
    # Check if this is correct BlogField does not exist, for now
    blog_field_id = models.ForeignKey('main.BlogField', on_delete=models.CASCADE)
    badmin_id = models.ForeignKey('main.Admin', on_delete=models.SET_NULL, null=True)
    bapp_date = models.DateTimeField(auto_now_add=True)
    bapp_file = models.FileField(upload_to='uploads/', validators=[FileExtensionValidator(['pdf'])], null=True,
                                 blank=True)
    bapp_status = models.CharField(max_length=8, choices=STATUS_CHOICES, default=PENDING)
    bapp_response_date = models.DateTimeField(null=True, blank=True)
    bmotivation_text = models.TextField()

    class Meta:
        constraints = [
            models.CheckConstraint(check=models.Q(bapp_file__size__lte=3 * 1024 * 1024), name='bapp_file_size_limit'),
        ]
        unique_together = ('adopter_id', 'blog_field_id', 'bapp_date')

    def __str__(self):
        return f'{self.adopter_id} - {self.blog_field_id} - {self.bapp_date}'
