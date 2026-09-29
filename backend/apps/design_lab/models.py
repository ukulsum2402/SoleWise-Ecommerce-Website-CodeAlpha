from django.db import models
from django.contrib.auth.models import User
from apps.products.models import Brand

class DesignTemplate(models.Model):
    """
    Shoe outline/sketch-style representation for 3D/SVG coloring.
    Features customizable regions: Upper, Sole, Laces, Heel, Side Panels, Accent sections.
    """
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='design_templates')
    model_name = models.CharField(max_length=120)
    slug = models.SlugField(max_length=120, unique=True)
    silhouette_style = models.CharField(max_length=60, help_text="e.g. Low-top runner, Court sneaker, Retro high-top")
    description = models.TextField()
    base_svg_template = models.TextField(help_text="SVG document markup with region IDs: #upper, #sole, #laces, #heel, #sidePanel, #accent")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.brand.name} {self.model_name}"

class ColorPalette(models.Model):
    """Pre-curated thematic sneaker color palettes."""
    name = models.CharField(max_length=80)
    category = models.CharField(max_length=60, help_text="e.g. Streetwear, Earth Tones, Monochrome, Neon Cyber, Vintage Retro")
    hex_colors = models.JSONField(default=list, help_text="Array of hex color strings e.g. ['#FF5500', '#1C1917', '#FFFFFF']")

    def __str__(self):
        return f"{self.name} ({self.category})"

class ShoeCustomization(models.Model):
    """Saved user shoe customization state."""
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    firebase_uid = models.CharField(max_length=128, blank=True)
    template = models.ForeignKey(DesignTemplate, on_delete=models.CASCADE, related_name='customizations')
    title = models.CharField(max_length=120, default='My Custom Sole')
    
    # Selected regions mapped to Hex codes
    upper_color = models.CharField(max_length=20, default='#E2E8F0')
    sole_color = models.CharField(max_length=20, default='#FFFFFF')
    laces_color = models.CharField(max_length=20, default='#1E293B')
    heel_color = models.CharField(max_length=20, default='#3B82F6')
    side_panel_color = models.CharField(max_length=20, default='#CBD5E1')
    accent_color = models.CharField(max_length=20, default='#F97316')
    
    preview_svg_data = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} by {self.firebase_uid or self.user or 'Guest'}"
