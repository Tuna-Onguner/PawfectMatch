from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db import connection
from PawfectMatch.utils import dictfetchall
from adoption.serializers import BreedSerializer


class BreedsView(APIView):
    def get(self, request):
        ## Get all the breeds from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Breed")
        breeds = dictfetchall(cursor)
        return Response(breeds, status=status.HTTP_200_OK)

    def post(self, request):
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM Breed WHERE breed_name = %s", [request.data["breed_name"]]
        )
        row = cursor.fetchone()
        if row is not None:
            return Response(
                {"detail": "Breed already exists"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = BreedSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        ## Add the breed to the database using raw SQL
        cursor.execute(
            "INSERT INTO Breed (breed_name, intelligence, playfulness) VALUES (%s, %s, %s)",
            [
                request.data["breed_name"],
                request.data["intelligence"],
                request.data["playfulness"],
            ],
        )

        ## now return the breed
        cursor.execute(
            "SELECT * FROM Breed WHERE breed_name = %s", [request.data["breed_name"]]
        )
        breed = dictfetchall(cursor)
        return Response(breed, status=status.HTTP_201_CREATED)


class BreedView(APIView):
    def get(self, request, pk):
        ## Get the breed from the database using raw SQL
        ##Make the cursor DictCursor so that we can get the breed as a dictionary
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Breed WHERE breed_id = %s", [pk])
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Breed does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )
        breed = dictfetchall(cursor)
        return Response(breed, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        ## First check if the user is an admin
        user_id = request.data["user_id"]
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Admin WHERE admin_id = %s", [user_id])
        row = cursor.fetchone()

        ## If the user is not an admin then cannot delete the breed
        if row is None:
            return Response(
                {"detail": "User is not an admin"}, status=status.HTTP_400_BAD_REQUEST
            )

        ## Delete the breed from the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Breed WHERE breed_id = %s", [pk])
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Breed does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        breed = dictfetchall(cursor)

        cursor.execute("DELETE FROM Breed WHERE breed_id = %s", [breed[0]["breed_id"]])
        return Response({"status": "success"}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        ## Check if the user is an admin
        user_id = request.data["user_id"]
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Admin WHERE admin_id = %s", [user_id])
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "User is not an admin"}, status=status.HTTP_400_BAD_REQUEST
            )

        ## Update the breed in the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Breed WHERE breed_id = %s", [pk])
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Breed does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = BreedSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        cursor.execute(
            "UPDATE Breed SET breed_name = %s, intelligence = %s, playfulness = %s WHERE breed_id = %s",
            [
                request.data["breed_name"],
                request.data["intelligence"],
                request.data["playfulness"],
                pk,
            ],
        )
        return Response({"status": "success"}, status=status.HTTP_200_OK)
