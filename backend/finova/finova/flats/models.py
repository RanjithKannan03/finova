import random
import string
import uuid

from django.db import models

# Create your models here.


def generate_join_code():
    corpus = string.digits + string.ascii_uppercase
    while True:
        code = "".join(random.choices(corpus, k=4))
        if not Flat.objects.filter(join_code=code).exists():
            return code

class Flat(models.Model):
    id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    name=models.CharField(max_length=20)
    date_create=models.DateTimeField(auto_now_add=True)
    created_by=models.ForeignKey('users.User',on_delete=models.SET_NULL,null=True,blank=True)
    max_residents = models.PositiveIntegerField(default=5)
    join_code=models.CharField(max_length=4,default=generate_join_code,unique=True)

    @property
    def num_residents(self):
        return self.memberships.filter(is_active=True).count()

    @property
    def is_full(self):
        return self.num_residents >= self.max_residents


    def __str__(self):
        return self.name


class Membership(models.Model):
    id = models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    resident=models.ForeignKey('users.User',on_delete=models.CASCADE,related_name="memberships")
    flat=models.ForeignKey(Flat,on_delete=models.CASCADE,related_name='memberships')
    joined_on=models.DateTimeField(auto_now_add=True)
    is_active=models.BooleanField(default=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["resident", "flat"],
                name="unique_membership"
            )
        ]

    def __str__(self):
        return f"{self.resident.username} - {self.flat.name}"