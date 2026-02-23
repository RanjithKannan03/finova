from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate,get_user_model
from django.middleware.csrf import get_token
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError

User=get_user_model()

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email=request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=400)

        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({"message": "Login successful"})

        # Set Access Token
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,  # True in production
            samesite="Lax"
        )

        # Set Refresh Token
        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False, # True in production
            samesite="Lax"
        )

        # Set CSRF Cookie
        response.set_cookie(
            key="csrftoken",
            value=get_token(request),
            secure=False, # True in production
            samesite="Lax"
        )

        return response

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get("username")
        first_name=request.data.get("firstName")
        last_name=request.data.get("lastName")
        email = request.data.get("email")
        password = request.data.get("password")

        if not username or not email or not password:
            return Response({"error": "All fields required"}, status=400)

        if User.objects.filter(email=email).exists():
            return Response({"error": "Email already exists"}, status=400)

        user = User.objects.create_user(username=username, email=email, password=password,first_name=first_name,last_name=last_name)

        # Create tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        response = Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)

        # Set cookies
        response.set_cookie(
            key="access_token",
            value=access_token,
            httponly=True,
            secure=False,  # True in production
            samesite="Lax"
        )

        response.set_cookie(
            key="refresh_token",
            value=str(refresh),
            httponly=True,
            secure=False, # True in production
            samesite="Lax"
        )

        # CSRF
        response.set_cookie(
            key="csrftoken",
            value=get_token(request),
            secure=False, # True in production
            samesite="Lax"
        )

        return response

class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        response = Response({"message": "Logged out successfully"})

        # Delete cookies
        response.delete_cookie("access_token",samesite="Lax")
        response.delete_cookie("refresh_token",samesite="Lax")
        response.delete_cookie("csrftoken")

        return response

class RefreshView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({"error": "No refresh token"}, status=401)

        try:
            refresh = RefreshToken(refresh_token)
        except TokenError:
            return Response({"error": "Invalid or expired refresh token"}, status=401)
        new_access = str(refresh.access_token)

        response = Response({"message": "Token refreshed"})
        response.set_cookie(
            key="access_token",
            value=new_access,
            httponly=True,
            secure=False,
            samesite="Lax"
        )

        return response

class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            "isAuthenticated":True,
            "username": request.user.username,
            "firstName":request.user.first_name,
            "lastName":request.user.last_name,
            "email": request.user.email
        })

@method_decorator(ensure_csrf_cookie, name='dispatch')
class CSRFView(APIView):
    def get(self, request):
        return Response({"detail": "CSRF cookie set"})
