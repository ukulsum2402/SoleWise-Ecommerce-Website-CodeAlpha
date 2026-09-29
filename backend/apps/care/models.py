from django.db import models

class MaterialGuide(models.Model):
    """
    Dedicated product care guide by material type:
    Mesh, Leather, Suede/Nubuck, Canvas, Knit Synthetics, Rubber.
    """
    MATERIAL_TYPES = [
        ('mesh', 'Engineered Mesh & Knit'),
        ('leather', 'Full-Grain & Synthetic Leather'),
        ('suede', 'Suede & Nubuck'),
        ('canvas', 'Cotton & Blend Canvas'),
        ('synthetic', 'Synthetic Overlays & TPU'),
        ('rubber', 'Carbon & Blown Rubber Outsole'),
    ]

    material_key = models.CharField(max_length=40, choices=MATERIAL_TYPES, unique=True)
    title = models.CharField(max_length=120)
    summary = models.TextField()
    recommended_tools = models.JSONField(default=list, help_text="e.g. Horsehair brush, Microfiber cloth, Gentle foam cleanser")
    cleaning_routine = models.JSONField(default=list, help_text="Step-by-step cleaning sequence")
    wet_response_steps = models.JSONField(default=list, help_text="What to do when shoe gets soaked")
    storage_practices = models.TextField()
    critical_donts = models.JSONField(default=list, help_text="Specific actions that cause irreversible damage")

    def __str__(self):
        return self.title
