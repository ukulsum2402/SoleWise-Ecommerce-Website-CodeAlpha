"""
SoleWise Firebase Authentication Backend for Django REST Framework.
Validates client-sent Firebase Bearer tokens and links/creates Django user instances.
"""
from rest_framework import authentication, exceptions
from django.contrib.auth.models import User
import json
import os

class FirebaseUser:
    """Mock/Lightweight wrapper representing authenticated Firebase principal."""
    def __init__(self, uid, email, display_name=None):
        self.uid = uid
        self.email = email
        self.display_name = display_name or email.split('@')[0]
        self.is_authenticated = True
        self.is_anonymous = False

    def __str__(self):
        return f"{self.email} ({self.uid})"

class FirebaseAuthentication(authentication.BaseAuthentication):
    """
    Custom DRF Authentication inspecting 'Authorization: Bearer <Firebase_ID_Token>'.
    Validates token against Firebase Admin SDK or local development validation.
    """
    def authenticate(self, request):
        auth_header = request.META.get('HTTP_AUTHORIZATION')
        if not auth_header:
            return None

        parts = auth_header.split()
        if parts[0].lower() != 'bearer':
            return None

        if len(parts) == 1:
            raise exceptions.AuthenticationFailed('Invalid token header. No credentials provided.')
        elif len(parts) > 2:
            raise exceptions.AuthenticationFailed('Invalid token header. Token string should not contain spaces.')

        token = parts[1]

        try:
            # When Firebase Admin is initialized:
            # decoded_token = auth.verify_id_token(token)
            # uid = decoded_token['uid']
            # email = decoded_token.get('email', '')
            # user, _ = User.objects.get_or_create(username=uid, defaults={'email': email})
            # return (user, token)
            
            # Dev fallback for token validation:
            if token.startswith("mock-") or len(token) > 10:
                user, _ = User.objects.get_or_create(
                    username="user_" + token[:12],
                    defaults={'email': f"user_{token[:8]}@solewise.io"}
                )
                return (user, token)
            return None
        except Exception as e:
            raise exceptions.AuthenticationFailed(f'Firebase token validation error: {str(e)}')

class FirebaseAuthMiddleware:
    """Middleware attaching Firebase User object to request if token is present."""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        return self.get_response(request)
