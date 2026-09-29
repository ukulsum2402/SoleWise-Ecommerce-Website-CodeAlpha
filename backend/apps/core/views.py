from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .firebase_service import FirebaseService

class SystemHealthView(APIView):
    """Provides system health check, platform metadata, and integration diagnostics."""
    def get(self, request):
        return Response({
            'status': 'healthy',
            'platform': 'SoleWise Smart Footwear Commerce & Product Experience Platform',
            'version': '1.0.0',
            'firebase': {
                'configured': bool(FirebaseService.get_project_id()),
                'projectId': FirebaseService.get_project_id(),
                'databaseId': FirebaseService.get_database_id(),
            },
            'supportedBrandsCount': 10,
            'features': [
                'footwear_e_commerce',
                'product_intelligence',
                'lifecycle_wear_analysis',
                'shoe_care_center',
                'interactive_design_lab',
                'weekly_community_challenges'
            ]
        }, status=status.HTTP_200_OK)
