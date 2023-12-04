from django.conf.urls import url, include
from rest_framework import routers
from pets.views import PetViewSet

router = routers.DefaultRouter()
router.register('api/pets', PetViewSet, 'show_pets')

urlpatterns = router.urls

