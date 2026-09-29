from rest_framework import viewsets, filters
from rest_framework.response import Response
from .models import Brand, Category, Product
from .serializers import BrandSerializer, CategorySerializer, ProductListSerializer, ProductDetailSerializer

class BrandViewSet(viewsets.ReadOnlyModelViewSet):
    """List and retrieve supported footwear brands."""
    queryset = Brand.objects.filter(is_active=True)
    serializer_class = BrandSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter]
    search_fields = ['name', 'origin_country']

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    """List product categories."""
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'slug'

class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Search, filter, and retrieve products with commercial details
    and links to SoleWise Product Intelligence.
    """
    queryset = Product.objects.filter(is_available=True)
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'brand__name', 'short_description', 'intended_use_summary']
    ordering_fields = ['price', 'rating', 'created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ProductDetailSerializer
        return ProductListSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        brand_slug = self.request.query_params.get('brand')
        category_slug = self.request.query_params.get('category')
        gender = self.request.query_params.get('gender')
        min_price = self.request.query_params.get('min_price')
        max_price = self.request.query_params.get('max_price')

        if brand_slug:
            queryset = queryset.filter(brand__slug=brand_slug)
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        if gender:
            queryset = queryset.filter(gender__iexact=gender)
        if min_price:
            queryset = queryset.filter(price__gte=min_price)
        if max_price:
            queryset = queryset.filter(price__lte=max_price)

        return queryset
