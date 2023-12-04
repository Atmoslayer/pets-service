from django.contrib import admin
from django.contrib.auth.models import User

from .models import Pet


class PetInline(admin.TabularInline):
    model = Pet
    extra = 0


@admin.register(Pet)
class PetAdmin(admin.ModelAdmin):
    list_display = ['type', 'name', 'breed', 'age']


admin.site.unregister(User)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    inlines = [PetInline]



