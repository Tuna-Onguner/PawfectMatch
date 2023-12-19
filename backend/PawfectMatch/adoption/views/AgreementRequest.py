from PawfectMatch.utils import dictfetchall
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


class AgreementReq(APIView):
    def get(self, request, pk):
        ## Get the agreement request with given ao_id, vet_id and agreq_date using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM AgreementReq WHERE ao_id = %s AND vet_id = %s AND agreq_date = %s",
            [pk["ao_id"], pk["vet_id"], pk["agreq_date"]],
        )
        row = dictfetchall(cursor)
        if row is None:
            return Response(
                {"detail": "Agreement request does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(row[0], status=status.HTTP_200_OK)

    def put(self, request, pk):
        ## Get the agreement request with given ao_id, vet_id and agreq_date using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM AgreementReq WHERE ao_id = %s AND vet_id = %s AND agreq_date = %s",
            [pk["ao_id"], pk["vet_id"], pk["agreq_date"]],
        )
        req = dictfetchall(cursor)
        if req is None:
            return Response(
                {"detail": "Agreement request does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        req = req[0]
        user_id = request.data["user_id"]
        ##Check if user is the ao or vet of the agreement request
        if req["ao_id"] != user_id and req["vet_id"] != user_id:
            return Response(
                {"detail": "User is not ao or vet of the agreement request"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        serializer = AgreementReqSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )
        ## Update the agreement request with given ao_id, vet_id and agreq_date using raw SQL
        cursor.execute(
            "UPDATE AgreementReq SET agreq_status = %s, agreq_response_date = %s, agmotivation_text = %s, agreq_term_date = %s WHERE ao_id = %s AND vet_id = %s AND agreq_date = %s",
            [
                request.data["agreq_status"],
                request.data["agreq_response_date"],
                request.data["agmotivation_text"],
                request.data["agreq_term_date"],
                pk["ao_id"],
                pk["vet_id"],
                pk["agreq_date"],
            ],
        )

        ##Return the updated agreement request
        cursor.execute(
            "SELECT * FROM AgreementReq WHERE ao_id = %s AND vet_id = %s AND agreq_date = %s",
            [pk["ao_id"], pk["vet_id"], pk["agreq_date"]],
        )
        row = dictfetchall(cursor)
        return Response(row[0], status=status.HTTP_200_OK)

    def delete(self, request, pk):
        ## Get the agreement request with given ao_id, vet_id and agreq_date using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM AgreementReq WHERE ao_id = %s AND vet_id = %s AND agreq_date = %s",
            [pk["ao_id"], pk["vet_id"], pk["agreq_date"]],
        )
        row = dictfetchall(cursor)
        if row is None:
            return Response(
                {"detail": "Agreement request does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        ## Delete the agreement request with given ao_id, vet_id and agreq_date using raw SQL
        cursor.execute(
            "DELETE FROM AgreementReq WHERE ao_id = %s AND vet_id = %s AND agreq_date = %s",
            [pk["ao_id"], pk["vet_id"], pk["agreq_date"]],
        )

        return Response(status=status.HTTP_200_OK)


class AgreementRequests(APIView):
    def get(self, request):
        ## Get all the agreement requests of the user with given user_id using raw SQL
        user_id = request.data["user_id"]

        ##If the user is a vet, return all the agreement requests of the vet
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM AgreementReq WHERE vet_id = %s", [user_id])
        req = dictfetchall(cursor)
        if req is None:
            return Response(
                {"detail": "Agreement request does not exist"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return Response(req, status=status.HTTP_200_OK)

    def post(self, request):
        ## Create a new agreement request using raw SQL
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO AgreementReq (ao_id, vet_id, agreq_date, agreq_status, agreq_response_date, agmotivation_text, agreq_term_date) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            [
                request.data["ao_id"],
                request.data["vet_id"],
                request.data["agreq_date"],
                request.data["agreq_status"],
                request.data["agreq_response_date"],
                request.data["agmotivation_text"],
                request.data["agreq_term_date"],
            ],
        )
        return Response(status=status.HTTP_201_CREATED)
