from rest_framework import viewsets, permissions
from .models import DesignTemplate, ColorPalette, ShoeCustomization
from .serializers import DesignTemplateSerializer, ColorPaletteSerializer, ShoeCustomizationSerializer

class DesignTemplateViewSet(viewsets.ReadOnlyModelViewSet):
    """List available shoe customization templates by brand."""
    queryset = DesignTemplate.objects.filter(is_active=True).select_related('brand')
    serializer_class = DesignTemplateSerializer
    lookup_field = 'slug'

class ColorPaletteViewSet(viewsets.ReadOnlyModelViewSet):
    """List curated sneaker colorway palettes."""
    queryset = ColorPalette.objects.all()
    serializer_class = ColorPaletteSerializer

class ShoeCustomizationViewSet(viewsets.ModelViewSet):
    """Manage saved sneaker colorway customizations."""
    queryset = ShoeCustomization.objects.all()
    serializer_class = ShoeCustomizationSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user if self.request.user.is_authenticated else None
        serializer.save(user=user)
