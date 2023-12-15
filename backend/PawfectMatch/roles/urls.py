from django.urls import path

from . import views

app_name = 'roles'

urlpatterns = [
    path('veterinarians/', views.VeterinarianView.as_view(), name='veterinarians'),
    path('veterinarians/<int:pk>/', views.VeterinarianDetailView.as_view(), name='veterinarian'),
    path('bloggers/', views.BloggerView.as_view(), name='bloggers'),
    path('bloggers/<int:pk>/', views.BloggerDetailView.as_view(), name='blogger'),
    path('experts/', views.ExpertView.as_view(), name='experts'),
    path('experts/<int:pk>/', views.ExpertDetailView.as_view(), name='expert'),
    path('adoption-organizations/', views.AdoptionOrganizationView.as_view(), name='adoption_organizations'),
    path('adoption-organizations/<int:pk>/', views.AdoptionOrganizationDetailView.as_view(), name='adoption_organization'),
    path('adopters/', views.AdopterView.as_view(), name='adopters'),
    path('adopters/<int:pk>/', views.AdopterDetailView.as_view(), name='adopter'),
]
