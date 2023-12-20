from django.contrib.auth.base_user import BaseUserManager


class UserManager(BaseUserManager):
    def create_user(self, user_name, phone_number, email, password):
        if not user_name:
            raise ValueError("User must have a name")
        if not phone_number:
            raise ValueError("User must have a phone number")
        if not email:
            raise ValueError("User must have an email address")
        if not password:
            raise ValueError("User must have a password")

        user = self.model(
            user_name=user_name,
            phone_number=phone_number,
            email=self.normalize_email(email),
        )

        user.set_password(password)
        user.save(using=self._db)
        return user
