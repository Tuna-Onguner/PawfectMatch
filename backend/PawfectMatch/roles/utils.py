from django.db import connection
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import pdb
import jwt
from django.conf import settings


def get_role(user_id):
    """
    Returns the role of the user with the given user_id.
    """
    with connection.cursor() as cursor:
        roles = [
            "Admin",
            "Expert",
            "Blogger",
            "Adopter",
            "Veterinarian",
            "AdoptionOrganization",
            "User",
        ]
        ids = [
            "admin_id",
            "expert_id",
            "blogger_id",
            "adopter_id",
            "vet_id",
            "ao_id",
            "user_id",
        ]
        for role, id in zip(roles, ids):
            execute = "SELECT * FROM {} WHERE {} = %s".format(role, id)
            cursor.execute(execute, [user_id])
            row = cursor.fetchone()
            if row is not None:
                return role.lower()

        return None


##Return the role of the user with the given user_id
def check_jwt_role(request, token):
    auth_header = request.headers["Authorization"]
    if auth_header is None:
        return Response(
            data={"message": "No authorization header provided"},
            status=status.HTTP_400_BAD_REQUEST,
        )

    token = auth_header.split(" ")[1]

    ##Parse the token
    token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])

    user_id = token["user_id"]
    role = token["role"]

    # Return the role of the user with the given user_id
    return user_id, role
