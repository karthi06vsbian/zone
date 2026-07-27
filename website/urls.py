from django.urls import path
from . import views

urlpatterns = [
    path('', views.home_view, name='home'),
    path('services/', views.services_view, name='services'),
    path('services/<int:pk>/', views.service_detail_view, name='service_detail'),
    path('ServiceDetail/', views.service_detail_view, name='service_detail_legacy'), # legacy query param compatibility ?id=1
    path('about/', views.about_view, name='about'),
    path('clients/', views.clients_view, name='clients'),
    path('contact/', views.contact_view, name='contact'),
]
