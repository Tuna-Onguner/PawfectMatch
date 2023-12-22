from django.urls import path

from . import views

app_name = "adoption"

urlpatterns = [
    path("adoptions/", views.adoption_applications, name="adoption_applications"),
    path("<int:application_id>/", views.adoption_application, name="adoption_application"),
    path("pets/", views.PetsView.as_view(), name="pets"),
    path("pets_owned/", views.PetsOwnedView.as_view(), name="pets_owned"),
    path("available_pets/", views.AvailablePetsView.as_view(), name="available_pets"),
    path("breeds/", views.BreedsView.as_view(), name="breeds"),
    path("pets/<int:pk>/", views.PetView.as_view(), name="pet"),
    path("breeds/<int:pk>/", views.BreedView.as_view(), name="breed"),
    path("schedules/", views.SchedulesView.as_view(), name="schedules"),
    path("schedules/<int:pk>/", views.ScheduleView.as_view(), name="schedule"),
    path("slots/", views.SlotsView.as_view(), name="slots"),
    path("slots/<int:pk>/", views.SlotView.as_view(), name="slot"),
    path("reservations/", views.ReservationsView.as_view(), name="reservations"),
    path("reservations/<int:pk>/", views.ReservationView.as_view(), name="reservation"),
    path("examinations/", views.ExaminationsView.as_view(), name="examinations"),
    path("examinations/<int:pk>/", views.ExaminationView.as_view(), name="examination"),
    path("agreement_requests/", views.AgreementRequests.as_view(), name="agreement_requests"),
    path("agreement_requests/<int:pk>/", views.AgreementReq.as_view(), name="agreement_request"),
    path("overseeing_requests/", views.OverseeingReqsView.as_view(), name="overseeing_requests"),
    path("overseeing_requests/<int:pk>/", views.OverseeingReqView.as_view(), name="overseeing_request"),
]
