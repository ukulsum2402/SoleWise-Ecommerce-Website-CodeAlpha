from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DesignTemplateViewSet, ColorPaletteViewSet, ShoeCustomizationViewSet

router = DefaultRouter()
router.register(r'templates', DesignTemplateViewSet, basename='design-template')
router.register(r'palettes', ColorPaletteViewSet, basename='color-palette')
router.register(r'creations', ShoeCustomizationViewSet, basename='shoe-customization')

urlpatterns = [
    path('', include(router.urls)),
]
