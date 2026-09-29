from django.db import models
from django.contrib.auth.models import User
from apps.design_lab.models import DesignTemplate

class WeeklyChallenge(models.Model):
    """
    Weekly Community Shoe Design Challenge.
    Concept: "New ideas make us grow. Choose a shoe. Reimagine its colors. Create your style."
    Disclaimer: "Selected community designs may inspire future colorways."
    """
    week_number = models.PositiveIntegerField(unique=True)
    title = models.CharField(max_length=160, help_text="e.g. Create your own everyday sneaker")
    theme = models.CharField(max_length=100, help_text="e.g. Modern Urban Minimalist")
    prompt = models.TextField(help_text="Design prompt guiding the community")
    guidelines = models.TextField(blank=True)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_active = models.BooleanField(default=True)
    featured_template = models.ForeignKey(DesignTemplate, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-week_number']

    def __str__(self):
        return f"Week {self.week_number}: {self.title}"

class ChallengeSubmission(models.Model):
    """Community user submission for an active weekly challenge."""
    challenge = models.ForeignKey(WeeklyChallenge, on_delete=models.CASCADE, related_name='submissions')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    firebase_uid = models.CharField(max_length=128, blank=True)
    creator_name = models.CharField(max_length=100, default='Anonymous SoleCreator')
    title = models.CharField(max_length=120)
    story = models.TextField(blank=True, help_text="Design rationale or inspiration")
    shoe_model = models.CharField(max_length=100)
    brand_name = models.CharField(max_length=100)
    
    # Colorway configuration map
    colors_json = models.JSONField(default=dict, help_text="Map of region IDs to hex colors")
    preview_svg_data = models.TextField(blank=True, help_text="Rendered SVG string")
    
    vote_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-vote_count', '-created_at']

    def __str__(self):
        return f"{self.title} by {self.creator_name} ({self.vote_count} votes)"

class SubmissionVote(models.Model):
    """Upvote registered by a user on a challenge submission."""
    submission = models.ForeignKey(ChallengeSubmission, on_delete=models.CASCADE, related_name='votes')
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    firebase_uid = models.CharField(max_length=128)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('submission', 'firebase_uid')

    def __str__(self):
        return f"Vote by {self.firebase_uid} on {self.submission.title}"
