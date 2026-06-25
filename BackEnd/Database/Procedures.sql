USE invoxa_db;
DELIMITER //

-- Estados
CREATE PROCEDURE sp_ins_edo_usuario(IN p_cod VARCHAR(10), IN p_desc VARCHAR(50))
BEGIN INSERT INTO EDO_USUARIO (codigo, descripcion) VALUES (p_cod, p_desc); END //
-- CALL sp_ins_edo_usuario(?, ?);

CREATE PROCEDURE sp_ins_edo_proveedor(IN p_cod VARCHAR(10), IN p_desc VARCHAR(50))
BEGIN INSERT INTO EDO_PROVEEDOR (codigo, descripcion) VALUES (p_cod, p_desc); END //
-- CALL sp_ins_edo_proveedor(?, ?);

CREATE PROCEDURE sp_ins_edo_factura(IN p_cod VARCHAR(10), IN p_desc VARCHAR(50))
BEGIN INSERT INTO EDO_FACTURA (codigo, descripcion) VALUES (p_cod, p_desc); END //
-- CALL sp_ins_edo_factura(?, ?);

-- Roles
CREATE PROCEDURE sp_ins_rol(IN p_cod VARCHAR(10), IN p_desc VARCHAR(50))
BEGIN INSERT INTO ROL (codigo, descripcion) VALUES (p_cod, p_desc); END //
-- CALL sp_ins_rol(?, ?);

-- Personas
CREATE PROCEDURE sp_ins_persona(IN p_num INT, IN p_nom VARCHAR(50), IN p_apP VARCHAR(50), IN p_apM VARCHAR(50), IN p_corr VARCHAR(100))
BEGIN INSERT INTO PERSONA (num, nombrePila, primApell, segApell, correo) VALUES (p_num, p_nom, p_apP, p_apM, p_corr); END //
-- CALL sp_ins_persona(?, ?, ?, ?, ?);

-- Comprobantes
CREATE PROCEDURE sp_ins_comp_pago(IN p_num INT, IN p_fecha DATE, IN p_cuenta VARCHAR(20))
BEGIN INSERT INTO COMP_PAGO (num, fecha, cuenta) VALUES (p_num, p_fecha, p_cuenta); END //
-- CALL sp_ins_comp_pago(?, ?, ?);

-- Sucursales
CREATE PROCEDURE sp_ins_sucursal(IN p_cod VARCHAR(10), IN p_nom VARCHAR(50), IN p_rfc VARCHAR(20), IN p_cel VARCHAR(15), IN p_corr VARCHAR(100))
BEGIN INSERT INTO SUCURSAL (codigo, nombre, rfc, numCelular, correo) VALUES (p_cod, p_nom, p_rfc, p_cel, p_corr); END //
-- CALL sp_ins_sucursal(?, ?, ?, ?, ?);

-- Usuarios
CREATE PROCEDURE sp_ins_usuario(IN p_num INT, IN p_nom VARCHAR(50), IN p_pass VARCHAR(50), IN p_pers INT, IN p_est VARCHAR(10), IN p_rol VARCHAR(10))
BEGIN INSERT INTO USUARIO (num, nombre, contraseña, persona, estado, rol) VALUES (p_num, p_nom, p_pass, p_pers, p_est, p_rol); END //
-- CALL sp_ins_usuario(?, ?, ?, ?, ?, ?);

-- Proveedores
CREATE PROCEDURE sp_ins_proveedor(IN p_num INT, IN p_nom VARCHAR(100), IN p_rfc VARCHAR(20), IN p_usu INT, IN p_est VARCHAR(10), IN p_suc VARCHAR(10))
BEGIN INSERT INTO PROVEEDOR (num, nombre, rfc, usuario, estado, sucursal) VALUES (p_num, p_nom, p_rfc, p_usu, p_est, p_suc); END //
-- CALL sp_ins_proveedor(?, ?, ?, ?, ?, ?);

-- Contactos
CREATE PROCEDURE sp_ins_contacto(IN p_num INT, IN p_corr VARCHAR(100), IN p_prov INT)
BEGIN INSERT INTO CONTACTO (num, correo, proveedor) VALUES (p_num, p_corr, p_prov); END //
-- CALL sp_ins_contacto(?, ?, ?);

-- Facturas
CREATE PROCEDURE sp_ins_factura(IN p_cod VARCHAR(20), IN p_desc VARCHAR(255), IN p_fecha DATE, IN p_prec DECIMAL(10,2), IN p_cant INT, IN p_tot DECIMAL(10,2), IN p_sub DECIMAL(10,2), IN p_iva DECIMAL(10,2), IN p_lim DATE, IN p_est VARCHAR(10), IN p_prov INT, IN p_comp INT)
BEGIN INSERT INTO FACTURA (codigo, descripcion, fechaEmision, precioUnitario, cantidad, total, subtotal, iva, limitePago, estado, proveedor, comprobante) VALUES (p_cod, p_desc, p_fecha, p_prec, p_cant, p_tot, p_sub, p_iva, p_lim, p_est, p_prov, p_comp); END //
-- CALL sp_ins_factura(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Reportes
CREATE PROCEDURE sp_ins_reporte(IN p_num INT, IN p_nom VARCHAR(100), IN p_fecha DATE, IN p_usu INT)
BEGIN INSERT INTO REPORTE (num, nombre, fecha, usuario) VALUES (p_num, p_nom, p_fecha, p_usu); END //
-- CALL sp_ins_reporte(?, ?, ?, ?);

-- Relaciones
CREATE PROCEDURE sp_ins_factura_proveedor(IN p_fact VARCHAR(20), IN p_prov INT)
BEGIN INSERT INTO FACTURA_PROVEEDOR (factura, proveedor) VALUES (p_fact, p_prov); END //
-- CALL sp_ins_factura_proveedor(?, ?);

CREATE PROCEDURE sp_ins_reporte_factura(IN p_rep INT, IN p_fact VARCHAR(20))
BEGIN INSERT INTO REPORTE_FACTURA (reporte, factura) VALUES (p_rep, p_fact); END //
-- CALL sp_ins_reporte_factura(?, ?);

DELIMITER ;