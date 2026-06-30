from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from core.utils.mailer import enviar_codigo
from core.utils.codigo_store import codigos_recuperacion
from ..services import RecuperarService

class ActualizarContraView(APIView):
    def post(self, request):
        try:
            correo = request.data.get('correo')
            codigo = request.data.get('codigo')
            nueva_contra = request.data.get('nuevaContra')

            if not all([correo, codigo, nueva_contra]):
                return Response({'exito': False, 'mensaje': 'Datos incompletos.'}, status=status.HTTP_400_BAD_REQUEST)

            # Validar código desde el caché
            codigo_guardado = cache.get(f'recuperacion_{correo}')
            if not codigo_guardado or codigo_guardado != codigo:
                return Response({'exito': False, 'mensaje': 'Código incorrecto o expirado.'}, status=status.HTTP_401_UNAUTHORIZED)

            # Obtener usuario
            usuario_data = RecuperarService.obtener_usuario_por_correo(correo)

            if usuario_data:
                num_usuario = usuario_data[0]['num_usuario']
                RecuperarService.actualizar_contrasena(num_usuario, nueva_contra)
                
                # Limpiar caché tras éxito
                cache.delete(f'recuperacion_{correo}')
                return Response({'exito': True, 'mensaje': 'Contraseña actualizada.'}, status=status.HTTP_200_OK)
            else:
                return Response({'exito': False, 'mensaje': 'Usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)
                
        except Exception as e:
            return Response({'exito': False, 'mensaje': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)