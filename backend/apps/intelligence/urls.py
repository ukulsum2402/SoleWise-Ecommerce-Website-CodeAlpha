from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductIntelligenceViewSet

router = DefaultRouter()
router.register(r'reports', ProductIntelligenceViewSet, basename='intelligence')

urlpatterns = [
    path('', include(router.urls)),
]
