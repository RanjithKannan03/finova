from django.urls import path
from .views import CreateFlatView,ExitFlatView,GetFlatInfoView,JoinFlatView

urlpatterns=[
    path('createFlat/',CreateFlatView.as_view(),name="create_flat"),
    path('exitFlat/',ExitFlatView.as_view(),name="exit_flat"),
    path('getFlatInfo/',GetFlatInfoView.as_view(),name="get_flat_info"),
    path('joinFlat/',JoinFlatView.as_view(),name="join_flat")
]