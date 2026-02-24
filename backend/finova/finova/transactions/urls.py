from django.urls import path
from .views import (
    CreateTransactionView,
    FlatActiveMemberTransactionListView,
    UserTransactionListView,
    FlatTransactionListView,
    UserTransactionByCategoryView,
    FlatActiveMemberTransactionByCategoryView
)

urlpatterns = [
    path('create-transaction/', CreateTransactionView.as_view(), name="create_transaction"),
    path('user-transactions/', UserTransactionListView.as_view(), name="user_transactions"),
    path('user-transactions-by-category/', UserTransactionByCategoryView.as_view(),name="user_transactions_by_category"),
    path('flat-transactions/', FlatTransactionListView.as_view(), name="flat_transactions"),
    path('flat-active-member-transactions/', FlatActiveMemberTransactionListView.as_view(),name="flat_active_member_transactions"),
    path(
        'flat-active-member-transactions-by-category/',
        FlatActiveMemberTransactionByCategoryView.as_view(),
        name="flat_active_member_transactions_by_category"
    ),
]
