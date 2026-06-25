const Host = require('../Config/Host');

//Controllers
const Login = require('../Controllers/Query/Login');
const Recuperar_contra = require('../Controllers/Query/Recuperar_contra');

//Rutas
Host.use('/api/login', Login);
Host.use('/api/recuperar', Recuperar_contra);


module.exports = Host;