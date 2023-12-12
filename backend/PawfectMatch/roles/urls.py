from django.urls import path
from . import views


app_name = 'roles'


urlpatterns = [
    path('veterinarians/', views.VeterinarianView.as_view(), name='veterinarians'),
    path('veterinarians/<int:pk>/', views.VeterinarianDetailView.as_view(), name='veterinarian'),
]
