const Host = require('../Config/Host');

//Controllers
const Login = require('../Controllers/Query/Login');

//Rutas
Host.use('/api/login', Login);


module.exports = Host;