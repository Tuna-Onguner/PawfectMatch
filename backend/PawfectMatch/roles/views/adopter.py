from PawfectMatch.utils import dictfetchall, dictfetchone
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

"""
Request Handlers for Adopter related requests
get /adopter/ - Returns all Adopters
post /adopter/ - Creates a new Adopter
get /adopter/<adopter_id>/ - Returns a specific Adopter by id
put /adopter/<adopter_id>/ - Updates a specific Adopter by id
delete /adopter/<adopter_id>/ - Deletes a specific Adopter by id
"""


class AdopterView(APIView):
    @staticmethod
    def get(request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Adopter "
                           "JOIN User ON User.user_id = Adopter.adopter_id")
            adopters = dictfetchall(cursor)
        return Response(status=status.HTTP_200_OK, data=adopters)

    @staticmethod
    def post(request):
        user_data = {
            "user_name": request.data["user_name"],
            "phone_number": request.data["phone_number"],
            "email": request.data["email"],
            "password": request.data["password"]
        }
        adopter_data = {
            "card_number": request.data["card_number"],
        }

        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO User (user_name, phone_number, email, password) "
                "VALUES (%s, %s, %s, %s) ",
                [user_data["user_name"],
                 user_data["phone_number"],
                 user_data["email"],
                 user_data["password"]]
            )

            user_id = cursor.fetchone()[0]

            cursor.execute(
                "INSERT INTO Adopter (adopter_id, card_number) "
                "VALUES (%s, %s)",
                [user_id,
                 adopter_data["card_number"]]
            )

        return Response(status=status.HTTP_201_CREATED)


class AdopterDetailView(APIView):
    @staticmethod
    def get(request, adopter_id):
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM Adopter "
                "JOIN User ON User.user_id = Adopter.adopter_id "
                "WHERE adopter_id = %s "
                [adopter_id])
            adopter = dictfetchone(cursor)

            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK, data=adopter)

    @staticmethod
    def put(request, adopter_id):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE Adopter "
                           "SET card_number = %s "
                           "WHERE adopter_id = %s",
                           [request.data["card_number"],
                            adopter_id])
        return Response(status=status.HTTP_200_OK)

    @staticmethod
    def delete(request, adopter_id):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Adopter "
                           "WHERE adopter_id = %s",
                           [adopter_id])
        return Response(status=status.HTTP_200_OK)
