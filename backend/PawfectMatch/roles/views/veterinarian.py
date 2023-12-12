from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


# Define a view for handling Veterinarian related requests
class VeterinarianView(APIView):
    # Define a method for handling GET requests
    @staticmethod
    def get(request):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to fetch all Veterinarians
            cursor.execute("SELECT * FROM Veterinarian")
            # Fetch all rows from the executed SQL query
            veterinarians = cursor.fetchall()
        # Return an HTTP 200 OK response with the fetched data
        return Response(status=status.HTTP_200_OK, data=veterinarians)

    # Define a method for handling POST requests
    @staticmethod
    def post(request):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to insert a new Veterinarian
            cursor.execute(
                "INSERT INTO Veterinarian"
                "(vet_name, vet_street, vet_country, vet_city, vet_state, vet_phone_number, vet_email)"
                "VALUES (%s, %s, %s, %s, %s, %s, %s)",
                [
                    request.data["name"],
                    request.data["street"],
                    request.data["country"],
                    request.data["city"],
                    request.data["state"],
                    request.data["phone_number"],
                    request.data["email"],
                ])
        # Return an HTTP 201 Created response
        return Response(status=status.HTTP_201_CREATED)

    # Define a method for handling DELETE requests
    @staticmethod
    def delete(request):  # Be careful with this one
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to delete all Veterinarians
            cursor.execute("DELETE FROM Veterinarian")
        # Return an HTTP 204 No Content response
        return Response(status=status.HTTP_204_NO_CONTENT)


# Define a view for handling specific Veterinarian related requests
class VeterinarianDetailView(APIView):
    # Define a method for handling GET requests
    @staticmethod
    def get(request, veterinarian_id):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to fetch a specific Veterinarian
            cursor.execute("SELECT * FROM Veterinarian WHERE vet_id = %s", [veterinarian_id, ])
            # Fetch one row from the executed SQL query
            veterinarian = cursor.fetchone()
        # Return an HTTP 200 OK response with the fetched data
        return Response(status=status.HTTP_200_OK, data=veterinarian)

    # Define a method for handling PUT requests
    @staticmethod
    def put(request, veterinarian_id):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to update a specific Veterinarian
            cursor.execute(
                "UPDATE Veterinarian "
                "SET vet_name = %s, vet_street = %s, vet_country = %s, vet_city = %s, "
                "vet_state = %s, vet_phone_number = %s, vet_email = %s WHERE vet_id = %s",
                [
                    request.data["vet_name"],
                    request.data["vet_street"],
                    request.data["vet_country"],
                    request.data["vet_city"],
                    request.data["vet_state"],
                    request.data["vet_phone_number"],
                    request.data["vet_email"],
                    veterinarian_id,
                ])
        # Return an HTTP 200 OK response
        return Response(status=status.HTTP_200_OK)

    # Define a method for handling DELETE requests
    @staticmethod
    def delete(request, veterinarian_id):
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to delete a specific Veterinarian
            cursor.execute("DELETE FROM Veterinarian WHERE vet_id = %s", [veterinarian_id, ])
        # Return an HTTP 204 No Content response
        return Response(status=status.HTTP_204_NO_CONTENT)
