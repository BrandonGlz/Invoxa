use invoxa_db;

-- Sub equipo 1 | Gonzalez Gonzalez Brandon
-- 4-Escribir INSERT para registrar una nueva factura
INSERT INTO FACTURA (codigo, descripcion, fechaEmision, precioUnitario, cantidad, total, subtotal, iva, limitePago, estado, proveedor, comprobante) VALUES
('F0003', 'Mesas de estaciones de trabajo', '2026-06-15', 200, 6, 1296, 1200, 0.08, '2026-06-29', 'REC', 1, NULL)

-- Apoyo al Sub equipo 1 y 2 | Irvin
-- S1-Escribir INSERT para registrar un nuevo proveedor
INSERT INTO PROVEEDOR (num, nombre, rfc, usuario, estado, sucursal) VALUES
(3, 'MueblesExpress', 'MEX123412H', 2, 'HAB', 'FLO')

-- Diaz Juarez Oscar Armando
-- 6-Escribir INSERT para registrar un nuevo reporte
INSERT INTO REPORTE (num, nombre, fecha, usuario) VALUES
(2, 'Reporte_prueba_2026_2', '2026-06-15', 1)

-- 7-Escribir INSERT para registrar un nuevo usuario
INSERT INTO PERSONA (num, nombrePila, primApell, segApell, correo) VALUES
(5, 'Omar', 'Gonzalez', 'Gonzalez', 'Omar_invoxa@gmail.com')

INSERT INTO USUARIO (num, nombre, contraseña, persona, estado, rol) VALUES
(5, 'OGonzalez', 'invoxa', 5, 'HAB', 'GDA')

--- Armando (Variaciones)
-- Insert 6 - INSERT nuevo reporte
INSERT INTO REPORTE (num, nombre, fecha, usuario)
VALUES (3, 'Reporte Marzo 2024', '2024-03-31', 1);

-- Insert 7 - INSERT nuevo usuario
INSERT INTO USUARIO (num, nombre, contrasena, persona, estado, rol)
VALUES (3, 'mcastro', 'pass789', 3, 'ACT', 'AUD');