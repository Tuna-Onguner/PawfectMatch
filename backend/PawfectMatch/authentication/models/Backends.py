from typing import Any
from django.contrib.auth.backends import BaseBackend
from django.contrib.auth.base_user import AbstractBaseUser
from django.http.request import HttpRequest
from django.db import connection
from .User import User
from roles.utils import get_role
import pdb


class MyBackend(BaseBackend):
    ##Define an auth method to check if the given email and password user exists in the db
    @staticmethod
    def authenticate(request: HttpRequest, email: str, password: str) -> Any:
        cursor = connection.cursor()

        # SQL CODE TO CHECK IF USER EXISTS
        cursor.execute(
            "SELECT * FROM User WHERE email = %s AND password = %s", [email, password]
        )
        row = cursor.fetchone()
        if row is None:
            return None
        else:
            # Return the user model if the user exists
            return User.objects.get(email=email)

    ##Define a login method to login the user
    @staticmethod
    def login(request: HttpRequest, user: AbstractBaseUser) -> None:
        request.session["user_id"] = user.user_id
        request.session["role"] = get_role(user.user_id)
        request.session.save()
        return user

    @staticmethod
    def logout(request: HttpRequest) -> None:
        request.session.flush()
