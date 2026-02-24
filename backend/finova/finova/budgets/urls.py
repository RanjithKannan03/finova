from django.urls import path
from .views import EditBudgetView, FlatBudgetListView

urlpatterns = [
    path('list-budgets/', FlatBudgetListView.as_view(), name='flat_budget_list'),
    path('edit-budget/', EditBudgetView.as_view(), name='edit_budget'),
]