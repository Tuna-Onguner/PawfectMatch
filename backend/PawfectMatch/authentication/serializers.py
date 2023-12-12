from rest_framework import serializers
from .models.User import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'user_name', 'phone_number', 'email', 'password']