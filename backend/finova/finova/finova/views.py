from rest_framework.views import APIView
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated

class HomeView(APIView):
    def get(self,request):
        return HttpResponse("Hellow World :)")

class TestView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self,request):
        return HttpResponse("You are Authenticated!")