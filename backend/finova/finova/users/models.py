from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class User(AbstractUser):
    email=models.EmailField(unique=True)
    profile_pic=models.ImageField(default="default-pp.jpg",blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]
    first_name = models.CharField(max_length=150, blank=True, null=True)
    last_name = models.CharField(max_length=150, blank=True, null=True)

    def __str__(self):
        return f"{self.username}".strip() or self.email
