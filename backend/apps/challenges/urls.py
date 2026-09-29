from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import WeeklyChallengeViewSet, ChallengeSubmissionViewSet

router = DefaultRouter()
router.register(r'contests', WeeklyChallengeViewSet, basename='challenge')
router.register(r'submissions', ChallengeSubmissionViewSet, basename='challenge-submission')

urlpatterns = [
    path('', include(router.urls)),
]
