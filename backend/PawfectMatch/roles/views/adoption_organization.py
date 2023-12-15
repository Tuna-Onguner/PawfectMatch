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
    def get(request):
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM AdoptionOrganization "
                           "JOIN User ON User.user_id = AdoptionOrganization.ao_id")
            organizations = dictfetchall(cursor)
        return Response(status=status.HTTP_200_OK, data=organizations)

    @staticmethod
    def post(request):
        user_data = {
            "user_name": request.data["user_name"],
            "phone_number": request.data["phone_number"],
            "email": request.data["email"],
            "password": request.data["password"]
        }
        organization_data = {
            "ao_name": request.data["ao_name"],
            "ao_street": request.data["ao_street"],
            "ao_city": request.data["ao_city"],
            "ao_state": request.data["ao_state"],
            "ao_country": request.data["ao_country"]
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
                "INSERT INTO AdoptionOrganization (ao_id, ao_name, ao_street, ao_city, ao_state, ao_country) "
                "VALUES (%s, %s, %s, %s, %s, %s)",
                [user_id,
                 organization_data["ao_name"],
                 organization_data["ao_street"],
                 organization_data["ao_city"],
                 organization_data["ao_state"],
                 organization_data["ao_country"]]
            )

        return Response(status=status.HTTP_201_CREATED)


class AdoptionOrganizationDetailView(APIView):
    @staticmethod
    def get(request, ao_id):
        with connection.cursor() as cursor:
            cursor.execute(
                "SELECT * FROM AdoptionOrganization "
                "JOIN User ON User.user_id = AdoptionOrganization.ao_id "
                "WHERE ao_id = %s ",
                [ao_id])
            organization = dictfetchone(cursor)

            if cursor.rowcount == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)
        return Response(status=status.HTTP_200_OK, data=organization)

    @staticmethod
    def put(request, ao_id):
        with connection.cursor() as cursor:
            cursor.execute(
                "UPDATE AdoptionOrganization "
                "SET ao_name = %s, ao_street = %s, ao_city = %s, ao_state = %s, ao_country = %s "
                "WHERE ao_id = %s",
                [request.data["ao_name"],
                 request.data["ao_street"],
                 request.data["ao_city"],
                 request.data["ao_state"],
                 request.data["ao_country"],
                 ao_id])
        return Response(status=status.HTTP_200_OK)

    @staticmethod
    def delete(request, ao_id):
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM AdoptionOrganization "
                           "WHERE ao_id = %s",
                           [ao_id])
        return Response(status=status.HTTP_200_OK)
