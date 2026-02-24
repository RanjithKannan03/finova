from datetime import date
from decimal import Decimal
from .models import Budget


def create_initial_budget(flat, amount: Decimal):
    today = date.today()
    return Budget.objects.create(
        flat=flat,
        month=today.month,
        year=today.year,
        amount=amount,
        rollover=Decimal('0'),
    )


def rollover_budget_for_flat(flat):
    today = date.today()

    if today.month == 12:
        next_month, next_year = 1, today.year + 1
    else:
        next_month, next_year = today.month + 1, today.year


    if Budget.objects.filter(flat=flat, month=next_month, year=next_year).exists():
        return None

    try:
        current_budget = Budget.objects.get(flat=flat, month=today.month, year=today.year)
    except Budget.DoesNotExist:
        return None

    return Budget.objects.create(
        flat=flat,
        month=next_month,
        year=next_year,
        amount=current_budget.amount,
        rollover=current_budget.unspent,
    )