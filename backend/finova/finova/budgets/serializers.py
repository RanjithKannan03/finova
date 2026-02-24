from rest_framework import serializers
from .models import Budget

from transactions.serializers import TransactionSerializer

class BudgetSerializer(serializers.ModelSerializer):

    transactions=TransactionSerializer(many=True,read_only=True)

    class Meta:
        model=Budget
        fields=["month","year","amount","total_available","total_spent","unspent","transactions"]

