from rest_framework import viewsets
from .models import MaterialGuide
from .serializers import MaterialGuideSerializer

class MaterialGuideViewSet(viewsets.ReadOnlyModelViewSet):
    """Provides material-specific cleaning, drying, and storage care protocols."""
    queryset = MaterialGuide.objects.all()
    serializer_class = MaterialGuideSerializer
    lookup_field = 'material_key'
