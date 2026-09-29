from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
import uuid
from .models import CartItem, WishlistItem, Order, OrderItem
from .serializers import CartItemSerializer, WishlistItemSerializer, OrderSerializer

class CartViewSet(viewsets.ModelViewSet):
    """Shopping cart management."""
    serializer_class = CartItemSerializer

    def get_queryset(self):
        uid = self.request.query_params.get('firebase_uid') or (
            self.request.user.username if self.request.user.is_authenticated else None
        )
        if not uid:
            return CartItem.objects.none()
        return CartItem.objects.filter(firebase_uid=uid).select_related('product', 'product__brand')

class WishlistViewSet(viewsets.ModelViewSet):
    """Wishlist items management."""
    serializer_class = WishlistItemSerializer

    def get_queryset(self):
        uid = self.request.query_params.get('firebase_uid') or (
            self.request.user.username if self.request.user.is_authenticated else None
        )
        if not uid:
            return WishlistItem.objects.none()
        return WishlistItem.objects.filter(firebase_uid=uid).select_related('product', 'product__brand')

    @action(detail=False, methods=['post'])
    def toggle(self, request):
        """Toggle product in user's wishlist."""
        uid = request.data.get('firebase_uid')
        product_id = request.data.get('product_id')
        if not uid or not product_id:
            return Response({'detail': 'firebase_uid and product_id required'}, status=status.HTTP_400_BAD_REQUEST)

        existing = WishlistItem.objects.filter(firebase_uid=uid, product_id=product_id).first()
        if existing:
            existing.delete()
            return Response({'status': 'removed', 'product_id': product_id})
        else:
            item = WishlistItem.objects.create(firebase_uid=uid, product_id=product_id)
            return Response({'status': 'added', 'id': item.id})

class OrderViewSet(viewsets.ModelViewSet):
    """Order placement and historical orders retrieval."""
    serializer_class = OrderSerializer

    def get_queryset(self):
        uid = self.request.query_params.get('firebase_uid') or (
            self.request.user.username if self.request.user.is_authenticated else None
        )
        if not uid:
            return Order.objects.none()
        return Order.objects.filter(firebase_uid=uid).prefetch_related('items')

    def create(self, request, *args, **kwargs):
        data = request.data
        uid = data.get('firebase_uid', 'guest')
        items_data = data.get('items', [])
        
        order = Order.objects.create(
            order_number='SW-' + uuid.uuid4().hex[:8].upper(),
            firebase_uid=uid,
            recipient_name=data.get('recipient_name', 'Customer'),
            recipient_email=data.get('recipient_email', 'shopper@solewise.io'),
            shipping_address=data.get('shipping_address', '123 Sneaker Boulevard, Portland, OR'),
            total_amount=data.get('total_amount', 0.0),
            payment_method=data.get('payment_method', 'Credit Card (Demo)'),
            tracking_number='TRK-' + uuid.uuid4().hex[:10].upper(),
        )

        for item in items_data:
            OrderItem.objects.create(
                order=order,
                product_id=item.get('product_id'),
                product_name=item.get('name', 'Footwear Item'),
                brand_name=item.get('brand', 'SoleWise Brand'),
                size=item.get('size', '10.5'),
                color=item.get('color', 'Standard'),
                unit_price=item.get('price', 0.0),
                quantity=item.get('quantity', 1),
                image_url=item.get('image', ''),
            )

        serializer = self.get_serializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
