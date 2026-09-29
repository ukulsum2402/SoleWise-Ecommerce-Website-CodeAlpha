from rest_framework import serializers
from .models import WeeklyChallenge, ChallengeSubmission, SubmissionVote

class WeeklyChallengeSerializer(serializers.ModelSerializer):
    submission_count = serializers.IntegerField(source='submissions.count', read_only=True)

    class Meta:
        model = WeeklyChallenge
        fields = [
            'id', 'week_number', 'title', 'theme', 'prompt',
            'guidelines', 'start_date', 'end_date', 'is_active',
            'featured_template', 'submission_count'
        ]

class ChallengeSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChallengeSubmission
        fields = [
            'id', 'challenge', 'user', 'firebase_uid', 'creator_name',
            'title', 'story', 'shoe_model', 'brand_name',
            'colors_json', 'preview_svg_data', 'vote_count',
            'is_featured', 'created_at'
        ]
        read_only_fields = ['vote_count', 'created_at']

class SubmissionVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmissionVote
        fields = ['id', 'submission', 'user', 'firebase_uid', 'created_at']
