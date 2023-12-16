from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from PawfectMatch.utils import dictfetchall
from ..serializers import ScheduleSerializer, SlotSerializer
import pdb
from rest_framework.views import APIView


class SchedulesView(APIView):
    def get(self, request):
        ## Get all the schedules from the database using raw SQL

        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Schedule")
        schedules = dictfetchall(cursor)
        return Response(schedules, status=status.HTTP_200_OK)

    def post(self, request):
        cursor = connection.cursor()

        ##Check if the user is vet
        cursor.execute(
            "SELECT * FROM Veterinarian WHERE vet_id = %s",
            [request.data["veterinarian_id"]],
        )

        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Vet does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        ##Check if the schedule with given start time and date already exists of the vet
        cursor.execute(
            "SELECT * FROM Schedule WHERE schedule_beginning_date = %s AND vet_id = %s",
            [
                request.data["schedule_beginning_date"],
                request.data["veterinarian_id"],
            ],
        )

        row = cursor.fetchone()
        if row is not None:
            return Response(
                {"detail": "Schedule already exists with given start date"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ScheduleSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        ## Add the schedule to the database using raw SQL
        cursor.execute(
            "INSERT INTO Schedule (is_restricted, schedule_beginning_date, schedule_end_date, vet_id) VALUES (%s, %s, %s, %s)",
            [
                request.data["is_restricted"],
                request.data["schedule_beginning_date"],
                request.data["schedule_end_date"],
                request.data["veterinarian_id"],
            ],
        )

        ## now return the schedule
        cursor.execute(
            "SELECT * FROM Schedule WHERE schedule_beginning_date = %s AND vet_id = %s",
            [request.data["schedule_beginning_date"], request.data["veterinarian_id"]],
        )
        schedule = dictfetchall(cursor)
        return Response(schedule[-1], status=status.HTTP_201_CREATED)


class ScheduleView(APIView):
    def get(self, request, pk):
        ## Get the schedule from the database using raw SQL
        ##Make the cursor DictCursor so that we can get the schedule as a dictionary
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Schedule WHERE schedule_id = %s", [pk])
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Schedule does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        schedule = dictfetchall(cursor)
        return Response(schedule, status=status.HTTP_200_OK)

    ## Add a slot to the schedule
    def post(self, request, pk):
        cursor = connection.cursor()

        ##Check if the schedule exists
        cursor.execute("SELECT * FROM Schedule WHERE schedule_id = %s", [pk])

        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Schedule does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        ##Check if the slot with given start time and date already exists of the schedule
        cursor.execute(
            "SELECT * FROM Slot WHERE date = %s AND start_hour = %s AND schedule_id = %s",
            [
                request.data["date"],
                request.data["start_hour"],
                pk,
            ],
        )

        row = cursor.fetchone()
        if row is not None:
            return Response(
                {"detail": "Slot already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        ##ADD THE SCHDULE ID TO THE REQUEST DATA
        request.data["schedule_id"] = pk

        serializer = SlotSerializer(data=request.data)
        if not serializer.is_valid():
            ##Print the errors
            print(serializer.errors)
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        ## Add the slot to the database using raw SQL
        cursor.execute(
            "INSERT INTO Slot (date, start_hour, schedule_id, end_hour) VALUES (%s, %s, %s, %s)",
            [
                request.data["date"],
                request.data["start_hour"],
                pk,
                request.data["end_hour"],
            ],
        )

        ## now return the slot
        cursor.execute(
            "SELECT * FROM Slot WHERE date = %s AND start_hour = %s AND schedule_id = %s",
            [request.data["date"], request.data["start_hour"], pk],
        )
        slot = dictfetchall(cursor)
        return Response(slot[-1], status=status.HTTP_201_CREATED)

    def put(self, request, pk):
        cursor = connection.cursor()

        ##Check if the schedule exists
        cursor.execute("SELECT * FROM Schedule WHERE schedule_id = %s", [pk])

        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Schedule does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = ScheduleSerializer(data=request.data)

        ## Update the schedule in the database using raw SQL
        cursor.execute(
            "UPDATE Schedule SET is_restricted = %s, schedule_beginning_date = %s, schedule_end_date = %s, vet_id = %s WHERE schedule_id = %s",
            [
                request.data["is_restricted"],
                request.data["schedule_beginning_date"],
                request.data["schedule_end_date"],
                request.data["vet_id"],
                pk,
            ],
        )

        ## now return the schedule
        cursor.execute("SELECT * FROM Schedule WHERE schedule_id = %s", [pk])
        schedule = dictfetchall(cursor)
        return Response(schedule, status=status.HTTP_200_OK)
