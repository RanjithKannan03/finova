from django.urls import path
from .views import LoginView,LogoutView,MeView,RegisterView,RefreshView,CSRFView

urlpatterns=[
    path("login/", LoginView.as_view(),name="login"),
    path("refresh/", RefreshView.as_view(),name="refresh_token"),
    path("me/", MeView.as_view(),name="me"),
    path("csrf/", CSRFView.as_view(),name="csrf"),
    path("register/", RegisterView.as_view(),name="register"),
    path("logout/", LogoutView.as_view(),name="logout"),
]