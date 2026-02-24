from django.core.management.base import BaseCommand
from django.apps import apps
from datetime import date
from decimal import Decimal



class Command(BaseCommand):
    help = 'Creates next month budgets for all flats'

    def handle(self, *args, **kwargs):
        Flat = apps.get_model('flats', 'Flat')
        Budget = apps.get_model('budgets', 'Budget')

        today = date.today()

        if today.month == 12:
            next_month, next_year = 1, today.year + 1
        else:
            next_month, next_year = today.month + 1, today.year

        created = 0
        for flat in Flat.objects.all():
            if Budget.objects.filter(flat=flat, month=next_month, year=next_year).exists():
                continue

            try:
                current_budget = Budget.objects.get(flat=flat, month=today.month, year=today.year)
            except Budget.DoesNotExist:
                continue

            remaining = current_budget.amount + current_budget.rollover - (
                current_budget.total_spent
            )
            rollover = max(remaining, Decimal('0'))

            Budget.objects.create(
                flat=flat,
                month=next_month,
                year=next_year,
                amount=current_budget.amount,
                rollover=rollover,
            )
            created += 1

        self.stdout.write(f"Created {created} new budgets.")