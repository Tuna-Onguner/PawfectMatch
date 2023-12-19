from PawfectMatch.utils import dictfetchall
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import ReservationSerializer


class ReservationView(APIView):
    ## Get the reservation with given reservation_id using raw SQL
    def get(self, request, pk):
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Reservation WHERE reservation_id = %s", [pk])
        row = dictfetchall(cursor)
        if row is None:
            return Response(
                {"detail": "Reservation does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(row[0], status=status.HTTP_200_OK)

    def put(self, request, pk):
        ## Get the reservation with given reservation_id using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Reservation WHERE reservation_id = %s", [pk])
        row = dictfetchall(cursor)
        if row is None:
            return Response(
                {"detail": "Reservation does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        serializer = ReservationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        ## Update the reservation with given reservation_id using raw SQL
        cursor.execute(
            "UPDATE Reservation SET rv_status = %s, rv_response_date = %s WHERE reservation_id = %s",
            [
                request.data["rv_status"],
                request.data["rv_response_date"],
                pk,
            ],
        )

        ##Return the updated reservation
        cursor.execute("SELECT * FROM Reservation WHERE reservation_id = %s", [pk])
        row = dictfetchall(cursor)
        return Response(row[0], status=status.HTTP_200_OK)

    def delete(self, request, pk):
        ## Get the reservation with given reservation_id using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Reservation WHERE reservation_id = %s", [pk])
        row = dictfetchall(cursor)
        if row is None:
            return Response(
                {"detail": "Reservation does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        ## Delete the reservation with given reservation_id using raw SQL
        cursor.execute("DELETE FROM Reservation WHERE reservation_id = %s", [pk])
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReservationsView(APIView):
    def get(self, request):
        ## Get all the reservations of the user with given user_id using raw SQL
        user_id = request.data["user_id"]

        ##If the user is a vet, return all the reservations of the vet
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Veterinarian WHERE vet_id = %s", [user_id])
        row = dictfetchall(cursor)
        if row is not None:
            cursor.execute(
                "SELECT * FROM Reservation WHERE ex_id IN (SELECT examination_id FROM Examination WHERE vet_id = %s)",
                [user_id],
            )
            reservations = dictfetchall(cursor)
            return Response(reservations, status=status.HTTP_200_OK)

        ##If the user is an adopter, return all the reservations of the adopter
        cursor.execute("SELECT * FROM Reservation WHERE adopter_id = %s", [user_id])
        reservations = dictfetchall(cursor)
        return Response(reservations, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ReservationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        ##Check if the given adopter_id exists
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM Adopter WHERE adopter_id = %s", [request.data["adopter_id"]]
        )
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Adopter does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ##Check if the given pet_id exists
        cursor.execute("SELECT * FROM Pet WHERE pet_id = %s", [request.data["pet_id"]])
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Pet does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )
        ##Check if the given slots with the id's are available slots in request.data["slots"] will have ids
        for slot_id in request.data["slots"]:
            cursor.execute("SELECT * FROM Slot WHERE slot_id = %s", [slot_id])
            row = cursor.fetchone()
            if row is None:
                return Response(
                    {"detail": "Slot does not exist"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            if row["is_reserved"] == True:
                return Response(
                    {"detail": "Slot is reserved"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

        ## Add the reservation to the database using raw SQL
        cursor.execute(
            "INSERT INTO Reservation (adopter_id, pet_id, rv_date, reasoning, rv_status, rv_response_date) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            [
                request.data["adopter_id"],
                request.data["pet_id"],
                request.data["rv_date"],
                request.data["reasoning"],
                request.data["rv_status"],
                request.data["rv_response_date"],
            ],
        )

        ##Get the reservation_id of the reservation
        cursor.execute(
            "SELECT * FROM Reservation WHERE adopter_id = %s AND pet_id = %s AND rv_date = %s AND reasoning = %s AND rv_status = %s AND rv_response_date = %s",
            [
                request.data["adopter_id"],
                request.data["pet_id"],
                request.data["rv_date"],
                request.data["reasoning"],
                request.data["rv_status"],
                request.data["rv_response_date"],
            ],
        )
        row = dictfetchall(cursor)
        reservation_id = row[0]["reservation_id"]

        ##Now create examination for the reservation
        cursor.execute(
            "INSERT INTO Examination (reservation_id) VALUES (%s)",
            [
                reservation_id,
            ],
        )

        ##Now get the examination_id of the examination
        cursor.execute(
            "SELECT * FROM Examination WHERE reservation_id = %s",
            [
                reservation_id,
            ],
        )
        row = dictfetchall(cursor)
        examination_id = row[0]["examination_id"]

        ##Update the reservation with the examination_id
        cursor.execute(
            "UPDATE Reservation SET ex_id = %s WHERE reservation_id = %s",
            [
                examination_id,
                reservation_id,
            ],
        )

        ##Now update the slots with the reservation_id
        for slot_id in request.data["slots"]:
            cursor.execute(
                "UPDATE Slot SET is_reserved = %s WHERE slot_id = %s",
                [
                    True,
                    slot_id,
                ],
            )

        ##Now return the reservation with the slots
        cursor.execute(
            "SELECT * FROM Reservation WHERE reservation_id = %s", [reservation_id]
        )
        row = dictfetchall(cursor)

        ##ALSO ADD THE SLOTS FOR THE RESERVATION
        cursor.execute("SELECT * FROM Slot WHERE reservation_id = %s", [reservation_id])
        row["slots"] = dictfetchall(cursor)

        return Response(row[0], status=status.HTTP_201_CREATED)
