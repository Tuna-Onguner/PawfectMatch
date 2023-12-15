from PawfectMatch.utils import dictfetchall, dictfetchone
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

"""
Request Handlers for Blogger related requests
get /blogger/ - Returns all Bloggers
post /blogger/ - Creates a new Blogger
get /blogger/<blogger_id>/ - Returns a specific Blogger by id
put /blogger/<blogger_id>/ - Updates a specific Blogger by id
delete /blogger/<blogger_id>/ - Deletes a specific Blogger by id
"""


class BloggerView(APIView):
    @staticmethod
    def get(request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Blogger "
                           "JOIN Adopter ON Adopter.adopter_id = Blogger.blogger_id "
                           "JOIN User ON User.user_id = Adopter.adopter_id")
            bloggers = dictfetchall(cursor)
        return Response(status=status.HTTP_200_OK, data=bloggers)

    @staticmethod
    def post(request):
        # Extract the user, adopter and blogger data from the request
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

        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to insert the user data into the User table
            cursor.execute(
                "INSERT INTO User (user_name, phone_number, email, password)"
                "VALUES (%s, %s, %s, %s)",
                [user_data["user_name"],
                 user_data["phone_number"],
                 user_data["email"],
                 user_data["password"]]
            )

            user_id = cursor.fetchone()[0]

            # Execute a query to insert the adopter data into the Adopter table
            cursor.execute(
                "INSERT INTO Adopter (adopter_id, card_number)"
                "VALUES (%s, %s)",
                [user_id,
                 adopter_data["card_number"]]
            )

            # Execute a query to insert the blogger data into the Blogger table
            cursor.execute(
                "INSERT INTO Blogger (blogger_id, blog_name)"
                "VALUES (%s, %s)",
                [user_id,
                 blogger_data["blog_name"]]
            )

        # Return an HTTP 201 Created response
        return Response(status=status.HTTP_201_CREATED)


class BloggerDetailView(APIView):
    @staticmethod
    def get(request, blogger_id):
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM Blogger "
                "JOIN Adopter ON Adopter.adopter_id = Blogger.blogger_id "
                "JOIN User ON User.user_id = Adopter.adopter_id "
                "WHERE blogger_id = %s ",
                [blogger_id])
            blogger = dictfetchone(cursor)

            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK, data=blogger)

    @staticmethod
    def put(request, blogger_id):
        with connection.cursor() as cursor:
            cursor.execute("UPDATE Blogger SET blog_name = %s "
                           "WHERE blogger_id = %s",
                           [request.data["blog_name"],
                            blogger_id])
        return Response(status=status.HTTP_200_OK)

    @staticmethod
    def delete(request, blogger_id):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM Blogger "
                           "WHERE blogger_id = %s",
                           [blogger_id])
        return Response(status=status.HTTP_200_OK)
