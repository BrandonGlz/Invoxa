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

CREATE VIEW VW_Grafica_Barras AS
SELECT 
    MONTHNAME(fechaEmision) AS mes, 
    COUNT(codigo) AS cantidad_facturas 
FROM FACTURA 
GROUP BY MONTH(fechaEmision), MONTHNAME(fechaEmision)
ORDER BY MONTH(fechaEmision);

CREATE VIEW VW_Grafica_Pastel AS
SELECT 
    e.descripcion AS estado_factura, 
    COUNT(f.codigo) AS cantidad_facturas
FROM FACTURA f
INNER JOIN EDO_FACTURA e ON f.estado = e.codigo
GROUP BY e.descripcion;