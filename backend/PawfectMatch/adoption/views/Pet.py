import pdb

from PawfectMatch.utils import dictfetchall
from adoption.serializers import PetSerializer
from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView


## Function that gets all pets and can create a pet
# @param request GET and POST request with Pet Serializer
# @param JWT token
# @return JSON response with status code
class PetsView(APIView):
    def get(self, request):
        ## Initialize a buffered cursor
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Pet")

        pdb.set_trace()
        pets = dictfetchall(cursor)
        return Response(pets, status=status.HTTP_200_OK)

    # TODO Handle different pet creation cat and dog and other
    def post(self, request):
        cursor = connection.cursor()
        cursor.execute(
            "SELECT * FROM AdoptionOrganization WHERE ao_id = %s",
            [request.data["adoption_organization_id"]],
        )
        pet_type = request.data["type"]
        request.data.pop("type")

        is_valid_type = False

        ##If the type is other then get the other fields from the request
        if pet_type.lower() == "other":
            other_type = request.data["other_type"]
            request.data.pop("other_type")
            is_valid_type = True
        elif pet_type.lower() == "cat" or pet_type.lower() == "dog":
            is_valid_type = True

        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Organization not found"}, status=status.HTTP_400_BAD_REQUEST
            )

        # Check if the breed exists
        cursor.execute(
            "SELECT * FROM Breed WHERE breed_id = %s", [request.data["breed_id"]]
        )
        row = cursor.fetchone()
        if row is None:
            return Response(
                {"detail": "Breed does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        serializer = PetSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"detail": "Invalid data"}, status=status.HTTP_400_BAD_REQUEST
            )

        if not is_valid_type:
            return Response(
                {"detail": "Invalid pet type"}, status=status.HTTP_400_BAD_REQUEST
            )

        ## Add the pet to the database using raw SQL
        cursor.execute(
            "INSERT INTO Pet (pet_name, pet_size, pet_image, pet_color, is_adopted, ao_id, pet_breed_id) VALUES (%s, %s, %s, %s, %s, %s, %s)",
            [
                request.data["pet_name"],
                request.data["pet_size"],
                request.data["pet_image"],
                request.data["pet_color"],
                request.data["is_adopted"],
                request.data["adoption_organization_id"],
                request.data["breed_id"],
            ],
        )

        ## now return the pet
        cursor.execute(
            "SELECT * FROM Pet WHERE pet_name = %s", [request.data["pet_name"]]
        )
        pet = dictfetchall(cursor)

        # Get the pet_id and add the pet_type to the database of Cat, Dog, Other
        pet_id = pet[-1]["pet_id"]
        if pet_type.lower() == "cat":
            type_name = "Cat"
        elif pet_type.lower() == "dog":
            type_name = "Dog"
        else:
            type_name = "Other"

        if type_name != "Other":
            cursor.execute(
                "INSERT INTO "
                + type_name
                + " ("
                + type_name.lower()
                + "_id) VALUES (%s)",
                [pet_id],
            )
        else:
            cursor.execute(
                "INSERT INTO Other (other_id, other_type) VALUES (%s, %s)",
                [pet_id, other_type],
            )

        return Response(pet[-1], status=status.HTTP_201_CREATED)


## Function that gets, deletes or updates a single pet
# @param request GET, DELETE or PUT request with Pet Serializer
# @param JWT token
# @param pk Primary key of the pet
# @return JSON response with status code
class PetView(APIView):
    def get(self, request, pk):
        ## Get the pet from the database using raw SQL
        ##Make the cursor DictCursor so that we can get the pet as a dictionary
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Pet WHERE pet_id = %s", [pk])
        pdb.set_trace()
        if cursor.rowcount == 0:
            return Response(
                {"detail": "Pet does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )
        pet = dictfetchall(cursor)
        return Response(pet, status=status.HTTP_200_OK)

    ## Handle the delete request
    def delete(self, request, pk):
        can_delete = False
        user_id = request.data["user_id"]
        ## Create a cursor with buffered results so that we can get the pet as a dictionary
        cursor = connection.cursor()
        ## Delete the pet from the database using raw SQL
        cursor.execute("SELECT * FROM Pet WHERE pet_id = %s", [pk])

        row = cursor.fetchone()

        if row is not None:
            # Get column names from cursor description
            column_names = [desc[0] for desc in cursor.description]

            # Create a dictionary with attribute names and values
            row_dict = dict(zip(column_names, row))

            print("Cursor has rows.")
            # Access attribute names and values in row_dict
            for attribute, value in row_dict.items():
                print(f"{attribute}: {value}")

        pdb.set_trace()

        ## Now create another execute to get the pet as a dictionary
        cursor.execute("SELECT * FROM Pet WHERE pet_id = %s", [pk])
        pet2 = cursor.fetchone()

        pdb.set_trace()

        pet = dictfetchall(cursor)

        ##Check if the given user_id is the ao_id or the adopter_id of the pet
        if pet[0]["ao_id"] == user_id or pet[0]["adopter_id"] == user_id:
            can_delete = True

        if not can_delete:
            return Response(
                {"detail": "User is not authorized to delete the pet"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cursor.execute("DELETE FROM Pet WHERE pet_id = %s", [pk])
        return Response({"status": "success"}, status=status.HTTP_200_OK)

    def put(self, request, pk):
        user_id = request.data["user_id"]

        ## Update the pet in the database using raw SQL
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM Pet WHERE pet_id = %s", [pk])

        if cursor.rowcount == 0:
            return Response(
                {"detail": "Pet does not exist"}, status=status.HTTP_400_BAD_REQUEST
            )

        pet = dictfetchall(cursor)
        can_update = False

        ##Check if the given user_id is the ao_id or the adopter_id of the pet
        if pet[0]["ao_id"] == user_id or pet[0]["adopter_id"] == user_id:
            can_update = True

        if not can_update:
            return Response(
                {"detail": "User is not authorized to update the pet"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        cursor.execute(
            "UPDATE Pet SET pet_name = %s, pet_size = %s, pet_image = %s, pet_color = %s, is_adopted = %s, ao_id = %s, pet_breed_id = %s WHERE pet_id = %s",
            [
                request.data["pet_name"],
                request.data["pet_size"],
                request.data["pet_image"],
                request.data["pet_color"],
                request.data["is_adopted"],
                request.data["adoption_organization_id"],
                request.data["breed_id"],
                pk,
            ],
        )
        return Response({"status": "success"}, status=status.HTTP_200_OK)
