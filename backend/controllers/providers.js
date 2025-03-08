const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');

let { getProviders, getProviderByName, getProviderByCompanyName, createProvider, updateProvider, removeProvider } = require('../models/providers');

const getListProvidersValidation = [
    check('page', 'La página es requerida').exists()
];

const getProviderValidation = [
    check('id', 'El id es requerido').exists()
];

const addProviderValidation = [
    check('name', 'El nombre es requerido').exists(), 
    check('company_name', 'La razón social es requerida').exists(), 
    check('address', 'La dirección es requerida').exists()
];

const editProviderValidation = [
    check('id', 'El id es requerido').exists(), 
    check('name', 'El nombre es requerido').exists(), 
    check('company_name', 'La razón social es requerida').exists(), 
    check('address', 'La dirección es requerida').exists()
];

const deleteProviderValidation = [
    check('id', 'El id es requerido').exists()
];

/* Funciones internas */
const getListProviders = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0]?.msg,
            success: false
        })
    }

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
            success: false
        })
    }

    Object.keys(req.body).forEach(function(key) {
        if (req.body[key] == 'null' || req.body[key] == 'undefined') {
            req.body[key] = null;
        }
    });

    let {
        page
    } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.user;

        let rows = 10;

        let providers = await getProviders();

        if(providers.length > 0){
            providers.sort((a, b) => {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        }

        const total = providers.length;

        const pages = Math.ceil(total / rows);

        const start_index = (page - 1) * rows;
        const end_index = start_index + rows;

        const paginated_providers = providers.slice(start_index, end_index);

        return res.status(200).send({
            msg: 'Listado obtenido correctamente',
            providers: paginated_providers, 
            currentPage: page, 
            pages, 
            success: true 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
            success: false
        });
    }
}

const addProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0]?.msg,
            success: false
        })
    }

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
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
        company_name, 
        address
    } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.user;

        let provider_name_exists = await getProviderByName(name);

        if(provider_name_exists){
            return res.status(400).send({
                msg: 'Ya existe un proveedor con ese nombre.',
                success: false
            });
        }

        let provider_company_name_exists = await getProviderByCompanyName(company_name);

        if(provider_company_name_exists){
            return res.status(400).send({
                msg: 'Ya existe un proveedor con esa razón social.',
                success: false
            });
        }

        let provider = await createProvider({
            name, 
            company_name, 
            address
        });

        if(provider){     
            return res.status(200).send({
                msg: 'Proveedor creado correctamente', 
                provider, 
                success: true 
            });
        }else{
            return res.status(400).send({
                msg: 'Proveedor no creado',
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

const editProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0]?.msg,
            success: false
        })
    }

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
            success: false
        })
    }

    Object.keys(req.body).forEach(function(key) {
        if (req.body[key] == 'null' || req.body[key] == 'undefined') {
            req.body[key] = null;
        }
    });

    const {
        id, 
        name, 
        company_name, 
        address
    } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.user;

        let provider_name_exists = await getProviderByName(name);

        if(provider_name_exists){
            if(provider_name_exists.id != id){
                return res.status(400).send({
                    msg: 'Ya existe un proveedor con ese nombre.',
                    success: false
                });
            }
        }

        let provider_company_name_exists = await getProviderByCompanyName(company_name);

        if(provider_company_name_exists){
            if(provider_company_name_exists.id != id){
                return res.status(400).send({
                    msg: 'Ya existe un proveedor con esa razón social.',
                    success: false
                });
            }
        }

        let provider = await updateProvider(id, { 
            name, 
            company_name, 
            address
        });

        if(provider){
            return res.status(200).send({
                msg: 'Proveedor editado correctamente.',
                provider, 
                success: true 
            });
        }else{
            return res.status(400).send({
                msg: 'Proveedor no editado.',
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

const deleteProvider = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: errors.array()[0]?.msg,
            success: false
        })
    }

    const token = req.header('x-auth-token');
    if (!token) {
        return res.status(500).json({
            msg: 'Algo salió mal, inténtalo más tarde.',
            success: false
        })
    }

    Object.keys(req.body).forEach(function(key) {
        if (req.body[key] == 'null' || req.body[key] == 'undefined') {
            req.body[key] = null;
        }
    });

    const {
        id
    } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = decoded.user;

        let provider = await removeProvider(id);

        if(provider){ 
            return res.status(200).send({
                msg: 'Proveedor eliminado correctamente',
                success: true 
            });
        }else{
            return res.status(400).send({
                msg: 'Proveedor no eliminado',
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

module.exports = {
    getListProvidersValidation, 
    addProviderValidation, 
    editProviderValidation, 
    deleteProviderValidation, 

    getListProviders, 
    addProvider, 
    editProvider, 
    deleteProvider
};