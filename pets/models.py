from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractUser, User
from django.db import models


class Pet(models.Model):

    id = models.AutoField(
        'Идентификатор',
        primary_key=True)

    type = models.CharField(
        'Вид',
        max_length=30,
    )

    name = models.CharField(
        'Кличка',
        max_length=30,
    )

    owner = models.ForeignKey(
        User,
        verbose_name='Владелец',
        on_delete=models.CASCADE,
        related_name='pets',
    )

    breed = models.CharField(
        'Порода',
        max_length=30,
    )

    age = models.IntegerField(
        'Возраст',
    )

    class Meta:
        verbose_name = 'Домашнее животное'
        verbose_name_plural = 'Домашние животные'

    def __str__(self):
        return f'{self.type} по кличке {self.name}'


