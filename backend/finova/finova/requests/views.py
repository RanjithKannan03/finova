from django.db import transaction
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializers import RequestSerializer,RequestListSerializer
from .models import Request, Vote
from django.shortcuts import get_object_or_404
from django.utils import timezone


class CreateRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):

        current_user = request.user
        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = RequestSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        flat = membership.flat

        with transaction.atomic():
            new_request = serializer.save(flat=flat,created_by=current_user)
            Vote.objects.create(request=new_request,cast_by=current_user,choice=Vote.VoteChoice.ACCEPT)

        return Response({"message": "Created Successfully"}, status=status.HTTP_201_CREATED)

class ListRequestsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        current_user = request.user
        membership = current_user.memberships.filter(is_active=True).first()

        filter = request.query_params.get('filter','').lower()=='true'
        status_filter=request.query_params.get('status','').upper()

        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        flat=membership.flat
        requests=flat.requests.all()

        if filter:
            requests=requests.filter(status=status_filter)
        requests=requests.order_by('-created_date')
        serializer = RequestListSerializer(requests, many=True,context={'request':request})
        return Response({"requests": serializer.data})

class GetRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        request_id=get_object_or_404(Request,request_id='requestID')
        if not request_id:
            return Response({"message": "Request id is required"}, status=status.HTTP_400_BAD_REQUEST)


        request=Request.objects.get(id=request_id)
        serializer = RequestSerializer(request,context={'request':request})
        return Response({"request": serializer.data,"votedClosed":timezone.now() > request.expires_at})


class CastVote(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        current_user = request.user
        request_id=request.data.get('requestID')
        choice=request.data.get('choice')
        if not request_id:
            return Response({"message": "Request id is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not choice:
            return Response({"message": "Choice is required"}, status=status.HTTP_400_BAD_REQUEST)

        request_obj = get_object_or_404(Request, id=request_id)

        membership = current_user.memberships.filter(flat=request_obj.flat,is_active=True).first()

        if not membership:
            return Response({"message": "Not allowed"},status=status.HTTP_403_FORBIDDEN)

        if Vote.objects.filter(request=request_obj, cast_by=current_user).exists():
            return Response({"message": "Already voted"},status=status.HTTP_400_BAD_REQUEST)

        if timezone.now() > request_obj.expires_at:
            return Response({"message": "Voting closed"},status=status.HTTP_400_BAD_REQUEST)

        request=Request.objects.get(id=request_id)

        Vote.objects.create(request=request,cast_by=current_user,choice=choice)
        return Response({"message": "Cast Successfully"}, status=status.HTTP_201_CREATED)

class AdminMarkRequestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        current_user = request.user
        request_id=request.data.get('requestID')
        if not request_id:
            return Response({"message": "Request id is required"}, status=status.HTTP_400_BAD_REQUEST)

        request=get_object_or_404(Request,request_id='requestID')

        is_admin=current_user.email==request.flat.created_by.email
        if not is_admin:
            return Response({"message": "Not allowed"},status=status.HTTP_403_FORBIDDEN)

        request.finalize()

        return Response({"message": "Marked"}, status=status.HTTP_201_CREATED)




