from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import (
    EdoUsuario, EdoProveedor, EdoFactura, Persona, Rol, CompPago,
    Sucursal, Usuario, Proveedor, Contacto, Factura, Reporte,
    FacturaProveedor, ReporteFactura
)

class EdoUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdoUsuario
        fields = '__all__'

class EdoProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdoProveedor
        fields = '__all__'

class EdoFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = EdoFactura
        fields = '__all__'

class RolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rol
        fields = '__all__'

class SucursalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sucursal
        fields = '__all__'

class CompPagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompPago
        fields = '__all__'
        read_only_fields = ['num']

class PersonaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Persona
        fields = '__all__'
        read_only_fields = ['num']

class UsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = '__all__'
        read_only_fields = ['num']
        extra_kwargs = {
            'contrasena': {'write_only': True}
        }

    def create(self, validated_data):
        validated_data['contrasena'] = make_password(validated_data.get('contrasena'))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if 'contrasena' in validated_data:
            validated_data['contrasena'] = make_password(validated_data.get('contrasena'))
        return super().update(instance, validated_data)

class ProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proveedor
        fields = '__all__'
        read_only_fields = ['num']

class ContactoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contacto
        fields = '__all__'
        read_only_fields = ['num']

class FacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Factura
        fields = '__all__'

class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'
        read_only_fields = ['num']

class FacturaProveedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = FacturaProveedor
        fields = '__all__'

class ReporteFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReporteFactura
        fields = '__all__'