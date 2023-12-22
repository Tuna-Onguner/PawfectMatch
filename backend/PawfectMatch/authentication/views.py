# Create your views here.
from django.db import connection
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from authentication.models.Backends import MyBackend
from roles.utils import get_role
import pdb

from .serializers import UserSerializer

from rest_framework_simplejwt.tokens import RefreshToken


class CustomToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = cls()
        token["user_id"] = user.get_user_id()  # Use your custom method to get user_id
        token["role"] = get_role(user.get_user_id())
        # Add other claims as needed
        return token


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        # Initialize a connection cursor with DictCursor
        cursor = connection.cursor()
        # SQL CODE TO CHECK IF USER EXISTS
        cursor.execute(
            "SELECT * FROM User WHERE email = %s AND password = %s", [email, password]
        )
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )
        # Authenticate the user
        pdb.set_trace()
        user = MyBackend.authenticate(request=request, email=email, password=password)
        if user is not None:
            # Login the user
            MyBackend.login(request=request, user=user)
            # Generate a token for the user
            pdb.set_trace()
            token = CustomToken.for_user(user=user)
            return Response(
                {
                    "access_token": str(token.access_token),
                    "refresh_token": str(token),
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    def post(self, request):
        MyBackend.logout(request)
        return Response(status=status.HTTP_204_NO_CONTENT)


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            # SQL CODE TO INSERT INTO USER TABLE
            cursor = connection.cursor()

            cursor.execute(
                "INSERT INTO User (user_name, phone_number, email, password) VALUES (%s, %s, %s, %s)",
                [
                    serializer.data["user_name"],
                    serializer.data["phone_number"],
                    serializer.data["email"],
                    serializer.data["password"],
                ],
            )

            # Get the user_id of the user that was just inserted
            cursor.execute(
                "SELECT user_id FROM User WHERE email = %s", [serializer.data["email"]]
            )
            user_id = cursor.fetchone()[0]

            # Also insert into the adopter table
            cursor.execute("INSERT INTO Adopter (adopter_id) VALUES (%s)", [user_id])
            return Response(
                {"message": "User created successfully"}, status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
