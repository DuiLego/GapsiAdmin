const jwt = require('jsonwebtoken');
const sharp = require('sharp');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');
const { check, validationResult } = require('express-validator');

let { getUserByUsername, createUser, getUserById } = require('../models/users');

const { createDirectory, uploadFile, getURL } = require('../helpers/files');

const loginAccountValidation = [
    check('username', 'El usuario es requerido.').exists()
];

const signupAccountValidation = [
    check('name', 'El nombre es requerido.').exists(),
    check('username', 'El usuario es requerido.').exists()
];

const loginAccount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0]?.msg,
            success: false
        })
    }

    Object.keys(req.body).forEach(function(key) {
        if (req.body[key] == 'null' || req.body[key] == 'undefined') {
            req.body[key] = null;
        }
    });

    let {
        username
    } = req.body;

    try {
        if(!username){
            return res.status(400).send({  
                msg: 'El usuario es necesario.',
                success: false
            });
        }

        let user = await getUserByUsername(username);

        if(user){
            user.image = await getURL({
                path: 'assets/users/' + user.id,
                file: 'profile',
                exact: false
            });

            jwt.sign({ 
                user
            } , process.env.TOKEN_SECRET, { expiresIn: '24h' }, async (error, token) => {
                if (error) throw error;

                return res.status(200).send({  
                    msg: 'Acceso correcto.',
                    token,
                    user,
                    success: true
                });
            });
        }else{
            return res.status(400).send({  
                msg: 'El usuario no tiene acceso al sistema.',
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
            success: false
        });
    }
}

const signupAccount = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0]?.msg,
            success: false
        })
    }

    Object.keys(req.body).forEach(function(key) {
        if (req.body[key] == 'null' || req.body[key] == 'undefined') {
            req.body[key] = null;
        }
    });

    let {
        name, 
        username
    } = req.body;

    try {
        if(!name){
            return res.status(400).send({  
                msg: 'El nombre es necesario.',
                success: false
            });
        }

        if(!username){
            return res.status(400).send({  
                msg: 'El usuario es necesario.',
                success: false
            });
        }

        let user = await createUser({
            name, 
            username
        });

        if(user){
            let url_image = null;

            if(req.files){
                let imagen_png = await sharp(req.files.image.data).png().toBuffer();

                let imagen_reducida = await imagemin.buffer(imagen_png, {
                    plugins: [imageminPngquant({ quality: [0.7, 0.8] })]
                });

                await createDirectory({
                    path: 'assets/users/' + user.id
                });

                await uploadFile({
                    path: 'assets/users/' + user.id + '/profile.png',
                    body: imagen_reducida
                });

                url_image = await getURL({
                    path: 'assets/users/' + user.id,
                    file: 'profile',
                    exact: false
                });
            }

            return res.status(200).send({  
                msg: 'Registro correcto.',
                user: {
                    ...user, 
                    image: url_image
                },
                success: true
            });
        }else{
            return res.status(400).send({  
                msg: 'No fue posible crear al usuario.',
                success: false
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
            success: false
        });
    }
}

const getAccount = async (req, res) => {
    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
            success: false
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.user;

        if(!req.user){
            return res.status(400).send({  
                msg: 'Sesión no valida',
                success: false
            });
        }

        let user = await getUserById(req.user.id);

        if(user){
            user.image = await getURL({
                path: 'assets/users/' + user.id,
                file: 'profile',
                exact: false
            });
        }

        return res.status(200).json({
            user: user || null, 
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errors: [{ msg: 'Algo salió mal, inténtalo más tarde.' }],
            success: false
        });
    }
}

module.exports = {
    loginAccountValidation, 
    signupAccountValidation, 

    loginAccount, 
    signupAccount, 
    getAccount
};