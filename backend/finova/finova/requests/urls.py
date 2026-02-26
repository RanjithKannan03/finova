from django.urls import path
from .views import ListRequestsView,CreateRequestView,GetRequestView,CastVote,AdminMarkRequestView

urlpatterns = [
    path('create/', CreateRequestView.as_view(), name='create_request'),
    path('get/', GetRequestView.as_view(), name='get_request'),
    path('list/', ListRequestsView.as_view(), name='list_all_requests'),
    path('cast/', CastVote.as_view(), name='cast_vote'),
    path('mark/',AdminMarkRequestView.as_view(), name='admin_mark_request')
]