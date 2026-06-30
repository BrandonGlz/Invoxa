--Validacion de credenciales
SELECT num 
FROM USUARIO 
WHERE nombre = 'JHernandez' AND contraseña = 'invoxa1' AND estado = 'HAB';

--Validacion de codigo
SELECT num 
FROM PERSONA
WHERE correo = '0323105925@ut-tijuana.edu.mx';

--Obtener id de usuario por id de persona
SELECT p.num, u.num AS num_usuario, p.correo, u.nombre
FROM PERSONA p
INNER JOIN USUARIO u ON p.num = u.persona;

--Validacion de cambios
SELECT * FROM USUARIO;