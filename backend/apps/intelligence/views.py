from rest_framework import viewsets, mixins
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from .models import ProductIntelligence
from .serializers import ProductIntelligenceSerializer

class ProductIntelligenceViewSet(mixins.RetrieveModelMixin,
                                 mixins.ListModelMixin,
                                 viewsets.GenericViewSet):
    """
    Retrieves SoleWise Product Intelligence records.
    Provides complete engineering insights, usage wear breakdowns, care routines,
    and verified source references.
    """
    queryset = ProductIntelligence.objects.select_related('product', 'product__brand').prefetch_related(
        'usage_scenarios', 'wear_indicators', 'sources'
    )
    serializer_class = ProductIntelligenceSerializer

    @action(detail=False, methods=['get'], url_path='by-product/(?P<product_slug>[-\w]+)')
    def by_product(self, request, product_slug=None):
        """Fetch intelligence specifically by the parent product's slug."""
        intelligence = get_object_or_404(self.get_queryset(), product__slug=product_slug)
        serializer = self.get_serializer(intelligence)
        return Response(serializer.data)
