from django.urls import path

from . import views

app_name = "adoption"

urlpatterns = [
    path("adoptions/", views.adoption_applications, name="adoption_applications"),
    path(
        "<int:application_id>/", views.adoption_application, name="adoption_application"
    ),
    path("pets/", views.PetsView.as_view(), name="pets"),
    path("breeds/", views.BreedsView.as_view(), name="breeds"),
    path("pets/<int:pk>/", views.PetView.as_view(), name="pet"),
    path("breeds/<int:pk>/", views.BreedView.as_view(), name="breed"),
    path("schedules/", views.SchedulesView.as_view(), name="schedules"),
    path("schedules/<int:pk>/", views.ScheduleView.as_view(), name="schedule"),
]
