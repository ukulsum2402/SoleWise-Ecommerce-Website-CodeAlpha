from rest_framework import serializers
from .models import DesignTemplate, ColorPalette, ShoeCustomization

class DesignTemplateSerializer(serializers.ModelSerializer):
    brand_name = serializers.CharField(source='brand.name', read_only=True)

    class Meta:
        model = DesignTemplate
        fields = [
            'id', 'brand', 'brand_name', 'model_name', 'slug',
            'silhouette_style', 'description', 'base_svg_template', 'is_active'
        ]

class ColorPaletteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ColorPalette
        fields = ['id', 'name', 'category', 'hex_colors']

class ShoeCustomizationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShoeCustomization
        fields = [
            'id', 'user', 'firebase_uid', 'template', 'title',
            'upper_color', 'sole_color', 'laces_color',
            'heel_color', 'side_panel_color', 'accent_color',
            'preview_svg_data', 'created_at'
        ]
        read_only_fields = ['user', 'created_at']
