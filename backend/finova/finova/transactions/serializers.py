from rest_framework import serializers
from .models import TransactionItem,Transaction
from users.serializers import UserSerializer


class TransactionItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransactionItem
        fields = ['id', 'category', 'name', 'price', 'units']


class TransactionSerializer(serializers.ModelSerializer):
    items = TransactionItemSerializer(many=True, read_only=True)
    created_by=UserSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = [
            'transaction_id',
            'created_at',
            'created_by',
            'total_amount',
            'items'
        ]

class TransactionCreateSerializer(serializers.ModelSerializer):
    items = TransactionItemSerializer(many=True)
    created_by = serializers.HiddenField(default=serializers.CurrentUserDefault())

    class Meta:
        model = Transaction
        fields = ['transaction_id', 'created_at', 'created_by', 'items', 'total_amount']
        read_only_fields = ['transaction_id', 'created_at', 'total_amount']

    def create(self, validated_data):
        items_data = validated_data.pop('items')

        validated_data['flat'] = self.context.get('flat')
        validated_data['budget'] = self.context.get('budget')

        total = sum(item['price'] * item['units'] for item in items_data)
        validated_data['total_amount'] = total

        transaction = Transaction.objects.create(**validated_data)

        TransactionItem.objects.bulk_create([
            TransactionItem(transaction=transaction, **item)
            for item in items_data
        ])

        return transaction



class CategoryFilteredTransactionSerializer(serializers.ModelSerializer):
    items = serializers.SerializerMethodField()
    created_by = UserSerializer(read_only=True)

    class Meta:
        model = Transaction
        fields = ['transaction_id', 'created_at', 'created_by', 'flat', 'items', 'total_amount']

    def get_items(self, obj):
        category = self.context.get('category')
        filtered_items = obj.items.filter(category=category)
        return TransactionItemSerializer(filtered_items, many=True).data