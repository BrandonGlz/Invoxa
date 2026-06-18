-- Vista para dashboard: KPIs generales
CREATE VIEW VW_Dashboard_KPI AS
SELECT 
    (SELECT COUNT(codigo) FROM FACTURA) AS total_facturas,
    (SELECT COUNT(codigo) FROM FACTURA WHERE estado = 'PEN') AS facturas_pendientes,
    (SELECT COUNT(codigo) FROM FACTURA WHERE estado = 'PAG') AS facturas_pagadas,
    (SELECT SUM(total) FROM FACTURA WHERE estado = 'PAG') AS dinero_invertido;

-- Vista para previsualización detallada de facturas
CREATE VIEW VW_Facturas_Detalle AS
SELECT 
    f.codigo, f.descripcion, f.fechaEmision, f.total, f.subtotal, f.iva, f.limitePago,
    p.nombre AS nombre_proveedor,
    e.descripcion AS estado_factura
FROM FACTURA f
INNER JOIN PROVEEDOR p ON f.proveedor = p.num
INNER JOIN EDO_FACTURA e ON f.estado = e.codigo;

-- Vista para gestión de perfiles de usuario
CREATE VIEW VW_Usuarios_Perfiles AS
SELECT 
    u.nombre AS usuario,
    CONCAT(p.nombrePila, ' ', p.primApell, ' ', p.segApell) AS nombre_completo,
    p.correo,
    r.descripcion AS rol,
    e.descripcion AS estado
FROM USUARIO u
INNER JOIN PERSONA p ON u.persona = p.num
INNER JOIN ROL r ON u.rol = r.codigo
INNER JOIN EDO_USUARIO e ON u.estado = e.codigo;

-- Vista para listado maestro de proveedores
CREATE VIEW VW_Proveedores_Resumen AS
SELECT 
    p.nombre, p.rfc,
    GROUP_CONCAT(c.correo) AS emails,
    COUNT(f.codigo) AS total_facturas
FROM PROVEEDOR p
LEFT JOIN CONTACTO c ON p.num = c.proveedor
LEFT JOIN FACTURA f ON p.num = f.proveedor
GROUP BY p.num;