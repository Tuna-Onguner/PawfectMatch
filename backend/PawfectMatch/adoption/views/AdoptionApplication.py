import pdb

from PawfectMatch.utils import dictfetchall
from adoption.serializers import AdoptionApplicationSerializer
from django.db import connection
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from roles.utils import check_jwt_role
from rest_framework.views import APIView


## Create an adoption application for a pet using REST API
# @param request POS and GET request with AdoptionApplication Serializer
# @param JWT token
# @return JSON response with status code
class AdoptionApplicationView(APIView):
    def get(self, request):
        cursor = connection.cursor()
        user_id, role = check_jwt_role(request, request.headers["Authorization"])
        cursor = connection.cursor()
        # Join the AdoptionApp table with the Pet table to get the pet name
        if role == "adoptionorganization":
            cursor.execute(
                "SELECT * FROM AdoptionApp JOIN Pet ON AdoptionApp.pet_id = Pet.pet_id WHERE Pet.ao_id = %s",
                [user_id],
            )
        else:
            # Return error
            return Response(
                {"detail": "User can't create adoption app"},
                status=status.HTTP_404_NOT_FOUND,
            )
        applications = dictfetchall(cursor)
        return Response(applications, status=status.HTTP_200_OK)

    def post(self, request):
        user_id, role = check_jwt_role(request, request.headers["Authorization"])
        ##Add the current date to the request data
        serializer = AdoptionApplicationSerializer(data=request.data)
        try:
            # Check if the serializer is valid
            if not serializer.is_valid():
                return Response(
                    {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
                )

            cursor = connection.cursor()
            # Check if the user is an adopter

            if role != "adopter":
                return Response(
                    {"detail": "User is not an adopter"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if the pet exists
            cursor.execute(
                "SELECT * FROM Pet WHERE pet_id = %s", [request.data["pet_id"]]
            )
            row = cursor.fetchone()
            if row is None:
                return Response(
                    {"detail": "Pet does not exist"}, status=status.HTTP_400_BAD_REQUEST
                )
            elif row is not None and row[6] == 1:
                return Response(
                    {"detail": "Pet is already adopted"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Check if the pet is already applied from the same adopter
            cursor.execute(
                "SELECT * FROM AdoptionApp WHERE pet_id = %s AND adopter_id = %s",
                [request.data["pet_id"], user_id],
            )
            row = cursor.fetchone()
            if row is not None:
                return Response(
                    {"detail": "Pet is already applied"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Now we can create the adoption application if the pet exists and is not adopted
            cursor.execute(
                "INSERT INTO AdoptionApp (adopter_id, aapp_date, pet_id, aapp_file, aapp_status, aapp_response_date,"
                + "amotivation_text) VALUES (%s, %s, %s, %s, %s, %s, %s)",
                [
                    request.data["adopter_id"],
                    request.data["aapp_date"],
                    request.data["pet_id"],
                    request.data["aapp_file"],
                    request.data["aapp_status"],
                    request.data["aapp_response_date"],
                    request.data["amotivation_text"],
                ],
            )
            return Response({"status": "success"}, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)


## Get, delete or update a single adoption application using REST API
# @param request GET, DELETE or PUT request with AdoptionApplication Serializer
# @param JWT token
# @param pk Primary key of the adoption application
# @return JSON response with status code
@api_view(["GET", "DELETE", "PUT"])
def adoption_application(request, pk):
    user_id = request.user.get_user_id()
    if request.method == "GET":
        # Check if the user is an adoption organization or adopter who has a pet that is applied
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM adoption_organization WHERE user_id = %s", [user_id]
        )
        row = cursor.fetchone()

        # Then return the adoption application for the adoption organization
        if row is not None:
            cursor.execute(
                "SELECT * FROM AdoptionApp WHERE pet_id IN (SELECT pet_id FROM pet WHERE adoption_organization_id = %s) AND adopter_id = %s",
                [row[0], pk],
            )
            application = dictfetchall(cursor)
            if application is not None:
                return Response(application, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"detail": "Adoption application does not exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        # Check if the user is an adopter
        cursor.execute("SELECT * FROM adopter WHERE user_id = %s", [user_id])
        row = cursor.fetchone()

        # Then return the adoption application for the adopter
        if row is not None:
            cursor.execute(
                "SELECT * FROM adoption_application WHERE adopter_id = %s AND aap = %s",
                [row[0], pk],
            )
            application = dictfetchall(cursor)
            if application is not None:
                return Response(application, status=status.HTTP_200_OK)
            else:
                return Response(
                    {"detail": "Adoption application does not exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
        else:
            return Response(
                {"detail": "User is not an adopter or adoption organization"},
                status=status.HTTP_400_BAD_REQUEST,
            )
