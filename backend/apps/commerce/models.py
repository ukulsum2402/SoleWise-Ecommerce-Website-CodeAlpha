from django.db import models
from django.contrib.auth.models import User
from apps.products.models import Product

class CartItem(models.Model):
    """User shopping cart line item."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='cart_items')
    firebase_uid = models.CharField(max_length=128, db_index=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    size = models.CharField(max_length=20)
    color = models.CharField(max_length=60)
    quantity = models.PositiveIntegerField(default=1)
    added_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-added_at']

    def __str__(self):
        return f"{self.product.name} (US {self.size}) x{self.quantity}"

class WishlistItem(models.Model):
    """User wishlist record."""
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True, related_name='wishlist_items')
    firebase_uid = models.CharField(max_length=128, db_index=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('firebase_uid', 'product')
        ordering = ['-added_at']

    def __str__(self):
        return f"{self.firebase_uid} wants {self.product.name}"

class Order(models.Model):
    """Customer purchase order."""
    STATUS_CHOICES = [
        ('confirmed', 'Order Confirmed'),
        ('processing', 'Processing & Inspection'),
        ('shipped', 'Shipped via Express Courier'),
        ('delivered', 'Delivered'),
    ]

    order_number = models.CharField(max_length=64, unique=True)
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='orders')
    firebase_uid = models.CharField(max_length=128, db_index=True)
    recipient_name = models.CharField(max_length=120)
    recipient_email = models.EmailField()
    shipping_address = models.TextField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default='INR')
    payment_method = models.CharField(max_length=60, default='UPI (Demo)')
    status = models.CharField(max_length=40, choices=STATUS_CHOICES, default='confirmed')
    tracking_number = models.CharField(max_length=100, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Order #{self.order_number} ({self.status})"

class OrderItem(models.Model):
    """Line item in customer order."""
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    product_name = models.CharField(max_length=160)
    brand_name = models.CharField(max_length=100)
    size = models.CharField(max_length=20)
    color = models.CharField(max_length=60)
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.PositiveIntegerField(default=1)
    image_url = models.URLField(max_length=500, blank=True)

    def __str__(self):
        return f"{self.product_name} x{self.quantity}"
