from django.urls import path

from . import views

app_name = "applications"

urlpatterns = [
    path("grantee/", views.GranteeAppsView.as_view(), name="grantees"),
    path("grantee/<int:pk>/", views.GranteeAppView.as_view(), name="grantee"),
    path("blogger/", views.BloggerAppsView.as_view(), name="bloggers"),
    path("blogger/<int:pk>/", views.BloggerAppView.as_view(), name="blogger"),
    path("expert/", views.ExpertAppsView.as_view(), name="experts"),
    path("expert/<int:pk>/", views.ExpertAppView.as_view(), name="expert"),
    path("adoption/", views.AdoptionAppsView.as_view(), name="adoptions"),
    path("adoption/<int:pk>/", views.AdoptionAppView.as_view(), name="adoption"),
]
