CREATE VIEW "VW_Dashboard_KPI" AS
SELECT 
    COUNT(codigo) AS total_facturas,
    COUNT(codigo) FILTER (WHERE estado = 'PEN') AS facturas_pendientes,
    COUNT(codigo) FILTER (WHERE estado = 'PAG') AS facturas_pagadas,
    COALESCE(SUM(total) FILTER (WHERE estado = 'PAG'), 0.00) AS dinero_invertido
FROM FACTURA;

CREATE VIEW "VW_Grafica_Barras" AS
SELECT 
    to_char("fechaEmision", 'FMMonth') AS mes, 
    COUNT(codigo) AS cantidad_facturas 
FROM FACTURA 
GROUP BY to_char("fechaEmision", 'FMMonth'), EXTRACT(MONTH FROM "fechaEmision")
ORDER BY EXTRACT(MONTH FROM "fechaEmision");

CREATE VIEW "VW_Grafica_Pastel" AS
SELECT 
    e.descripcion AS estado_factura, 
    COUNT(f.codigo) AS cantidad_facturas
FROM FACTURA f
INNER JOIN EDO_FACTURA e ON f.estado = e.codigo
GROUP BY e.descripcion;