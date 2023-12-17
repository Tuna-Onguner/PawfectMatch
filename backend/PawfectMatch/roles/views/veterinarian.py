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
    def get(request) -> Response:  # NOQA
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to fetch all Veterinarians
            cursor.execute("SELECT * FROM Veterinarian "
                           "JOIN User ON User.user_id = Veterinarian.vet_id")
            # Fetch all rows from the executed SQL query
            veterinarians = dictfetchall(cursor)
            # If no rows were fetched from the executed SQL query, return an HTTP 404 Not Found response
            if len(veterinarians) == 0:
                return Response(status=status.HTTP_404_NOT_FOUND)
        # Return an HTTP 200 OK response with the fetched data
        return Response(status=status.HTTP_200_OK, data=veterinarians)

    # Define a method for handling POST requests
    @staticmethod
    def post(request) -> Response:
        if "user_name" not in request.data or "phone_number" not in request.data or "email" not in request.data or \
                "password" not in request.data or "vet_name" not in request.data or "vet_street" not in request.data or \
                "vet_city" not in request.data or "vet_state" not in request.data or "vet_country" not in request.data:
            # Return an HTTP 400 Bad Request response if no fields were provided
            return Response(status=status.HTTP_400_BAD_REQUEST)
            # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to insert the user data into the User table
            try:
                cursor.execute(
                    "INSERT INTO User (user_name, phone_number, email, password)"
                    "VALUES (%s, %s, %s, %s)",
                    [
                        request.data["user_name"],
                        request.data["phone_number"],
                        request.data["email"],
                        request.data["password"],
                    ]
                )

                # Execute a query to fetch the id of the inserted user
                cursor.execute("SELECT user_id FROM User WHERE email = %s", [request.data["email"]])
                # Fetch one row from the executed SQL query
                user_id = dictfetchone(cursor)["user_id"]

                # Execute a query to insert the veterinarian data into the Veterinarian table
                cursor.execute(
                    "INSERT INTO Veterinarian (vet_id, vet_name, vet_street, vet_city, vet_state, vet_country)"
                    "VALUES (%s, %s, %s, %s, %s, %s)",
                    [
                        user_id,
                        request.data["vet_name"],
                        request.data["vet_street"],
                        request.data["vet_city"],
                        request.data["vet_state"],
                        request.data["vet_country"],
                    ]
                )
            except Exception:  # NOQA
                return Response(status=status.HTTP_400_BAD_REQUEST)

        # Return an HTTP 201 Created response
        return Response(status=status.HTTP_201_CREATED)


class VeterinarianDetailView(APIView):
    # Define a method for handling GET requests
    @staticmethod
    def get(request, _id) -> Response:  # NOQA
        # Open a database connection
        with connection.cursor() as cursor:
            # Execute a SQL query to fetch a specific Veterinarian
            cursor.execute(
                "SELECT * FROM Veterinarian "
                "JOIN User ON User.user_id = Veterinarian.vet_id WHERE vet_id = %s",
                [
                    _id,
                ]
            )
            try:
                # Fetch one row from the executed SQL query
                veterinarian = dictfetchone(cursor)
            except Exception:  # NOQA
                return Response(status=status.HTTP_404_NOT_FOUND)
        # Return an HTTP 200 OK response with the fetched data
        return Response(status=status.HTTP_200_OK, data=veterinarian)

    # Define a method for handling PUT requests
    @staticmethod
    def put(request, _id) -> Response:
        fields_vet = ["vet_name", "vet_street", "vet_city", "vet_state", "vet_country"]
        fields_usr = ["user_name", "phone_number", "email", "password"]

        update_vet = [f"{field} = %s" for field in fields_vet if field in request.data]
        update_usr = [f"{field} = %s" for field in fields_usr if field in request.data]

        values_vet = [request.data[field] for field in fields_vet if field in request.data]
        values_usr = [request.data[field] for field in fields_usr if field in request.data]

        if len(update_vet) == 0 and len(update_usr) == 0:
            # Return an HTTP 400 Bad Request response if no fields were provided
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Open a database connection
        try:
            with connection.cursor() as cursor:
                # Execute a SQL query to update a specific Veterinarian
                if len(update_vet) != 0:
                    cursor.execute(
                        f"UPDATE Veterinarian "
                        f"SET {', '.join(update_vet)} WHERE vet_id = %s",
                        [
                            *values_vet,
                            _id,
                        ]
                    )
                # Execute a SQL query to update a specific User
                if len(update_usr) != 0:
                    cursor.execute(
                        "UPDATE User "
                        f"SET {', '.join(update_usr)} WHERE user_id = %s",
                        [
                            *values_usr,
                            _id,
                        ]
                    )
        except Exception:  # NOQA
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Return an HTTP 200 OK response
        return Response(status=status.HTTP_200_OK)

    # Define a method for handling DELETE requests
    @staticmethod
    def delete(request, _id) -> Response:  # NOQA
        try:
            # Open a database connection
            with connection.cursor() as cursor:
                # Execute a SQL query to delete a specific Veterinarian
                cursor.execute("DELETE FROM Veterinarian WHERE vet_id = %s", [_id])
        except Exception:  # NOQA
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # Return an HTTP 200 OK response
        return Response(status=status.HTTP_200_OK)
