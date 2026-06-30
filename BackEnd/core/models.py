from django.db import models

class EdoUsuario(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    descripcion = models.CharField(max_length=20)

    class Meta:
        db_table = 'edo_usuario'

class EdoProveedor(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    descripcion = models.CharField(max_length=20)

    class Meta:
        db_table = 'edo_proveedor'

class EdoFactura(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    descripcion = models.CharField(max_length=20)

    class Meta:
        db_table = 'edo_factura'

class Persona(models.Model):
    num = models.AutoField(primary_key=True)
    nombrePila = models.CharField(max_length=20)
    primApell = models.CharField(max_length=20)
    segApell = models.CharField(max_length=20)
    correo = models.CharField(max_length=50)

    class Meta:
        db_table = 'persona'

class Rol(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    descripcion = models.CharField(max_length=20)

    class Meta:
        db_table = 'rol'

class CompPago(models.Model):
    num = models.AutoField(primary_key=True)
    fecha = models.DateField()
    cuenta = models.CharField(max_length=18)

    class Meta:
        db_table = 'comp_pago'

class Sucursal(models.Model):
    codigo = models.CharField(max_length=3, primary_key=True)
    nombre = models.CharField(max_length=20)
    rfc = models.CharField(max_length=13)
    numCelular = models.CharField(max_length=10)
    correo = models.CharField(max_length=50)

    class Meta:
        db_table = 'sucursal'

class Usuario(models.Model):
    num = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20)
    contrasena = models.CharField(max_length=20, db_column='contraseña')
    persona = models.ForeignKey(Persona, on_delete=models.CASCADE, db_column='persona')
    estado = models.ForeignKey(EdoUsuario, on_delete=models.CASCADE, db_column='estado')
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE, db_column='rol')

    class Meta:
        db_table = 'usuario'

class Proveedor(models.Model):
    num = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=20)
    rfc = models.CharField(max_length=13)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='usuario')
    estado = models.ForeignKey(EdoProveedor, on_delete=models.CASCADE, db_column='estado')
    sucursal = models.ForeignKey(Sucursal, on_delete=models.CASCADE, db_column='sucursal')

    class Meta:
        db_table = 'proveedor'

class Contacto(models.Model):
    num = models.AutoField(primary_key=True)
    correo = models.CharField(max_length=50)
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, db_column='proveedor')

    class Meta:
        db_table = 'contacto'

class Factura(models.Model):
    codigo = models.CharField(max_length=5, primary_key=True)
    descripcion = models.CharField(max_length=50)
    fechaEmision = models.DateField()
    precioUnitario = models.DecimalField(max_digits=10, decimal_places=2)
    cantidad = models.IntegerField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    subTotal = models.DecimalField(max_digits=10, decimal_places=2)
    iva = models.DecimalField(max_digits=10, decimal_places=2)
    limitePago = models.DateField()
    estado = models.ForeignKey(EdoFactura, on_delete=models.CASCADE, db_column='estado')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, db_column='proveedor')
    comprobante = models.ForeignKey(CompPago, on_delete=models.SET_NULL, null=True, blank=True, db_column='comprobante')

    class Meta:
        db_table = 'factura'

class Reporte(models.Model):
    num = models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    fecha = models.DateField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, db_column='usuario')

    class Meta:
        db_table = 'reporte'

class FacturaProveedor(models.Model):
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, db_column='factura')
    proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE, db_column='proveedor')

    class Meta:
        db_table = 'factura_proveedor'
        unique_together = (('factura', 'proveedor'),)

class ReporteFactura(models.Model):
    reporte = models.ForeignKey(Reporte, on_delete=models.CASCADE, db_column='reporte')
    factura = models.ForeignKey(Factura, on_delete=models.CASCADE, db_column='factura')

    class Meta:
        db_table = 'reporte_factura'
        unique_together = (('reporte', 'factura'),)