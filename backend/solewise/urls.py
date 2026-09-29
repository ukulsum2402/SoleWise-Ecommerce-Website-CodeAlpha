"""
URL configuration for SoleWise project.
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

urlpatterns = [
    path('admin/', admin.site.urls),
    
    # SoleWise Modular REST APIs (v1)
    path('api/v1/products/', include('apps.products.urls')),
    path('api/v1/intelligence/', include('apps.intelligence.urls')),
    path('api/v1/care/', include('apps.care.urls')),
    path('api/v1/design-lab/', include('apps.design_lab.urls')),
    path('api/v1/challenges/', include('apps.challenges.urls')),
    path('api/v1/commerce/', include('apps.commerce.urls')),
    path('api/v1/core/', include('apps.core.urls')),
]
