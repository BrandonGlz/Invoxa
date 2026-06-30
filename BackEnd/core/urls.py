from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import KpiFacturasView, GraficaBarrasView, GraficaPastelView 
from .views import LoginView, RecuperarContraView
from .views import ActualizarContraView

router = DefaultRouter()

urlpatterns = [
    path('kpis/facturas/', KpiFacturasView.as_view(), name='kpi-facturas'),
    path('login/', LoginView.as_view(), name='auth-login'),
    path('recuperar-password/', RecuperarContraView.as_view(), name='auth-recuperar'),
    path('actualizar-password/', ActualizarContraView.as_view(), name='auth-actualizar'),
    path('kpis/facturas/', KpiFacturasView.as_view(), name='kpi-facturas'),
    path('kpis/barras/', GraficaBarrasView.as_view(), name='kpi-barras'),
    path('kpis/pastel/', GraficaPastelView.as_view(), name='kpi-pastel'),
    
    path('', include(router.urls)),
]

