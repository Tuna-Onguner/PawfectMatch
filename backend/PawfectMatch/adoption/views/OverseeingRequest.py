from PawfectMatch.utils import dictfetchall
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from ..serializers import OverseeingReqSerializer


class OverseeingReqView(APIView):
    def get(self, request, pk):
        ## Get the overseeing request with given ao_id, adopter_id and oreq_date using raw SQL
        cursor = connection.cursor()

        cursor.execute(
            "SELECT * FROM OverseeingReq WHERE ao_id = %s AND adopter_id = %s AND oreq_date = %s",
            [pk["ao_id"], pk["adopter_id"], pk["oreq_date"]],
        )
        row = dictfetchall(cursor)
        if row is None:
            return Response(
                {"detail": "Overseeing request does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(row[0], status=status.HTTP_200_OK)

    def put(self, request, pk):
        ## Get the overseeing request with given ao_id, vet_id and oreq_date using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM OverseeingReq WHERE ao_id = %s AND vet_id = %s AND oreq_date = %s",
            [pk["ao_id"], pk["vet_id"], pk["oreq_date"]],
        )
        req = dictfetchall(cursor)
        if req is None:
            return Response(
                {"detail": "Overseeing request does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        req = req[0]
        user_id = request.data["user_id"]
        ##Check if user is the ao or vet of the overseeing request
        if req["ao_id"] != user_id and req["adopter_id"] != user_id:
            return Response(
                {"detail": "User is not ao or adopter of the overseeing request"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = OverseeingReqSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        ## Update the overseeing request with given ao_id, adopter_id and oreq_date using raw SQL
        cursor.execute(
            "UPDATE OverseeingReq SET oreq_status = %s, oreq_response_date = %s, omotivation_text = %s, oreq_result = %s WHERE ao_id = %s AND adopter_id = %s AND oreq_date = %s",
            [
                request.data["oreq_status"],
                request.data["oreq_response_date"],
                request.data["omotivation_text"],
                request.data["oreq_result"],
                pk["ao_id"],
                pk["adopter_id"],
                pk["oreq_date"],
            ],
        )
        return Response(status=status.HTTP_200_OK)

    def delete(self, request, pk):
        ## Get the overseeing request with given ao_id, adopter_id and oreq_date using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM OverseeingReq WHERE ao_id = %s AND adopter_id = %s AND oreq_date = %s",
            [pk["ao_id"], pk["adopter_id"], pk["oreq_date"]],
        )
        row = dictfetchall(cursor)
        if row is None:
            return Response(
                {"detail": "Overseeing request does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        ## Delete the overseeing request with given ao_id, adopter_id and oreq_date using raw SQL
        cursor.execute(
            "DELETE FROM OverseeingReq WHERE ao_id = %s AND adopter_id = %s AND oreq_date = %s",
            [pk["ao_id"], pk["adopter_id"], pk["oreq_date"]],
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


class OverseeingReqsView(APIView):
    def get(self, request):
        ## Get all the overseeing requests of the user with given user_id using raw SQL
        user_id = request.data["user_id"]

        ##If the user is a ao, return all the overseeing requests of the ao
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM OverseeingReq WHERE ao_id = %s", [user_id])
        rows = dictfetchall(cursor)
        return Response(rows, status=status.HTTP_200_OK)

    def post(self, request):
        ## Create a new overseeing request using raw SQL
        cursor = connection.cursor()
        serializer = OverseeingReqSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        cursor.execute(
            "INSERT INTO OverseeingReq (ao_id, adopter_id, oreq_status, omotivation_text) VALUES (%s, %s, %s, %s)",
            [
                request.data["ao_id"],
                request.data["adopter_id"],
                request.data["oreq_status"],
                request.data["omotivation_text"],
            ],
        )
        return Response(status=status.HTTP_201_CREATED)
