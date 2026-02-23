from django.urls import path
from .views import CreateFlatView,ExitFlatView,GetFlatInfoView,JoinFlatView

urlpatterns=[
    path('createFlat/',CreateFlatView.as_view()),
    path('exitFlat/',ExitFlatView.as_view()),
    path('getFlatInfo/',GetFlatInfoView.as_view()),
    path('joinFlat/',JoinFlatView.as_view())
]