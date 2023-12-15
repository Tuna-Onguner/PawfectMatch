from PawfectMatch.utils import dictfetchall, dictfetchone
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

"""
Request Handlers for Expert related requests
get /expert/ - Returns all Experts
post /expert/ - Creates a new Expert
get /expert/<expert_id>/ - Returns a specific Expert by id
put /expert/<expert_id>/ - Updates a specific Expert by id
delete /expert/<expert_id>/ - Deletes a specific Expert by id
"""


class ExpertView(APIView):
    @staticmethod
    def get(request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Expert "
                           "JOIN Blogger ON Blogger.blogger_id = Expert.expert_id "
                           "JOIN Adopter ON Adopter.adopter_id = Blogger.blogger_id "
                           "JOIN User ON User.user_id = Adopter.adopter_id")
            experts = dictfetchall(cursor)
        return Response(status=status.HTTP_200_OK, data=experts)

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
        blogger_data = {
            "blog_name": request.data["blog_name"],
        }

        with connection.cursor() as cursor:
            cursor.execute(
                "INSERT INTO User "
                "(user_name, phone_number, email, password) "
                "VALUES (%s, %s, %s, %s) ",
                [user_data["user_name"],
                 user_data["phone_number"],
                 user_data["email"],
                 user_data["password"]]
            )

            user_id = cursor.fetchone()[0]

            cursor.execute(
                "INSERT INTO Adopter (adopter_id, card_number)"
                "VALUES (%s, %s)",
                [user_id,
                 adopter_data["card_number"]]
            )

            cursor.execute(
                "INSERT INTO Blogger (blogger_id, blog_name) "
                "VALUES (%s, %s)",
                [user_id,
                 blogger_data["blog_name"]]
            )

            cursor.execute(
                "INSERT INTO Expert (expert_id) "
                "VALUES (%s)",
                [user_id]
            )

        return Response(status=status.HTTP_201_CREATED)


class ExpertDetailView(APIView):
    @staticmethod
    def get(request, expert_id):
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM Expert "
                "JOIN Blogger ON Blogger.blogger_id = Expert.expert_id "
                "JOIN Adopter ON Adopter.adopter_id = Blogger.blogger_id "
                "JOIN User ON User.user_id = Adopter.adopter_id "
                "WHERE expert_id = %s ",
                [expert_id])
            expert = dictfetchone(cursor)

            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK, data=expert)

    @staticmethod
    def put(request, expert_id):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE Blogger "
                           "SET blog_name = %s "
                           "WHERE blogger_id = %s",
                           [request.data["blog_name"],
                            expert_id])
        return Response(status=status.HTTP_200_OK)

    @staticmethod
    def delete(request, expert_id):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Expert "
                           "WHERE expert_id = %s",
                           [expert_id])
        return Response(status=status.HTTP_200_OK)
