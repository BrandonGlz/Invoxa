USE invoxa_db

--Validar credenciales del usuario
SELECT num 
FROM USUARIO 
WHERE nombre = 'JHernandez' AND contraseña = 'invoxa1' 
AND estado = 'HAB';

--Validar correo electronico
SELECT num 
FROM PERSONA
WHERE correo = '0323105925@ut-tijuana.edu.mx' 

--Validar correo electronico por usuario
SELECT p.num, u.num, p.correo, u.nombre
FROM PERSONA AS p
INNER JOIN USUARIO 

--Para pruebas de cambio de contraseña
select * from USUARIO   


