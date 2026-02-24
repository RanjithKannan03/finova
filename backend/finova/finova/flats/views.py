from django.db import transaction
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .models import Flat,Membership
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from budgets.services import create_initial_budget
from decimal import Decimal

class CreateFlatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        current_user=request.user
        if current_user.memberships.filter(is_active=True).exists():
            return Response({"message":"You are already in a flat."},status=status.HTTP_400_BAD_REQUEST)

        flat_name = request.data.get("flatName")
        if not flat_name:
            return Response({"message":"Flat Name is required"},status=status.HTTP_400_BAD_REQUEST)

        budget_amount = request.data.get("budget")
        if not budget_amount:
            return Response({"message": "Budget amount is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            amount = Decimal(str(budget_amount))
        except Exception:
            return Response({"message": "Invalid budget amount."}, status=status.HTTP_400_BAD_REQUEST)

        with transaction.atomic():
            new_flat = Flat.objects.create(
                name=flat_name,
                created_by=current_user
            )

            Membership.objects.create(
                flat=new_flat,
                resident=current_user
            )

            create_initial_budget(flat=new_flat,amount=amount)
        return Response({"message":"Created Successfully"},status=status.HTTP_201_CREATED)

class JoinFlatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        current_user=request.user
        join_code=request.data.get("code")

        if not join_code:
            return Response({"message": "Code is required."}, status=status.HTTP_400_BAD_REQUEST)

        if current_user.memberships.filter(is_active=True).exists():
            return Response({"message":"You are already in a flat."},status=status.HTTP_400_BAD_REQUEST)

        flat=get_object_or_404(Flat,join_code=join_code)

        if flat.is_full:
            return Response(
                {"message": "Flat is already full."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # new_membership=Membership(flat=flat,resident=current_user)
        # new_membership.save()
        Membership.objects.create(flat=flat,resident=current_user)
        return Response({"message": "Joined Successfully"}, status=status.HTTP_201_CREATED)

class ExitFlatView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self,request):
        current_user=request.user

        membership=current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)

        membership.is_active=False
        membership.save()

        return Response({"message": "Left flat successfully."}, status=status.HTTP_200_OK)

class GetFlatInfoView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        current_user=request.user

        membership = current_user.memberships.filter(is_active=True).first()
        if not membership:
            return Response({"message": "You are not in a flat."}, status=status.HTTP_400_BAD_REQUEST)



        flat=membership.flat

        flatmates=flat.memberships.filter(is_active=True).exclude(resident=current_user)
        return Response({
            "flat": {
                "name": flat.name,
                "numResidents": flat.num_residents,
                "isFull": flat.is_full,
                "joinCode":flat.join_code
            },
            "flatmates": [
                {"username": m.resident.username, "email": m.resident.email}
                for m in flatmates
            ]
        },status=status.HTTP_200_OK)