from rest_framework import serializers
from .models import MaterialGuide

class MaterialGuideSerializer(serializers.ModelSerializer):
    class Meta:
        model = MaterialGuide
        fields = [
            'id', 'material_key', 'title', 'summary',
            'recommended_tools', 'cleaning_routine',
            'wet_response_steps', 'storage_practices', 'critical_donts'
        ]
