const dotenv = require('dotenv').config();
const fs = require('fs');
const path = require('path');

const createDirectory = async (params) => {
    try {
        await fs.mkdirSync(params.path, { recursive: true });
        
        return params.path;
    } catch(error) {
        console.log(error);
        return null;
    }
}

const uploadFile = async (params) => {
    try {
        await fs.promises.writeFile(params.path, params.body);

        return params.path;
    } catch(error) {
        console.log(error);
        return null;
    }
}

const getURL = async (params) => {
    try {
        if(params.exact){
            await fs.promises.access(params.path, fs.constants.F_OK);

            return process.env.API_PUBLIC_ROUTE + '/' + params.path;
        }else{
            let files = await fs.promises.readdir(params.path);

            let archivos_filtrados = await files.filter(file => {
                let nombre = path.parse(file).name;
                return nombre.startsWith(params.file);
            });

            if (archivos_filtrados.length > 0) {
                let primer_archivo = archivos_filtrados[0];
                let ruta_archivo = path.join(params.path, primer_archivo);

                return process.env.API_PUBLIC_ROUTE + '/' + ruta_archivo;
            } else {
                return null;
            }
        }
        
    } catch(error) {
        return null;
    }
}

const deleteFile = async (params) => {
    try {
        if(params.exact){
            await fs.promises.unlink(params.path);
            
            return params.path;
        }else{
            let files = await fs.promises.readdir(params.path);

            let archivos_filtrados = await files.filter(file => {
                let nombre = path.parse(file).name;
                return nombre.startsWith(params.file);
            });

            if (archivos_filtrados.length > 0) {
                let primer_archivo = archivos_filtrados[0];
                let ruta_archivo = path.join(params.path, primer_archivo);

                await fs.promises.unlink(ruta_archivo);

                return ruta_archivo;
            } else {
                return null;
            }
        }
    } catch(error) {
        return null;
    }
}

module.exports = {
    createDirectory, uploadFile, getURL, deleteFile
}