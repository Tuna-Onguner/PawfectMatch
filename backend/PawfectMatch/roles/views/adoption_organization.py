from PawfectMatch.utils import dictfetchall, dictfetchone
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

"""
Request Handlers for Adoption Organization related requests
get /adoption_organization/ - Returns all Adoption Organizations
post /adoption_organization/ - Creates a new Adoption Organization
get /adoption_organization/<ao_id>/ - Returns a specific Adoption Organization by id
put /adoption_organization/<ao_id>/ - Updates a specific Adoption Organization by id
delete /adoption_organization/<ao_id>/ - Deletes a specific Adoption Organization by id
"""


class AdoptionOrganizationView(APIView):
    @staticmethod
    def get(request) -> Response:  # NOQA
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM AdoptionOrganization "
                "JOIN User ON User.user_id = AdoptionOrganization.ao_id"
            )

            organizations = dictfetchall(cursor)

            if len(organizations) == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK, data=organizations)

    @staticmethod
    def post(request) -> Response:
        if (
            "user_name" not in request.data
            or "phone_number" not in request.data
            or "email" not in request.data
            or "password" not in request.data
            or "ao_street" not in request.data
            or "ao_city" not in request.data
            or "ao_state" not in request.data
            or "ao_country" not in request.data
        ):
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
                    ],
                )

                cursor.execute(
                    "SELECT user_id FROM User WHERE email = %s", [request.data["email"]]
                )
                user_id = dictfetchone(cursor)["user_id"]

                cursor.execute(
                    "INSERT INTO AdoptionOrganization (ao_id, ao_name, ao_street, ao_city, ao_state, ao_country)"
                    "VALUES (%s, %s, %s, %s, %s, %s)",
                    [
                        user_id,
                        request.data["user_name"],
                        request.data["ao_street"],
                        request.data["ao_city"],
                        request.data["ao_state"],
                        request.data["ao_country"],
                    ],
                )
            except Exception:  # NOQA
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_201_CREATED)


class AdoptionOrganizationDetailView(APIView):
    @staticmethod
    def get(request, _id):  # NOQA
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM AdoptionOrganization "
                "JOIN User ON User.user_id = AdoptionOrganization.ao_id "
                "WHERE ao_id = %s",
                [_id],
            )

            try:
                organization = dictfetchone(cursor)
            except Exception:  # NOQA
                return Response(status=status.HTTP_404_NOT_FOUND)

        return Response(status=status.HTTP_200_OK, data=organization)

    @staticmethod
    def put(request, _id) -> Response:
        fields_ao_ = ["ao_name", "ao_street", "ao_city", "ao_state", "ao_country"]
        fields_usr = ["user_name", "phone_number", "email", "password"]

        update_ao_ = [f"{field} = %s" for field in fields_ao_ if field in request.data]
        update_usr = [f"{field} = %s" for field in fields_usr if field in request.data]

        values_ao_ = [
            request.data[field] for field in fields_ao_ if field in request.data
        ]
        values_usr = [
            request.data[field] for field in fields_usr if field in request.data
        ]

        if len(update_ao_) == 0 and len(update_usr) == 0:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        with connection.cursor() as cursor:
            try:
                if len(update_ao_) != 0:
                    cursor.execute(
                        f"UPDATE AdoptionOrganization SET {', '.join(update_ao_)} WHERE ao_id = %s",
                        [
                            *values_ao_,
                            _id,
                        ],
                    )
                if len(update_usr) != 0:
                    cursor.execute(
                        f"UPDATE User SET {', '.join(update_usr)} WHERE user_id = %s",
                        [
                            *values_usr,
                            _id,
                        ],
                    )
            except Exception:  # NOQA
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)

    @staticmethod
    def delete(request, _id) -> Response:  # NOQA
        with connection.cursor() as cursor:
            try:
                cursor.execute(
                    "DELETE FROM AdoptionOrganization WHERE ao_id = %s", [_id]
                )
            except Exception:  # NOQA
                return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response(status=status.HTTP_200_OK)
