from PawfectMatch.utils import dictfetchall
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import pdb
import jwt
from django.conf import settings
from rest_framework.permissions import AllowAny
from roles.utils import check_jwt_role

from ..serializers import ExaminationSerializer


class ExaminationsView(APIView):
    def get(self, request):
        user_id, role = check_jwt_role(request, request.headers["Authorization"])
        ##If the user is a vet get all the examinations of the vet using raw SQL
        cursor = connection.cursor()
        if (role == "veterinarian"):
            cursor.execute('''
                           SELECT * FROM Examination WHERE vet_id = %s
                           ''', [user_id])

        ##If the user is an adopter, get all the examinations of the adopter using raw SQL
        if (role == "adopter"):
            cursor.execute('''
                            SELECT ex.ex_id, ex.ex_description, ex.ex_file, p.pet_id, p.pet_name
                            FROM Examination ex
                            JOIN Reservation r ON ex.reservation_id = r.reservation_id
                            JOIN Pet p ON r.pet_id = p.pet_id
                            WHERE p.adopter_id = %s
                        ''', [user_id])
        examinations = dictfetchall(cursor)
        return Response(examinations, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ExaminationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        ##Check if the given reservation_id exists
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM Reservation WHERE reservation_id = %s",
            [request.data["reservation_id"]],
        )
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Reservation does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ##Check if the user is vet of the reservation

        ## Add the examination to the database using raw SQL
        cursor.execute(
            "INSERT INTO Examination (ex_description, ex_file, reservation_id) VALUES (%s, %s, %s)",
            [
                request.data["ex_description"],
                request.data["ex_file"],
                request.data["reservation_id"],
            ],
        )
        return Response(status=status.HTTP_201_CREATED)


class ExaminationView(APIView):
    def get(self, request, examination_id):
        ## Get the examination with the given examination_id using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM Examination WHERE examination_id = %s", [examination_id]
        )
        examination = dictfetchall(cursor)
        return Response(examination, status=status.HTTP_200_OK)

    def delete(self, request, examination_id):
        ## Delete the examination with the given examination_id using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "DELETE FROM Examination WHERE examination_id = %s", [examination_id]
        )
        return Response(status=status.HTTP_204_NO_CONTENT)

    def put(self, request, examination_id):
        ## Update the examination with the given examination_id using raw SQL
        cursor = connection.cursor()

        ##Check if the examination with given examination_id exists
        cursor.execute(
            "SELECT * FROM Examination WHERE examination_id = %s", [examination_id]
        )
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Examination does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ## Check if the user is vet of the examination
        cursor.execute(
            "SELECT * FROM Examination WHERE examination_id = %s AND vet_id = %s",
            [examination_id, request.data["vet_id"]],
        )
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Vet is not authorized to update the examination"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ## Update the examination with given examination_id using raw SQL
        cursor.execute(
            "UPDATE Examination SET ex_description = %s, ex_file = %s WHERE examination_id = %s",
            [request.data["ex_description"], request.data["ex_file"], examination_id],
        )
        return Response(status=status.HTTP_200_OK)
