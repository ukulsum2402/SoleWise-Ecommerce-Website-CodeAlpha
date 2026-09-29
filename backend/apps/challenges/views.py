from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import F
from .models import WeeklyChallenge, ChallengeSubmission, SubmissionVote
from .serializers import WeeklyChallengeSerializer, ChallengeSubmissionSerializer, SubmissionVoteSerializer

class WeeklyChallengeViewSet(viewsets.ReadOnlyModelViewSet):
    """List current and historical weekly shoe design challenges."""
    queryset = WeeklyChallenge.objects.all()
    serializer_class = WeeklyChallengeSerializer

    @action(detail=False, methods=['get'])
    def current(self, request):
        """Get the presently active weekly challenge."""
        active_challenge = WeeklyChallenge.objects.filter(is_active=True).first()
        if not active_challenge:
            active_challenge = WeeklyChallenge.objects.first()
        if not active_challenge:
            return Response({'detail': 'No active challenge found'}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(active_challenge)
        return Response(serializer.data)

class ChallengeSubmissionViewSet(viewsets.ModelViewSet):
    """Submit designs to weekly challenges and explore community creations."""
    queryset = ChallengeSubmission.objects.all().select_related('challenge')
    serializer_class = ChallengeSubmissionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        challenge_id = self.request.query_params.get('challenge')
        if challenge_id:
            queryset = queryset.filter(challenge_id=challenge_id)
        return queryset

    @action(detail=True, methods=['post'], permission_classes=[permissions.AllowAny])
    def vote(self, request, pk=None):
        """Cast an upvote for a community sneaker design."""
        submission = self.get_object()
        firebase_uid = request.data.get('firebase_uid') or (
            request.user.username if request.user.is_authenticated else 'guest_' + request.META.get('REMOTE_ADDR', 'anon')
        )
        
        # Check if already voted
        existing = SubmissionVote.objects.filter(submission=submission, firebase_uid=firebase_uid).first()
        if existing:
            return Response({'detail': 'Already voted for this design', 'vote_count': submission.vote_count}, status=status.HTTP_400_BAD_REQUEST)

        SubmissionVote.objects.create(submission=submission, firebase_uid=firebase_uid)
        ChallengeSubmission.objects.filter(pk=submission.pk).update(vote_count=F('vote_count') + 1)
        submission.refresh_from_db()
        return Response({'detail': 'Vote registered successfully', 'vote_count': submission.vote_count}, status=status.HTTP_200_OK)
