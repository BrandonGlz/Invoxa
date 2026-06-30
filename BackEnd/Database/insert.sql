-- Estados
INSERT INTO EDO_USUARIO (codigo, descripcion) VALUES 
('HAB', 'Habilitado'), 
('DES', 'Deshabilitado');

INSERT INTO EDO_PROVEEDOR (codigo, descripcion) VALUES 
('HAB', 'Habilitado'), 
('DES', 'Deshabilitado');

INSERT INTO EDO_FACTURA (codigo, descripcion) VALUES 
('REC', 'Recibida'), 
('AUT', 'Autorizada'), 
('PEN', 'Pendiente de pago'), 
('PAG', 'Pagada'), 
('REA', 'Rechazada'), 
('VEN', 'Vencida');

-- Roles
INSERT INTO ROL (codigo, descripcion) VALUES 
('ADM', 'Administrador'), 
('GGL', 'Gerente general'), 
('GDA', 'Gerente de area'), 
('CPP', 'Cuentas por pagar');

-- Personas
INSERT INTO PERSONA ("nombrePila", "primApell", "segApell", correo) VALUES 
('Brandon', 'Gonzalez', 'Gonzalez', '0323105925@ut-tijuana.edu.mx'),
('Yadira', 'Salazar', 'Urtuzuastegui', '0323105871@ut-tijuana.edu.mx'),
('Irvin', 'Arce', 'Llamas', '0322103670@ut-tijuana.edu.mx'),
('Armando', 'Diaz', 'Juarez', '0323105846@ut-tijuana.edu.mx'),
('Elizabeth', 'Valdez', 'Anaya', '0322103834@ut-tijuana.edu.mx');

-- Comprobantes de pago
INSERT INTO COMP_PAGO (fecha, cuenta) VALUES 
('2026-06-14', '5436653473521234');

-- Sucursales
INSERT INTO SUCURSAL (codigo, nombre, rfc, "numCelular", correo) VALUES 
('FLO', 'Florido', 'FLO32139U0F', '6633332922', 'sucursal.flo@gmail.com'),
('LAU', 'Laurel', 'LAU321903HF', '6633338976', 'sucursal.lau@gmail.com');

-- Usuarios
INSERT INTO USUARIO (nombre, "contraseña", persona, estado, rol) VALUES 
('BGonzalez', 'invoxa', 1, 'HAB', 'ADM'),
('YSalazar', 'invoxa', 2, 'HAB', 'ADM'),
('IArce', 'invoxa', 3, 'HAB', 'ADM'),
('ADiaz', 'invoxa', 4, 'HAB', 'ADM'),
('EValdez', 'invoxa', 5, 'HAB', 'ADM');

-- Proveedores
INSERT INTO PROVEEDOR (nombre, rfc, usuario, estado, sucursal) VALUES 
('MiniMuebles', 'MFG123412F', 2, 'HAB', 'FLO'),
('GranMueble', 'MJU123412G', 2, 'HAB', 'LAU');

-- Contactos
INSERT INTO CONTACTO (correo, proveedor) VALUES 
('cont.minimuebles@gmail.com', 1),
('man.minimuebles@gmail.com', 1),
('gran.mueble@gmail.com', 2);

-- Facturas
INSERT INTO FACTURA (codigo, descripcion, "fechaEmision", "precioUnitario", cantidad, total, "subTotal", iva, "limitePago", estado, proveedor, comprobante) VALUES 
('F0001', 'Mesas de estaciones de trabajo', '2026-06-14', 200, 6, 1296, 1200, 0.08, '2026-06-28', 'REC', 1, NULL),
('F0002', 'Mesa para reuniones', '2026-06-14', 1500, 2, 3240, 3000, 0.08, '2026-06-28', 'PAG', 2, 1);

-- Reportes
INSERT INTO REPORTE (nombre, fecha, usuario) VALUES 
('Reporte_prueba_2026', '2026-06-14', 1);

-- Relaciones muchos a muchos
INSERT INTO FACTURA_PROVEEDOR (factura, proveedor) VALUES 
('F0001', 1), 
('F0002', 2);

INSERT INTO REPORTE_FACTURA (reporte, factura) VALUES 
(1, 'F0001'), 
(1, 'F0002');