from django.urls import path

from .views import *

app_name = 'roles'

urlpatterns = [
    path('veterinarians/', VeterinarianView.as_view(), name='veterinarians'),
    path('veterinarians/<int:_id>/', VeterinarianDetailView.as_view(), name='veterinarian'),
    path('bloggers/', BloggerView.as_view(), name='bloggers'),
    path('bloggers/<int:_id>/', BloggerDetailView.as_view(), name='blogger'),
    path('experts/', ExpertView.as_view(), name='experts'),
    path('experts/<int:_id>/', ExpertDetailView.as_view(), name='expert'),
    path('adoption-organizations/', AdoptionOrganizationView.as_view(), name='adoption_organizations'),
    path('adoption-organizations/<int:_id>/', AdoptionOrganizationDetailView.as_view(), name='adoption_organization'),
    path('adopters/', AdopterView.as_view(), name='adopters'),
    path('adopters/<int:_id>/', AdopterDetailView.as_view(), name='adopter'),
]
