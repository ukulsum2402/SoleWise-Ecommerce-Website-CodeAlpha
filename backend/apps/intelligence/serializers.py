from rest_framework import serializers
from .models import ProductIntelligence, UsageScenario, WearIndicator, ProductSource

class UsageScenarioSerializer(serializers.ModelSerializer):
    scenario_display = serializers.CharField(source='get_scenario_type_display', read_only=True)

    class Meta:
        model = UsageScenario
        fields = [
            'id', 'scenario_type', 'scenario_display', 'frequency_description',
            'outsole_impact', 'upper_impact', 'cushioning_impact',
            'cleanliness_impact', 'structural_condition_impact',
            'recommended_rotation_strategy'
        ]

class WearIndicatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = WearIndicator
        fields = [
            'id', 'component', 'indicator_title', 'description',
            'severity', 'action_recommended'
        ]

class ProductSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductSource
        fields = [
            'id', 'title', 'organization', 'source_url',
            'source_type', 'notes', 'accessed_date'
        ]

class ProductIntelligenceSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_slug = serializers.CharField(source='product.slug', read_only=True)
    brand_name = serializers.CharField(source='product.brand.name', read_only=True)
    usage_scenarios = UsageScenarioSerializer(many=True, read_only=True)
    wear_indicators = WearIndicatorSerializer(many=True, read_only=True)
    sources = ProductSourceSerializer(many=True, read_only=True)

    class Meta:
        model = ProductIntelligence
        fields = [
            'id', 'product', 'product_name', 'product_slug', 'brand_name',
            'intended_use_detail', 'design_characteristics', 'suitable_activities',
            'upper_materials', 'midsole_technology', 'outsole_composition', 'lining_and_insole',
            'cleaning_overview', 'cleaning_steps', 'drying_guidance', 'storage_guidance',
            'things_to_avoid', 'replacement_considerations', 'expected_mileage_range',
            'usage_scenarios', 'wear_indicators', 'sources', 'updated_at'
        ]
