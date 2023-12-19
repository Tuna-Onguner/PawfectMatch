from django.db import connection


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
