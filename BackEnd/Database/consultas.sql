USE invoxa_db;

-- Sub equipo 1 | Gonzalez Gonzalez Brandon
-- 1-Escribir SELECT con INNER JOIN entre USUARIO y PERSONA para validar correo y contraseña en el login
SELECT num 
FROM USUARIO 
WHERE nombre = 'JHernandez' AND contraseña = 'invoxa1' 
AND estado = 'HAB';

-- 2-Escribir SELECT de agregación para los KPIs del dashboard
SELECT 
    (SELECT COUNT(codigo) FROM FACTURA) AS total_facturas,
    (SELECT COUNT(codigo) FROM FACTURA WHERE estado = 'PEN') AS facturas_pendientes,
    (SELECT COUNT(codigo) FROM FACTURA WHERE estado = 'PAG') AS facturas_pagadas,
    (SELECT SUM(total) FROM FACTURA WHERE estado = 'PAG') AS dinero_invertido;

-- 3-Escribir dos SELECT independientes para los datos de cada gráfica del dashboard
SELECT 
    EXTRACT(MONTH FROM fechaEmision) AS mes, 
    COUNT(codigo) AS cantidad_facturas 
FROM FACTURA 
GROUP BY EXTRACT(MONTH FROM fechaEmision)
ORDER BY mes;

SELECT 
    e.descripcion AS estado_factura, 
    COUNT(f.codigo) AS cantidad_facturas
FROM FACTURA f
INNER JOIN EDO_FACTURA e ON f.estado = e.codigo
GROUP BY e.descripcion;

-- Salazar Urtuzuastegui Yadira Guadalupe
-- 5-Escribir SELECT en COMP_PAGO para extraer los datos del comprobante cargado
SELECT 
    f.total AS "Monto total",
    p.nombre AS "Proveedor",
    cp.fecha AS "Fecha de pago",
    cp.cuenta AS "Cuenta"
FROM COMP_PAGO cp
INNER JOIN FACTURA f ON cp.num = f.comprobante
INNER JOIN PROVEEDOR p ON f.proveedor = p.num;

-- 6 y 7-Escribir SELECT con INNER JOIN entre FACTURA y PROVEEDOR para la previsualización
SELECT 
    p.nombre AS Proveedor,
    p.rfc AS RFC,
    f.cantidad,
    f.descripcion,
    f.precioUnitario,
    f.subtotal AS importe,
    f.total AS total_a_pagar,
    f.subtotal,
    f.iva
FROM FACTURA f
INNER JOIN PROVEEDOR p ON f.proveedor = p.num
WHERE f.codigo = 'F0001';

-- Irvin | Apoyo al Sub equipo 1 y 2
-- S1-Escribir SELECT con campos específicos en la tabla REPORTE
SELECT 
    r.nombre AS "Nombre de reporte",
    GROUP_CONCAT(DISTINCT p.nombre) AS "Proveedores",
    r.fecha AS "Fecha de generación",
    SUM(f.total) AS "Monto total",
    COUNT(f.codigo) AS "Facturas"
FROM REPORTE r
INNER JOIN REPORTE_FACTURA rf ON r.num = rf.reporte
INNER JOIN FACTURA f ON rf.factura = f.codigo
INNER JOIN PROVEEDOR p ON f.proveedor = p.num
GROUP BY 
    r.num, 
    r.nombre, 
    r.fecha;

-- S1-Escribir SELECT con campos específicos en la tabla PROVEEDOR
SELECT 
    p.nombre AS "Nombre",
    p.rfc AS "RFC",
    GROUP_CONCAT(DISTINCT c.correo SEPARATOR ', ') AS "Email",
    ep.descripcion AS "Estado",
    COUNT(DISTINCT f.codigo) AS "Facturas"
FROM PROVEEDOR p
LEFT JOIN CONTACTO c ON p.num = c.proveedor
INNER JOIN EDO_PROVEEDOR ep ON p.estado = ep.codigo
LEFT JOIN FACTURA f ON p.num = f.proveedor
GROUP BY 
    p.num, 
    p.nombre, 
    p.rfc, 
    ep.descripcion;

