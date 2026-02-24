import uuid


from django.db import models
from django.utils.translation import gettext_lazy as _

# Create your models here.

class Transaction(models.Model):
    transaction_id=models.UUIDField(
        primary_key=True,
        default=uuid.uuid4,
        editable=False
    )
    created_at=models.DateTimeField(auto_now_add=True)
    created_by=models.ForeignKey("users.User",on_delete=models.CASCADE,related_name="transactions")
    flat=models.ForeignKey("flats.Flat",on_delete=models.CASCADE,related_name="transactions")
    total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    budget=models.ForeignKey("budgets.Budget",on_delete=models.CASCADE,related_name="transactions")

    def calculate_total(self):
        total = sum(item.price * item.units for item in self.items.all())
        self.total_amount = total
        self.save(update_fields=['total_amount'])

    def __str__(self):
        return f"{self.transaction_id} - {self.created_by.username}"

class TransactionItem(models.Model):
    class ItemCategory(models.TextChoices):
        GROCERY = 'GR', _('Groceries')
        CLEANING = 'CS', _('Cleaning Supplies')
        HOME = 'HE', _('Home Essentials')

    category=models.CharField(max_length=2,choices=ItemCategory.choices,default=ItemCategory.GROCERY)
    name=models.CharField(max_length=30)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    units=models.PositiveIntegerField(default=1)
    transaction=models.ForeignKey("Transaction",on_delete=models.CASCADE,related_name="items")

    def __str__(self):
        return f"{self.transaction.transaction_id} - {self.name}"

