from django.db import connection

class LoginService:
    @staticmethod
    def validar_credenciales(nombre, contrasena):
        with connection.cursor() as cursor:
            query = 'SELECT num FROM USUARIO WHERE nombre = %s AND "contraseña" = %s AND estado = \'HAB\';'
            cursor.execute(query, [nombre, contrasena])
            columns = [col[0] for col in cursor.description]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]

    @staticmethod
    def validar_correo(correo):
        with connection.cursor() as cursor:
            query = 'SELECT num FROM PERSONA WHERE correo = %s;'
            cursor.execute(query, [correo])
            
            if cursor.description:
                columns = [col[0] for col in cursor.description]
                return [dict(zip(columns, row)) for row in cursor.fetchall()]
            return []
        
