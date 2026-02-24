from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import TransactionItem
from users.models import User
from rest_framework.response import Response
from .serializers import TransactionSerializer,CategoryFilteredTransactionSerializer,TransactionCreateSerializer
from datetime import datetime
from datetime import date
from budgets.models import Budget

def parse_date_range(request):
    start_date = request.query_params.get('start_date')
    end_date = request.query_params.get('end_date')

    if not start_date or not end_date:
        return None, None, Response({"message": "start_date and end_date are required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        start_date = datetime.strptime(start_date, '%Y-%m-%d')
        end_date = datetime.strptime(end_date, '%Y-%m-%d')
    except ValueError:
        return None, None, Response({"message": "Invalid date format. Use YYYY-MM-DD."}, status=status.HTTP_400_BAD_REQUEST)

    return start_date, end_date, None



class CreateTransactionView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self,request):

        current_user = request.user
        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat = membership.flat

        today = date.today()

        try:
            budget = Budget.objects.get(flat=flat, month=today.month, year=today.year)
        except Exception:
            return Response({"message": "No budget found for this month."}, status=status.HTTP_400_BAD_REQUEST)

        if not budget:
            return Response({"message": "Invalid date."}, status=status.HTTP_400_BAD_REQUEST)


        serializer = TransactionCreateSerializer(data=request.data, context={'request': request,'flat':flat,'budget':budget})
        if serializer.is_valid():
            new_transaction = serializer.save()
            return Response(TransactionSerializer(new_transaction, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class FlatTransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        current_user=request.user
        membership=current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat=membership.flat
        transactions = flat.transactions.select_related('created_by').prefetch_related('items').order_by('-created_at')
        serializer = TransactionSerializer(transactions, many=True, context={'request': request})
        return Response({
            "transactions":serializer.data
        })


# Optimize performance by prefetching related TransactionItem objects and select_related User

class FlatActiveMemberTransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        filter_by_date = request.query_params.get('filterByDate', '').lower() == 'true'

        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat = membership.flat
        active_members = flat.memberships.filter(is_active=True).values_list('user', flat=True)
        transactions = flat.transactions.filter(created_by__in=active_members)

        if filter_by_date:
            start_date, end_date, error = parse_date_range(request)
            if error:
                return error
            transactions = transactions.filter(created_at__date__gte=start_date, created_at__date__lte=end_date)

        transactions = transactions.order_by('-created_at').select_related('created_by').prefetch_realetd('items')
        serializer = TransactionSerializer(transactions, many=True, context={'request': request})
        return Response({"transactions": serializer.data})


# GET #/?start_date=2024-01-01&end_date=2024-01-31

class UserTransactionListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        email = request.query_params.get('email')
        filter_by_date = request.query_params.get('filterByDate', '').lower() == 'true'

        if not email:
            return Response({"message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat = membership.flat

        if email == current_user.email:
            target_user = current_user
        else:
            target_user = User.objects.filter(email=email).first()
            if not target_user:
                return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
            if not target_user.memberships.filter(flat=flat, is_active=True).exists():
                return Response({"message": "User is not in your flat."}, status=status.HTTP_403_FORBIDDEN)

        transactions = target_user.transactions.filter(flat=flat)

        if filter_by_date:
            start_date, end_date, error = parse_date_range(request)
            if error:
                return error
            transactions = transactions.filter(created_at__date__gte=start_date, created_at__date__lte=end_date)

        transactions = transactions.order_by('-created_at').select_related('created_by').prefetch_related('items')
        serializer = TransactionSerializer(transactions, many=True, context={'request': request})
        return Response({"transactions": serializer.data})

class FlatActiveMemberTransactionByCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        filter_by_date = request.query_params.get('filterByDate', '').lower() == 'true'
        category = request.query_params.get('category')

        if not category:
            return Response({"message": "Category is required."}, status=status.HTTP_400_BAD_REQUEST)

        if category not in TransactionItem.ItemCategory.values:
            return Response({"message": f"Invalid category. Choose from {TransactionItem.ItemCategory.values}"}, status=status.HTTP_400_BAD_REQUEST)

        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat = membership.flat
        active_members = flat.memberships.filter(is_active=True).values_list('user', flat=True)
        transactions = flat.transactions.filter(created_by__in=active_members, items__category=category).distinct()

        if filter_by_date:
            start_date, end_date, error = parse_date_range(request)
            if error:
                return error
            transactions = transactions.filter(created_at__date__gte=start_date, created_at__date__lte=end_date)

        transactions = transactions.order_by('-created_at').select_related('created_by').prefetch_related('items')
        serializer = CategoryFilteredTransactionSerializer(transactions, many=True, context={'request': request, 'category': category})
        return Response({"transactions": serializer.data})

# The category validation against TransactionItem.ItemCategory.values checks that the client sends a valid choice like GR, CS, or HE and returns a clear error if not.
class UserTransactionByCategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        current_user = request.user
        email = request.query_params.get('email')
        filter_by_date = request.query_params.get('filterByDate', '').lower() == 'true'
        category = request.query_params.get('category')

        if not email:
            return Response({"message": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)

        if not category:
            return Response({"message": "Category is required."}, status=status.HTTP_400_BAD_REQUEST)

        if category not in TransactionItem.ItemCategory.values:
            return Response({"message": f"Invalid category. Choose from {TransactionItem.ItemCategory.values}"}, status=status.HTTP_400_BAD_REQUEST)

        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat = membership.flat

        if email == current_user.email:
            target_user = current_user
        else:
            target_user = User.objects.filter(email=email).first()
            if not target_user:
                return Response({"message": "User not found."}, status=status.HTTP_404_NOT_FOUND)
            if not target_user.memberships.filter(flat=flat, is_active=True).exists():
                return Response({"message": "User is not in your flat."}, status=status.HTTP_403_FORBIDDEN)

        transactions = target_user.transactions.filter(flat=flat, items__category=category).distinct()

        if filter_by_date:
            start_date, end_date, error = parse_date_range(request)
            if error:
                return error
            transactions = transactions.filter(created_at__date__gte=start_date, created_at__date__lte=end_date)

        transactions = transactions.order_by('-created_at').select_related('created_by').prefetch_related('items')
        serializer = CategoryFilteredTransactionSerializer(transactions, many=True, context={'request': request, 'category': category})
        return Response({"transactions": serializer.data})