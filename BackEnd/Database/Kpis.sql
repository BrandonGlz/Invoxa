USE invoxa_db

CREATE VIEW VW_Dashboard_KPI AS
SELECT 
    (SELECT COUNT(codigo) FROM FACTURA) AS total_facturas,
    (SELECT COUNT(codigo) FROM FACTURA WHERE estado = 'PEN') AS facturas_pendientes,
    (SELECT COUNT(codigo) FROM FACTURA WHERE estado = 'PAG') AS facturas_pagadas,
    (SELECT SUM(total) FROM FACTURA WHERE estado = 'PAG') AS dinero_invertido;