from django.db import connection

class KpiService:
    @staticmethod
    def get_kpi_facturas():
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM "VW_Dashboard_KPI";')
            
            columns = [col[0] for col in cursor.description]
            
            return [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    @staticmethod
    def get_grafica_barras():
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM "VW_Grafica_Barras";')

            columns = [col[0] for col in cursor.description]
            
            return [dict(zip(columns, row)) for row in cursor.fetchall()]
    
    @staticmethod
    def get_grafica_pastel():
        with connection.cursor() as cursor:
            cursor.execute('SELECT * FROM "VW_Grafica_Pastel";')

            columns = [col[0] for col in cursor.description]
            
            return [dict(zip(columns, row)) for row in cursor.fetchall()]
        