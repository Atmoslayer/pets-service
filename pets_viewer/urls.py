from django.contrib import admin
from django.urls import path, include

from pets.views import CustomAuthToken, CreateUserAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/registration/', CreateUserAPIView.as_view()),
    path('api-token-auth/', CustomAuthToken.as_view()),
    path('api/', include('pets.urls')),
]
