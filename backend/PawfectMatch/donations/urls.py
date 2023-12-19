from django.urls import path

from .views import *

app_name = 'donations'

urlpatterns = [
    path('donations/', DonationView.as_view(), name='donations'),
    path('donations/<int:_id>/', DonationDetailView.as_view(), name='donation'),
]
