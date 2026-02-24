import uuid
from decimal import Decimal
from django.db import models


class Budget(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    flat = models.ForeignKey('flats.Flat', on_delete=models.CASCADE, related_name='budgets')
    month = models.PositiveIntegerField()
    year = models.PositiveIntegerField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    rollover = models.DecimalField(max_digits=10, decimal_places=2, default=0)

    class Meta:
        unique_together = ('flat', 'month', 'year')
        ordering = ['-year', '-month']

    def __str__(self):
        return f"{self.flat.name} — {self.month}/{self.year}"

    @property
    def total_available(self):
        return self.amount + self.rollover

    @property
    def total_spent(self):
        return self.transactions.aggregate(
            total=models.Sum('total_amount')
        )['total'] or Decimal('0')

    @property
    def remaining(self):
        return self.total_available - self.total_spent

    @property
    def unspent(self):
        return max(self.remaining, Decimal('0'))