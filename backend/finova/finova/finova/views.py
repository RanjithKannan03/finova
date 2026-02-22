from rest_framework.views import APIView
from django.http import HttpResponse

class HomeView(APIView):
    def get(self,request):
        return HttpResponse("Hellow World :)")