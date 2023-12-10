from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import Pet


class PetSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pet
        fields = '__all__'


class PetSerializerMini(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = ['id', 'name', 'type']


class UserSerializer(serializers.ModelSerializer):

    def create(self, user_data):
        user = User.objects.create_user(
            username=user_data['username'],
            first_name=user_data['first_name'],
            last_name=user_data['last_name'],
            email=user_data['email'],
            password=user_data['password'],
        )
        token = Token.objects.create(
            user=user
        )

        user = {
            'username': user.username,
            'first_name': user.first_name,
            'last_name':  user.last_name,
            'email': user.email,
            'password': user.password,
            'token': token
        }

        return user

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'password']
