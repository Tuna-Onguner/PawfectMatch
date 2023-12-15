from PawfectMatch.utils import dictfetchall, dictfetchone
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

"""
Request Handlers for Veterinarian related requests
get /veterinarian/ - Returns all Veterinarians
post /veterinarian/ - Creates a new Veterinarian
get /veterinarian/<veterinarian_id>/ - Returns a specific Veterinarian by id
put /veterinarian/<veterinarian_id>/ - Updates a specific Veterinarian by id
delete /veterinarian/<veterinarian_id>/ - Deletes a specific Veterinarian by id
"""


class VeterinarianView(APIView):
    # Define a method for handling GET requests
    @staticmethod
    def get(request):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to fetch all Veterinarians
            cursor.execute("SELECT * FROM Veterinarian "
                           "JOIN User ON User.user_id = Veterinarian.vet_id")
            # Fetch all rows from the executed SQL query
            veterinarians = dictfetchall(cursor)
        # Return an HTTP 200 OK response with the fetched data
        return Response(status=status.HTTP_200_OK, data=veterinarians)

    # Define a method for handling POST requests
    @staticmethod
    def post(request):
        # Extract the user and veterinarian data from the request
        user_data = {
            "user_name": request.data["user_name"],
            "phone_number": request.data["phone_number"],
            "email": request.data["email"],
            "password": request.data["password"]
        }
        vet_data = {
            "vet_name": request.data["vet_name"],
            "vet_street": request.data["vet_street"],
            "vet_city": request.data["vet_city"],
            "vet_state": request.data["vet_state"],
            "vet_country": request.data["vet_country"]
        }

        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to insert the user data into the User table
            cursor.execute(
                "INSERT INTO User (user_name, phone_number, email, password) "
                "VALUES (%s, %s, %s, %s) ",
                [user_data["user_name"],
                 user_data["phone_number"],
                 user_data["email"],
                 user_data["password"]]
            )
            # Fetch one row from the executed SQL query
            user_id = cursor.fetchone()[0]
            # Execute a query to insert the veterinarian data into the Veterinarian table
            cursor.execute(
                "INSERT INTO Veterinarian (vet_id, vet_name, vet_street, vet_city, vet_state, vet_country) "
                "VALUES (%s, %s, %s, %s, %s)",
                [user_id,
                 vet_data["vet_name"],
                 vet_data["vet_street"],
                 vet_data["vet_city"],
                 vet_data["vet_state"],
                 vet_data["vet_country"]]
            )
        # Return an HTTP 201 Created response
        return Response(status=status.HTTP_201_CREATED)


class VeterinarianDetailView(APIView):
    # Define a method for handling GET requests
    @staticmethod
    def get(request, vet_id):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to fetch a specific Veterinarian
            cursor.execute("SELECT * FROM Veterinarian "
                           "JOIN User ON User.user_id = Veterinarian.vet_id "
                           "WHERE vet_id = %s ",
                           [vet_id])
            # Fetch one row from the executed SQL query
            veterinarian = dictfetchone(cursor)
            # If no Veterinarian exists with the provided id
            if cursor.rowcount == 0:
                # Return an HTTP 404 Not Found response
                return Response(status=status.HTTP_404_NOT_FOUND)
        # Return an HTTP 200 OK response with the fetched data
        return Response(status=status.HTTP_200_OK, data=veterinarian)

    # Define a method for handling PUT requests
    @staticmethod
    def put(request, vet_id):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to update a specific Veterinarian
            cursor.execute("UPDATE Veterinarian "
                           "SET vet_name = %s, vet_street = %s, vet_city = %s, vet_state = %s, vet_country = %s "
                           "WHERE vet_id = %s",
                           [request.data["vet_name"],
                            request.data["vet_street"],
                            request.data["vet_city"],
                            request.data["vet_state"],
                            request.data["vet_country"],
                            vet_id])
        # Return an HTTP 200 OK response
        return Response(status=status.HTTP_200_OK)

    # Define a method for handling DELETE requests
    @staticmethod
    def delete(request, vet_id):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to delete a specific Veterinarian
            cursor.execute("DELETE FROM Veterinarian "
                           "WHERE vet_id = %s",
                           [vet_id])
        # Return an HTTP 204 No Content response
        return Response(status=status.HTTP_200_OK)
