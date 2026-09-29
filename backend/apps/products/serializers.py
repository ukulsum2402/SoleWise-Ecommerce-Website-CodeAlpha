from rest_framework import serializers
from .models import Brand, Category, Product, ProductVariant

class BrandSerializer(serializers.ModelSerializer):
    product_count = serializers.IntegerField(source='products.count', read_only=True)

    class Meta:
        model = Brand
        fields = [
            'id', 'name', 'slug', 'origin_country', 'founded_year',
            'description', 'website_url', 'logo_svg', 'product_count'
        ]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'description']

class ProductVariantSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductVariant
        fields = ['id', 'size', 'color', 'stock_count', 'sku_code']

class ProductListSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'sku', 'name', 'slug', 'brand', 'brand_name',
            'category', 'category_name', 'gender', 'price', 'price_inr',
            'original_price_inr', 'discount_percent', 'currency', 'price_type',
            'price_source', 'price_source_url', 'price_checked_date',
            'rating', 'review_count', 'short_description', 'intended_use_summary',
            'available_sizes', 'available_colors', 'images', 'is_featured'
        ]

class ProductDetailSerializer(serializers.ModelSerializer):
    brand = BrandSerializer(read_only=True)
    category = CategorySerializer(read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)
    intelligence_id = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'sku', 'name', 'slug', 'brand', 'category',
            'gender', 'price', 'price_inr', 'original_price_inr',
            'discount_percent', 'currency', 'price_type', 'price_source',
            'price_source_url', 'price_checked_date', 'rating', 'review_count',
            'short_description', 'description', 'intended_use_summary',
            'available_sizes', 'available_colors', 'images',
            'is_featured', 'variants', 'intelligence_id', 'created_at'
        ]

    def get_intelligence_id(self, obj):
        if hasattr(obj, 'intelligence'):
            return obj.intelligence.id
        return None
