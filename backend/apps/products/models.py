from django.db import models

class Brand(models.Model):
    """Real footwear manufacturer profile."""
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True)
    origin_country = models.CharField(max_length=100)
    founded_year = models.PositiveIntegerField(null=True, blank=True)
    description = models.TextField()
    website_url = models.URLField(max_length=500)
    logo_svg = models.TextField(blank=True, help_text="Inline SVG logo icon")
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name

class Category(models.Model):
    """Footwear categorization (Running, Lifestyle, Skateboarding, Court, Training)."""
    name = models.CharField(max_length=80, unique=True)
    slug = models.SlugField(max_length=80, unique=True)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def __str__(self):
        return self.name

class Product(models.Model):
    """Footwear commercial item."""
    GENDER_CHOICES = [
        ('Unisex', 'Unisex'),
        ('Men', 'Men'),
        ('Women', 'Women'),
    ]

    sku = models.CharField(max_length=64, unique=True)
    name = models.CharField(max_length=160)
    slug = models.SlugField(max_length=160, unique=True)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, related_name='products')
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='products')
    gender = models.CharField(max_length=20, choices=GENDER_CHOICES, default='Unisex')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    price_inr = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    original_price_inr = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    discount_percent = models.PositiveIntegerField(default=0)
    currency = models.CharField(max_length=10, default='INR')
    price_type = models.CharField(max_length=50, default='Current Listed Price')
    price_source = models.CharField(max_length=255, blank=True)
    price_source_url = models.URLField(max_length=500, blank=True)
    price_checked_date = models.CharField(max_length=50, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=4.5)
    review_count = models.PositiveIntegerField(default=0)
    short_description = models.CharField(max_length=255)
    description = models.TextField()
    
    # Intended use summary
    intended_use_summary = models.CharField(max_length=255, help_text="e.g. Daily Road Running & Long Mileage")
    
    # JSON-like / list attributes
    available_sizes = models.JSONField(default=list, help_text="List of US shoe sizes")
    available_colors = models.JSONField(default=list, help_text="List of colorway names")
    images = models.JSONField(default=list, help_text="List of verified product image URLs")
    
    is_featured = models.BooleanField(default=False)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.brand.name} {self.name}"

class ProductVariant(models.Model):
    """Specific SKU SKU variant combining size and color."""
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='variants')
    size = models.CharField(max_length=20)
    color = models.CharField(max_length=60)
    stock_count = models.PositiveIntegerField(default=10)
    sku_code = models.CharField(max_length=64, unique=True)

    def __str__(self):
        return f"{self.product.name} - {self.color} - US {self.size}"
