from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..services import KpiService  

class KpiFacturasView(APIView):
    def get(self, request):
        try:
            resultado = KpiService.get_kpi_facturas()
            return Response(resultado, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"ERROR KPI FACTURAS: {e}")  # agregar esta línea
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GraficaBarrasView(APIView):
    def get(self, request):
        try:
            resultado = KpiService.get_grafica_barras()
            return Response(resultado, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"ERROR KPI FACTURAS: {e}")  # agregar esta línea
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class GraficaPastelView(APIView):
    def get(self, request):
        try:
            resultado = KpiService.get_grafica_pastel()
            return Response(resultado, status=status.HTTP_200_OK)
        except Exception as e:
            print(f"ERROR KPI FACTURAS: {e}")  # agregar esta línea
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)