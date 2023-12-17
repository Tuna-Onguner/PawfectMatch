from django.db import models

class Blog(models.Model):
    blogger_id = models.ForeignKey('Blogger', on_delete=models.CASCADE)
    blog_id = models.AutoField(primary_key=True)
    blog_image = models.ImageField(upload_to='images/', null=True, blank=True)
    blog_content = models.TextField()
    blog_title = models.CharField(max_length=50)
    blog_field_id = models.ForeignKey('BlogField', on_delete=models.DO_NOTHING)
    is_restricted = models.BooleanField(default=True)
    published_date = models.DateField(null=True, blank=True)

    class Meta:
        unique_together = ('blogger_id', 'blog_id')

    def __str__(self):
        return f'{self.blogger_id} - {self.blog_id}'