from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from decimal import Decimal
from .serializers import BudgetSerializer
from django.db.models import ExpressionWrapper,IntegerField,F

from datetime import datetime


def parse_date_range(request):
    start_period = request.query_params.get("start_period")
    end_period = request.query_params.get("end_period")
    if not start_period or not end_period:
        return None,None,None,None,Response({"message": "start_date and end_date are required."}, status=status.HTTP_400_BAD_REQUEST)
    try:
        start_year, start_month = map(int, start_period.split('-'))
        end_year, end_month = map(int, end_period.split('-'))
    except (ValueError, AttributeError):
        return None, None, None, None, Response({"message": "Invalid format. Use YYYY-M."}, status=400)
    return start_year, start_month, end_year, end_month, None

class EditBudgetView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request):
        current_user = request.user
        new_amount = request.data.get('newAmount')

        if not new_amount:
            return Response({"message": "New Amount is required"}, status=status.HTTP_400_BAD_REQUEST)

        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            new_amount = Decimal(new_amount)
        except Exception:
            return Response({"message": "Invalid amount"}, status=status.HTTP_400_BAD_REQUEST)

        if new_amount <= 0:
            return Response({"message": "Amount must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)

        today = datetime.today()

        flat = membership.flat

        current_budget = flat.budgets.filter(year=today.year, month=today.month).first()
        if not current_budget:
            return Response({"message": "Invalid Date."}, status=status.HTTP_400_BAD_REQUEST)

        current_budget.amount = new_amount
        current_budget.save()

        return Response({"message": "Budget updated successfully"}, status=status.HTTP_200_OK)


# GET #/?start_date=2024-01&end_date=2024-01

class FlatBudgetListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user

        filter_by_date = request.query_params.get('filterByDate', '').lower() == 'true'

        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat = membership.flat
        budgets=flat.budgets.all()

        budgets=budgets.annotate(
            year_month=ExpressionWrapper(F('year')*100 + F('month'), output_field=IntegerField())
        )

        if filter_by_date:

            start_year,start_month,end_year,end_month,err=parse_date_range(request)
            if err:
                return err

            start_val = start_year * 100 + start_month
            end_val = end_year * 100 + end_month
            budgets = budgets.filter(year_month__gte=start_val, year_month__lte=end_val)
        else:
            today=datetime.today()
            budgets=budgets.filter(month=today.month,year=today.year)
        budgets = budgets.order_by('-year', '-month').prefetch_related('transactions')
        serializer=BudgetSerializer(budgets,many=True,context={'request':request})
        return Response({'budgets':serializer.data})