-- Sub equipo 2 | Valdez Anaya Noemi Elizabeth
-- 1-Escribir SELECT con INNER JOIN entre USUARIO y PERSONA para extraer los datos del perfil
SELECT 
    u.nombre AS "Nombre de usuario",
    p.nombrePila AS "Nombre",
    p.primApell AS "Apellido paterno",
    p.segApell AS "Apellido materno",
    p.correo AS "Correo electrónico",
    u.estado AS "Estado",
    r.descripcion AS "Rol"
FROM USUARIO u
INNER JOIN PERSONA p ON u.persona = p.num
INNER JOIN ROL r ON u.rol = r.codigo
WHERE u.num = 1;

-- 3-Escribir SELECT con columnas específicas de la tabla FACTURA
SELECT 
    f.codigo AS "Factura",
    p.nombre AS "Proveedor",
    f.fechaEmision AS "Fecha de emisión",
    f.total AS "Monto a pagar",
    f.limitePago AS "Limite de pago",
    ef.descripcion AS "Estado"
FROM FACTURA f
INNER JOIN PROVEEDOR p ON f.proveedor = p.num
INNER JOIN EDO_FACTURA ef ON f.estado = ef.codigo;

-- 4-Escribir SELECT en FACTURA con WHERE para los filtros de búsqueda
SELECT f.codigo AS "Factura", p.nombre AS "Proveedor", f.fechaEmision AS "Fecha de emisión", f.total AS "Monto a pagar", f.limitePago AS "Limite de pago", ef.descripcion AS "Estado"
FROM FACTURA f INNER JOIN PROVEEDOR p ON f.proveedor = p.num INNER JOIN EDO_FACTURA ef ON f.estado = ef.codigo WHERE f.proveedor = 1;

SELECT f.codigo AS "Factura", p.nombre AS "Proveedor", f.fechaEmision AS "Fecha de emisión", f.total AS "Monto a pagar", f.limitePago AS "Limite de pago", ef.descripcion AS "Estado"
FROM FACTURA f INNER JOIN PROVEEDOR p ON f.proveedor = p.num INNER JOIN EDO_FACTURA ef ON f.estado = ef.codigo WHERE f.fechaEmision >= '2026-01-01' AND f.fechaEmision <= '2026-12-31';

SELECT f.codigo AS "Factura", p.nombre AS "Proveedor", f.fechaEmision AS "Fecha de emisión", f.total AS "Monto a pagar", f.limitePago AS "Limite de pago", ef.descripcion AS "Estado"
FROM FACTURA f INNER JOIN PROVEEDOR p ON f.proveedor = p.num INNER JOIN EDO_FACTURA ef ON f.estado = ef.codigo WHERE f.limitePago >= '2026-01-01' AND f.limitePago <= '2026-12-31';

SELECT f.codigo AS "Factura", p.nombre AS "Proveedor", f.fechaEmision AS "Fecha de emisión", f.total AS "Monto a pagar", f.limitePago AS "Limite de pago", ef.descripcion AS "Estado"
FROM FACTURA f INNER JOIN PROVEEDOR p ON f.proveedor = p.num INNER JOIN EDO_FACTURA ef ON f.estado = ef.codigo WHERE f.total >= 1000.00 AND f.total <= 1500.00;

-- Diaz Juarez Oscar Armando
-- 5-Escribir SELECT en FACTURA con WHERE para filtrar exclusivamente por estado
SELECT 
    f.codigo AS "Factura",
    p.nombre AS "Proveedor",
    f.fechaEmision AS "Fecha de emisión",
    f.total AS "Monto a pagar",
    f.limitePago AS "Limite de pago",
    ef.descripcion AS "Estado"
FROM FACTURA f
INNER JOIN PROVEEDOR p ON f.proveedor = p.num
INNER JOIN EDO_FACTURA ef ON f.estado = ef.codigo
WHERE f.estado = 'REC';

-- 8-Escribir SELECT con campos específicos en la tabla USUARIO
SELECT 
    CONCAT(p.nombrePila, ' ', p.primApell) AS "Nombre",
    CURRENT_TIMESTAMP AS "Último acceso",
    p.correo AS "Email",
    eu.descripcion AS "Estado",
    r.descripcion AS "Rol"
FROM USUARIO u
INNER JOIN PERSONA p ON u.persona = p.num
INNER JOIN EDO_USUARIO eu ON u.estado = eu.codigo
INNER JOIN ROL r ON u.rol = r.codigo;