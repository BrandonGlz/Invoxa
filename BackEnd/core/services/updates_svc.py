from django.db import connection

class RecuperarService:

    @staticmethod
    def obtener_usuario_por_correo(correo):
        with connection.cursor() as cursor:
            query = """
                SELECT p.num AS num_persona, u.num AS num_usuario, p.correo, u.nombre
                FROM PERSONA AS p
                INNER JOIN USUARIO AS u ON p.num = u.persona
                WHERE p.correo = %s
            """
            cursor.execute(query, [correo])
            columns = [col[0] for col in cursor.description]
            return [dict(zip(columns, row)) for row in cursor.fetchall()]

    @staticmethod
    def actualizar_contrasena(num_usuario, nueva_contra):
        with connection.cursor() as cursor:
            query = 'UPDATE USUARIO SET "contraseña" = %s WHERE num = %s;'
            cursor.execute(query, [nueva_contra, num_usuario])
            # Retorna el número de filas afectadas
            return cursor.rowcount
        