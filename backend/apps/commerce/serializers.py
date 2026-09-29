from rest_framework import serializers
from .models import CartItem, WishlistItem, Order, OrderItem
from apps.products.serializers import ProductListSerializer

class CartItemSerializer(serializers.ModelSerializer):
    product_detail = ProductListSerializer(source='product', read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            'id', 'firebase_uid', 'product', 'product_detail',
            'size', 'color', 'quantity', 'subtotal', 'added_at'
        ]

    def get_subtotal(self, obj):
        return float(obj.product.price) * obj.quantity

class WishlistItemSerializer(serializers.ModelSerializer):
    product_detail = ProductListSerializer(source='product', read_only=True)

    class Meta:
        model = WishlistItem
        fields = ['id', 'firebase_uid', 'product', 'product_detail', 'added_at']

class OrderItemSerializer(serializers.ModelSerializer):
    line_total = serializers.SerializerMethodField()

    class Meta:
        model = OrderItem
        fields = [
            'id', 'product', 'product_name', 'brand_name',
            'size', 'color', 'unit_price', 'quantity', 'image_url', 'line_total'
        ]

    def get_line_total(self, obj):
        return float(obj.unit_price) * obj.quantity

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = [
            'id', 'order_number', 'firebase_uid', 'recipient_name',
            'recipient_email', 'shipping_address', 'total_amount',
            'currency', 'payment_method', 'status', 'tracking_number',
            'items', 'created_at'
        ]
