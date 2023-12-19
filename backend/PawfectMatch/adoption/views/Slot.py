from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from ..serializers import ScheduleSerializer, SlotSerializer
from PawfectMatch.utils import dictfetchall
from ..models import Schedule, Slot


class SlotsView(APIView):
    def get(self):
        ## Get all the slots from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Slot")
        slots = dictfetchall(cursor)
        return Response(slots, status=status.HTTP_200_OK)

    def post(self, request):
        ##Get the vet_id from the request
        vet_id = request.data["veterinarian_id"]
        request.data.pop("veterinarian_id")

        ##Check if the schedule exists
        schedule = Schedule.objects.get(schedule_id=request.data["schedule_id"])
        if schedule is None:
            return Response(
                {"detail": "Schedule does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        ##Check if the slot with given start time and date already exists of the schedule using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM Slot WHERE date = %s AND start_hour = %s AND schedule_id = %s",
            [
                request.data["date"],
                request.data["start_hour"],
                request.data["schedule_id"],
            ],
        )

        row = cursor.fetchone()
        if row is not None:
            return Response(
                {"detail": "Slot already exists with given start date"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ##Check if the schedule_id belongs to the vet
        cursor.execute(
            "SELECT * FROM Schedule WHERE schedule_id = %s AND vet_id = %s",
            [
                request.data["schedule_id"],
                vet_id,
            ],
        )
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Schedule does not belong to the vet"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ## Add the slot to the database using raw SQL
        cursor.execute(
            "INSERT INTO Slot (is_reserved, date, start_hour, end_hour, schedule_id) VALUES (%s, %s, %s, %s, %s)",
            [
                request.data["is_reserved"],
                request.data["date"],
                request.data["start_hour"],
                request.data["end_hour"],
                request.data["schedule_id"],
            ],
        )

        serializer = SlotSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data  " + serializer.error_messages},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ## now return the slot
        cursor.execute(
            "SELECT * FROM Slot WHERE date = %s AND start_hour = %s AND schedule_id = %s",
            [
                request.data["date"],
                request.data["start_hour"],
                request.data["schedule_id"],
                vet_id,
            ],
        )

        slot = dictfetchall(cursor)
        return Response(slot[0], status=status.HTTP_200_OK)


class SlotView(APIView):
    def get(self, request, pk):
        ## Get the slot from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Slot WHERE slot_id = %s", [pk])
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Slot does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        slot = dictfetchall(cursor)
        return Response(slot, status=status.HTTP_200_OK)

    def put(self, request, pk):
        ## Get the slot from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Slot WHERE slot_id = %s", [pk])
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Slot does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        slot = dictfetchall(cursor)
        ## Update the slot using raw SQL
        cursor.execute(
            "UPDATE Slot SET is_reserved = %s, date = %s, start_hour = %s, end_hour = %s WHERE slot_id = %s",
            [
                request.data["is_reserved"],
                request.data["date"],
                request.data["start_hour"],
                request.data["end_hour"],
                pk,
            ],
        )
        serializer = SlotSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        ## now return the slot
        cursor.execute("SELECT * FROM Slot WHERE slot_id = %s", [pk])
        slot = dictfetchall(cursor)
        return Response(slot, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        ## Get the slot from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Slot WHERE slot_id = %s", [pk])
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Slot does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        ## Delete the slot using raw SQL
        cursor.execute("DELETE FROM Slot WHERE slot_id = %s", [pk])
        return Response(status=status.HTTP_204_NO_CONTENT)
