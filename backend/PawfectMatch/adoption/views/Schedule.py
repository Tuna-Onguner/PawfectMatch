from PawfectMatch.utils import dictfetchall
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import ScheduleSerializer


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
        schedule = dictfetchall(cursor)[0]

        ##ALSO ADD THE SLOTS FOR THE SCHEDULE
        cursor.execute("SELECT * FROM Slot WHERE schedule_id = %s", [pk])
        schedule["slots"] = dictfetchall(cursor)

        return Response(schedule, status=status.HTTP_200_OK)

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

        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

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
        schedule = dictfetchall(cursor)[0]

        ##ALSO ADD THE SLOTS FOR THE SCHEDULE
        cursor.execute(
            "SELECT * FROM Slot WHERE schedule_id = %s", [request.data["schedule_id"]]
        )

        schedule["slots"] = dictfetchall(cursor)

        return Response(schedule, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        cursor = connection.cursor()

        ##Check if the schedule exists
        cursor.execute("SELECT * FROM Schedule WHERE schedule_id = %s", [pk])

        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Schedule does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        ##Check if user is owner of the schedule
        cursor.execute(
            "SELECT * FROM Schedule WHERE schedule_id = %s AND vet_id = %s",
            [pk, request.data["vet_id"]],
        )

        ## Delete the schedule from the database using raw SQL
        cursor.execute("DELETE FROM Schedule WHERE schedule_id = %s", [pk])

        return Response(status=status.HTTP_204_NO_CONTENT)
