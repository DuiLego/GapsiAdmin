const jwt = require('jsonwebtoken');

let { getUserById } = require('../models/users');

const { getURL } = require('../helpers/files');

module.exports = async(req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        let user = await getUserById(1);

        if(user){
            user.image = await getURL({
                path: 'assets/users/' + user.id,
                file: 'profile',
                exact: false
            });
        }

        return res.status(401).json({
            msg: 'Sesión caducada.', 
            user: user || null
        })
    }

    // Verify token
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.user;

        let user = await getUserById(req.user.id);

        if(user){
            next();
        }else{
            return res.status(401).json({
                msg: 'Acceso denegado.', 
                user: null
            });
        }
    } catch (error) {
        let user = await getUserById(1);

        if(user){
            user.image = await getURL({
                path: 'assets/users/' + user.id,
                file: 'profile',
                exact: false
            });
        }

        return res.status(401).json({
            msg: 'Sesión caducada.', 
            user: user || null
        });
    }
}