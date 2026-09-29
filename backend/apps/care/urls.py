from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaterialGuideViewSet

router = DefaultRouter()
router.register(r'materials', MaterialGuideViewSet, basename='material-guide')

urlpatterns = [
    path('', include(router.urls)),
]
