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
    def get(request) -> Response:  # NOQA
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM Blogger "
                           "JOIN Adopter ON Adopter.adopter_id = Blogger.blogger_id "
                           "JOIN User ON User.user_id = Adopter.adopter_id")

            bloggers = dictfetchall(cursor)

            if len(bloggers) == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK, data=bloggers)

    @staticmethod
    def post(request) -> Response:
        if "user_name" not in request.data or "phone_number" not in request.data or "email" not in request.data or \
                "password" not in request.data or "blog_name" not in request.data:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            try:
                cursor.execute(
                    "INSERT INTO User (user_name, phone_number, email, password)"
                    "VALUES (%s, %s, %s, %s)",
                    [
                        request.data["user_name"],
                        request.data["phone_number"],
                        request.data["email"],
                        request.data["password"],
                    ]
                )

                cursor.execute("SELECT user_id FROM User WHERE email = %s", [request.data["email"]])
                user_id = dictfetchone(cursor)["user_id"]

                cursor.execute(
                    "INSERT INTO Adopter (adopter_id, card_number)"
                    "VALUES (%s, %s)",
                    [
                        user_id,
                        request.data["card_number"],
                    ]
                )

                cursor.execute(
                    "INSERT INTO Blogger (blogger_id, blog_name)"
                    "VALUES (%s, %s)",
                    [
                        user_id,
                        request.data["blog_name"],
                    ]
                )
            except Exception:  # NOQA
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_201_CREATED)


class BloggerDetailView(APIView):
    @staticmethod
    def get(request, _id) -> Response:  # NOQA
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM Blogger "
                "JOIN Adopter ON Adopter.adopter_id = Blogger.blogger_id "
                "JOIN User ON User.user_id = Adopter.adopter_id "
                "WHERE blogger_id = %s",
                [
                    _id,
                ]
            )

            try:
                blogger = dictfetchone(cursor)
            except Exception:  # NOQA
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK, data=blogger)

    @staticmethod
    def put(request, _id) -> Response:
        fields_adpt = ["card_number"]
        fields_user = ["user_name", "phone_number", "email", "password"]
        fields_blgr = ["blog_name"]

        update_adpt = [f"{field} = %s" for field in fields_adpt if field in request.data]
        update_user = [f"{field} = %s" for field in fields_user if field in request.data]
        update_blgr = [f"{field} = %s" for field in fields_blgr if field in request.data]

        values_adpt = [request.data[field] for field in fields_adpt if field in request.data]
        values_user = [request.data[field] for field in fields_user if field in request.data]
        values_blgr = [request.data[field] for field in fields_blgr if field in request.data]

        if len(update_adpt) == 0 and len(update_user) == 0 and len(update_blgr) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            try:
                if len(update_adpt) != 0:
                    cursor.execute(
                        f"UPDATE Adopter SET {', '.join(update_adpt)} WHERE adopter_id = %s",
                        [
                            *values_adpt,
                            _id,
                        ]
                    )

                if len(update_user) != 0:
                    cursor.execute(
                        f"UPDATE User SET {', '.join(update_user)} WHERE user_id = %s",
                        [
                            *values_user,
                            _id,
                        ]
                    )

                if len(update_blgr) != 0:
                    cursor.execute(
                        f"UPDATE Blogger SET {', '.join(update_blgr)} WHERE blogger_id = %s",
                        [
                            *values_blgr,
                            _id,
                        ]
                    )
            except Exception:  # NOQA
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)

    @staticmethod
    def delete(request, _id) -> Response:  # NOQA
        with connection.cursor() as cursor:
            try:
                cursor.execute("DELETE FROM Blogger WHERE blogger_id = %s", [_id])
            except Exception:  # NOQA
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
