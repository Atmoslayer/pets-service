from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import viewsets, permissions

from .serializers import PetSerializer


class PetViewSet(viewsets.ModelViewSet):
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
    serializer_class = PetSerializer

    def get_queryset(self):
        user = self.request.user
        user_pets = user.pets.all()

        return user_pets

