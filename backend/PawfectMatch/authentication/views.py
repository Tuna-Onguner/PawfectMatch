# Create your views here.
from authentication.models.User import User
from django.db import connection
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import UserSerializer


## Create a custom token class that inherits from the simplejwt's token class
class CustomToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)
        token["user_id"] = user.user_id
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

        # ToDo Check if this is the correct way to get values.
        user = User(
            user_id=row[0],
            user_name=row[1],
            phone_number=row[2],
            email=row[3],
            password=row[4],
        )
        if user is not None:
            ## Generate JWT token
            refresh = CustomToken.for_user(user)
            return Response(
                {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                },
                status=status.HTTP_200_OK,
            )
        else:
            return Response(
                {"detail": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED
            )


class LogoutView(APIView):
    def post(self, request):
        refresh = request.data.get("refresh")
        # If the refresh token is null, return an appropriate error message
        # If the refresh token is not null, blacklist the refresh token
        # If the refresh token is not null, return a success message
        if refresh is None:
            return Response(
                {"detail": "Invalid token"}, status=status.HTTP_400_BAD_REQUEST
            )

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
