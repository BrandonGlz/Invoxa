--Salazar Urtuzuastegui Yadira Guadalupe
--8-Escribir UPDATE para modificar el estado o columnas generales de una factura
--Descripción
UPDATE FACTURA 
SET descripcion = 'Nuevos escritorios de oficina' 
WHERE codigo = 'F0001';

--Fecha de emisión
UPDATE FACTURA 
SET fechaEmision = '2026-06-15' 
WHERE codigo = 'F0001';

--Precio unitario
UPDATE FACTURA 
SET precioUnitario = 250.00 
WHERE codigo = 'F0001';

--Cantidad
UPDATE FACTURA 
SET cantidad = 10 
WHERE codigo = 'F0001';

--Subtotal
UPDATE FACTURA 
SET subtotal = 2500.00 
WHERE codigo = 'F0001';

--IVA
UPDATE FACTURA 
SET iva = 0.16 
WHERE codigo = 'F0001';

--Total
UPDATE FACTURA 
SET total = 2900.00 
WHERE codigo = 'F0001';

--Fecha límite de pago
UPDATE FACTURA 
SET limitePago = '2026-06-30' 
WHERE codigo = 'F0001';

--Estado
UPDATE FACTURA 
SET estado = 'AUT' 
WHERE codigo = 'F0001';

-- Actualizar el proveedor
UPDATE FACTURA 
SET proveedor = 2 
WHERE codigo = 'F0001';

--Comprobante de pago asociado
UPDATE FACTURA 
SET comprobante = 1 
WHERE codigo = 'F0001';


--Irvin para que por sub equipo sean cantidades iguales
--Apoyo al Sub equipo 1 y 2
--S1-Escribir UPDATE para modificar el estado o columnas generales de un proveedor
--Nombre
UPDATE PROVEEDOR 
SET nombre = 'Mobiliario Premium S.A.' 
WHERE num = 1;

--RFC
UPDATE PROVEEDOR 
SET rfc = 'MPR987654XYZ' 
WHERE num = 1;

--Estado
UPDATE PROVEEDOR 
SET estado = 'DES' 
WHERE num = 1;

--Sucursal
UPDATE PROVEEDOR 
SET sucursal = 'LAU' 
WHERE num = 1;

--Correo (si el proveedor tiene un solo contacto)
UPDATE CONTACTO 
SET correo = 'nuevo_contacto@minimuebles.com' 
WHERE proveedor = 1;

--Correo (si el proveedor tiene varios contactos)
UPDATE CONTACTO 
SET correo = 'nuevo_contacto@minimuebles.com' 
WHERE proveedor = 1 AND correo = 'cont.minimuebles@gmail.com';

--S2-Escribir UPDATE para modificar el estado o columnas generales de un usuario
--Nombre
UPDATE USUARIO 
SET nombre = 'JHernandezUpdated' 
WHERE num = 1;

--Contraseña
UPDATE USUARIO 
SET contraseña = 'NuevaContraseña1' 
WHERE num = 1;

--Estado
UPDATE USUARIO 
SET estado = 'DES' 
WHERE num = 1;


--Sub equipo 2
--Valdez Anaya Noemi Elizabeth
--2-Escribir UPDATE para modificar los datos del perfil
UPDATE PERSONA 
SET nombrePila = 'NuevoNombre' 
WHERE num = 1;

--Apellido paterno
UPDATE PERSONA 
SET primApell = 'NuevoPaterno' 
WHERE num = 1;

--Apellido materno
UPDATE PERSONA 
SET segApell = 'NuevoMaterno' 
WHERE num = 1;

--Correo electronico
UPDATE PERSONA 
SET correo = 'nuevo_correo@invoxa.com' 
WHERE num = 1;