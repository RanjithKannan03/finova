import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
from django.core.exceptions import ValidationError
from datetime import timedelta


# Create your models here.

def default_expiry_date():
    return timezone.now()+timedelta(days=30)

class Request(models.Model):

    class Status(models.TextChoices):
        PENDING = "PEN", _("Pending")
        ACCEPTED = "ACC", _("Accepted")
        REJECTED = "REJ", _("Rejected")

    request_id=models.UUIDField(default=uuid.uuid4,editable=False,unique=True,primary_key=True)
    name=models.CharField(max_length=200)
    description=models.TextField()
    created_on=models.DateTimeField(auto_now_add=True)
    created_by=models.ForeignKey('users.User',on_delete=models.CASCADE,related_name="requests")
    flat=models.ForeignKey('flats.Flat',on_delete=models.CASCADE,related_name="requests")
    status=models.CharField(max_length=3,choices=Status.choices,default=Status.PENDING)
    expiry_date=models.DateTimeField(default=default_expiry_date,editable=False)

    def accept_count(self):
        return self.votes.filter(choice=Vote.VoteChoice.ACCEPT).count()

    def reject_count(self):
        return self.votes.filter(choice=Vote.VoteChoice.REJECT).count()

    def can_be_finalized(self):
        return timezone.now() >= self.expires_at and self.status == self.Status.PENDING

    def finalize(self):
        if not self.can_be_finalized():
            raise ValidationError("Voting period not finished.")

        if self.accept_count() > self.reject_count():
            self.status = self.Status.ACCEPTED
        else:
            self.status = self.Status.REJECTED

        self.save(update_fields=["status"])

    def __str__(self):
        return f"{self.name} - {self.created_by.username} - {self.status}"

class Vote(models.Model):
    class VoteChoice(models.TextChoices):
        ACCEPT = "ACC", _("Accept")
        REJECT = "REJ", _("Reject")

    vote_id=models.UUIDField(default=uuid.uuid4,editable=False,unique=True,primary_key=True)
    cast_on=models.DateTimeField(auto_now_add=True)
    cast_by=models.ForeignKey('users.User',on_delete=models.CASCADE,related_name="votes")
    choice=models.CharField(max_length=3,choices=VoteChoice.choices)
    request=models.ForeignKey('Request',on_delete=models.CASCADE,related_name="votes")

    def __str__(self):
        return f"{self.request.name} - {self.choice} - {self.cast_by.username}"