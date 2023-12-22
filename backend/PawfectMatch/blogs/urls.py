from django.urls import path

from . import views

app_name = "blogs"

urlpatterns = [
    path("blogs/", views.BlogsView.as_view(), name="blogs"),
    path("blogs/<int:pk>/", views.BlogView.as_view(), name="blog"),
]
