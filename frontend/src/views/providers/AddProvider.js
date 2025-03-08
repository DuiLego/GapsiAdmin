import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAlert } from '../../actions/alert';
import { addProvider } from '../../actions/providers';

const AddProvider = ({ provider, restablishProvider }) => {

    const dispatch =  useDispatch();

    const [addModal, setAddModal] = useState(false);
    const [statusProcesar, setStatusProcesar] = useState(false);

    const [providerData, setProviderData] = useState({
        name: '',  
        company_name: '',  
        address: ''
    });

    /* Add provider */
    const handleInputChange = ({ target }) => {
        setProviderData({
            ...providerData,
            [target.name]: target.value
        });
    }

    const handleProccess = async () => {
        if(providerData.name && providerData.company_name && providerData.address){
            await setStatusProcesar(true);
            await dispatch(addProvider(providerData));
            await handleClose();
            await setStatusProcesar(false);
        } else {
            await dispatch(setAlert('El nombre, razón social y dirección son requeridos', 'danger'));
        }
    }

    const handleClose = () => {
        if(!statusProcesar){
            setProviderData({
                name: '',  
                company_name: '',  
                address: ''
            });

            setAddModal(false);
            restablishProvider(null);
        }
    }

    useEffect(() => {
        if(provider){
            setAddModal(true);

            setProviderData({
                ...providerData
            });
        }        
    }, [provider]);

    useEffect(() => {
        if (addModal) {
            const backdrop = document.createElement('div');
            backdrop.classList.add('modal-backdrop', 'fade', 'show');
            document.body.appendChild(backdrop);

            return () => {
                document.body.removeChild(backdrop);
            };
        }
    }, [addModal]);

    return (
        <div className={`modal fade ${addModal ? 'show' : ''}`} style={{ display: addModal ? 'block' : 'none' }} tabIndex="-1" aria-hidden={!addModal}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Crear proveedor</h5>
                        <button type="button" className="btn-close" onClick={() => handleClose()}></button>
                    </div>
                    
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-6 form-group mb-2">
                                <div className="input-group">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" placeholder="Nombre" id="name" name="name" value={providerData.name} onChange={e => handleInputChange(e)} />
                                        <label htmlFor="name">Nombre</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 form-group mb-2">
                                <div className="input-group">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" placeholder="Razón social" id="company_name" name="company_name" value={providerData.company_name} onChange={e => handleInputChange(e)} />
                                        <label htmlFor="company_name">Razón social</label>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 form-group mb-2">
                                <div className="input-group">
                                    <div className="form-floating">
                                        <input type="text" className="form-control" placeholder="Dirección" id="address" name="address" value={providerData.address} onChange={e => handleInputChange(e)} />
                                        <label htmlFor="address">Dirección</label>
                                    </div>
                                </div>
                            </div>
                        </div>           
                    </div>
                    
                    <div className="modal-footer">
                        {
                            statusProcesar ? 
                                <button type="button" className="btn btn-success" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Agregar</button>
                            :
                                <button type="button" className="btn btn-success" onClick={() => handleProccess()}><i className="fas fa-check fa-sm"></i> Agregar</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProvider;
