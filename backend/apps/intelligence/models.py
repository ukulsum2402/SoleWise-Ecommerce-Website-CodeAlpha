from django.db import models
from apps.products.models import Product

class ProductIntelligence(models.Model):
    """
    Core Product Intelligence profile linked 1:1 with each Product.
    Factual engineering breakdown, materials, care guidelines, drying, storage,
    and life-cycle assessments.
    """
    product = models.OneToOneField(Product, on_delete=models.CASCADE, related_name='intelligence')
    
    # Overview & Intended Use
    intended_use_detail = models.TextField(help_text="Detailed engineering purpose, surface rating, and athlete profile")
    design_characteristics = models.JSONField(default=list, help_text="List of notable design features")
    suitable_activities = models.JSONField(default=list, help_text="e.g. Marathon training, City commuting, Standing all day")
    
    # Materials breakdown
    upper_materials = models.TextField(help_text="e.g. Engineered Jacquard Mesh with Flywire reinforcements")
    midsole_technology = models.TextField(help_text="e.g. Full-length React foam + forefoot Zoom Air pod")
    outsole_composition = models.TextField(help_text="e.g. BRS 1000 carbon rubber with waffle lugs")
    lining_and_insole = models.TextField(help_text="e.g. Molded EVA sockliner with breathable textile collar")
    
    # Care & Maintenance
    cleaning_overview = models.TextField(help_text="General cleaning policy and recommended cleaner types")
    cleaning_steps = models.JSONField(default=list, help_text="Step-by-step instructions for routine soiling")
    drying_guidance = models.TextField(help_text="How to dry properly (never machine tumble, ambient airflow)")
    storage_guidance = models.TextField(help_text="Optimal temperature, moisture, silica gel and shoe tree advice")
    things_to_avoid = models.JSONField(default=list, help_text="Direct sun drying, washing machines, harsh solvents")
    
    # Lifecycle & Wear
    replacement_considerations = models.TextField(help_text="Guidance on when performance has degraded")
    expected_mileage_range = models.CharField(max_length=120, blank=True, help_text="Responsible guidance e.g. '300-500 miles based on runner mechanics'")
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Intelligence for {self.product.name}"

class UsageScenario(models.Model):
    """
    Scenario-based wear impact analysis.
    Explains how different lifestyle usages affect outsole, upper, cushioning, cleanliness, and structure.
    """
    SCENARIO_TYPES = [
        ('daily_casual', 'Daily Casual Use'),
        ('office', 'Office / Workday Use'),
        ('occasional', 'Occasional / Function Use'),
        ('walking_travel', 'Walking / Travel / Commuter Use'),
        ('athletic_training', 'High-Intensity Athletic Training'),
    ]

    intelligence = models.ForeignKey(ProductIntelligence, on_delete=models.CASCADE, related_name='usage_scenarios')
    scenario_type = models.CharField(max_length=40, choices=SCENARIO_TYPES)
    frequency_description = models.CharField(max_length=160, help_text="e.g. '5-7 days per week on concrete and asphalt'")
    
    outsole_impact = models.TextField()
    upper_impact = models.TextField()
    cushioning_impact = models.TextField()
    cleanliness_impact = models.TextField()
    structural_condition_impact = models.TextField()
    recommended_rotation_strategy = models.TextField(help_text="Proactive advice on shoe rotation to extend lifespan")

    class Meta:
        unique_together = ('intelligence', 'scenario_type')

    def __str__(self):
        return f"{self.get_scenario_type_display()} - {self.intelligence.product.name}"

class WearIndicator(models.Model):
    """Specific visual or tactile indicators of excessive wear."""
    SEVERITY_CHOICES = [
        ('noticeable', 'Noticeable Cosmetic Wear'),
        ('moderate', 'Moderate Functional Degradation'),
        ('critical', 'Critical Replacement Indicator'),
    ]

    intelligence = models.ForeignKey(ProductIntelligence, on_delete=models.CASCADE, related_name='wear_indicators')
    component = models.CharField(max_length=80, help_text="e.g. Outsole Forefoot, Midsole Lateral Wall, Heel Counter")
    indicator_title = models.CharField(max_length=160)
    description = models.TextField()
    severity = models.CharField(max_length=30, choices=SEVERITY_CHOICES, default='moderate')
    action_recommended = models.TextField()

    def __str__(self):
        return f"{self.component}: {self.indicator_title}"

class ProductSource(models.Model):
    """
    Verifiable publicly available sources and documentation references.
    Complies with anti-plagiarism and factual transparency standards.
    """
    intelligence = models.ForeignKey(ProductIntelligence, on_delete=models.CASCADE, related_name='sources')
    title = models.CharField(max_length=200, help_text="e.g. Official Technical Specifications Sheet")
    organization = models.CharField(max_length=120, help_text="e.g. Nike R&D / Running Warehouse Lab")
    source_url = models.URLField(max_length=500)
    source_type = models.CharField(max_length=60, help_text="e.g. Manufacturer Spec, Independent Lab Test, Material Safety Guide")
    notes = models.TextField(blank=True, help_text="Synthesis note explaining how the data was summarized")
    accessed_date = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} ({self.organization})"
