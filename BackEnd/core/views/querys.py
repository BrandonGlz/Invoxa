from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.cache import cache
from django.core.mail import send_mail
from ..services import LoginService
import random

class LoginView(APIView):
    def post(self, request):
        try:
            nombre = request.data.get('nombre')
            contrasena = request.data.get('contraseña')

            if not nombre or not contrasena:
                return Response({'error': 'Credenciales incompletas'}, status=status.HTTP_400_BAD_REQUEST)

            resultado = LoginService.validar_credenciales(nombre, contrasena)
            return Response(resultado, status=status.HTTP_200_OK)
            
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class RecuperarContraView(APIView):
    def post(self, request):
        try:
            correo = request.data.get('correo')
            
            if not correo:
                return Response({'error': 'El correo es obligatorio'}, status=status.HTTP_400_BAD_REQUEST)

            resultado = LoginService.validar_correo(correo)

            if resultado and len(resultado) > 0:
                # Generación de código numérico aleatorio de 5 dígitos
                codigo = str(random.randint(10000, 99999))
                
                # Almacenamiento en caché con llave única y expiración de 900 segundos
                cache.set(f'recuperacion_{correo}', codigo, timeout=900)

                try:
                    # Ejecución del protocolo SMTP de Django
                    send_mail(
                        subject='Código de Recuperación Invoxa',
                        message=f'Tu código de recuperación es: {codigo}',
                        from_email='no-reply@invoxa.com',
                        recipient_list=[correo],
                        fail_silently=False,
                    )
                    return Response(resultado, status=status.HTTP_200_OK)
                except Exception as mail_error:
                    print(mail_error)
                    return Response({'error': 'Fallo al enviar el correo'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            else:
                return Response(resultado, status=status.HTTP_200_OK)
                
        except Exception as e:
            print(e)
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)