from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from .models import User
from django.db import connection

class CustomToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = cls()
        token['user_id'] = user.get_user_id()  # Use your custom method to get user_id
        # Add other claims as needed
        return token

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # If authentication is successful, create the refresh and access tokens
        user = User.objects.filter(email=email, password=password).first()

        if user is not None:
            refresh = CustomToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }, status=status.HTTP_200_OK)
        else:
            return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutView(APIView):
    def post(self, request):
        refresh = request.data.get('refresh')
        # If the refresh token is null, return an appropriate error message
        # If the refresh token is not null, blacklist the refresh token
        # If the refresh token is not null, return a success message
        if refresh is None:
            return Response({'detail': 'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            token = RefreshToken(refresh)
            token.blacklist()
            return Response({}, status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print(f"Exception: {e}")
            return Response({}, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # SQL CODE TO INSERT INTO USER TABLE
            cursor = connection.cursor()

            cursor.execute("INSERT INTO User (user_name, phone_number, email, password) VALUES (%s, %s, %s, %s)", 
                           [serializer.data['user_name'], serializer.data['phone_number'], serializer.data['email'], 
                            serializer.data['password']])
            
            # Get the user_id of the user that was just inserted
            cursor.execute("SELECT user_id FROM User WHERE email = %s", [serializer.data['email']])
            user_id = cursor.fetchone()[0]

            #Also insert into the adopter table
            cursor.execute("INSERT INTO Adopter (adopter_id) VALUES (%s)", [user_id])
            return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
