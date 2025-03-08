import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setAlert } from '../../actions/alert';
import { editProvider } from '../../actions/providers';

const EditProvider = ({ provider, restablishProvider }) => {

    const dispatch =  useDispatch();

    const [editModal, setEditModal] = useState(false);
    const [statusProcesar, setStatusProcesar] = useState(false);

    const [providerData, setProviderData] = useState({
        id: '',  
        name: '',  
        company_name: '',  
        address: ''
    });

    /* Edit provider */
    const handleInputChange = ({ target }) => {
        setProviderData({
            ...providerData,
            [target.name]: target.value
        });
    }

    const handleProccess = async () => {
        if(providerData.name && providerData.company_name && providerData.address){
            await setStatusProcesar(true);
            await dispatch(editProvider(providerData));
            await handleClose();
            await setStatusProcesar(false);
        } else {
            await dispatch(setAlert('El nombre, razón social y dirección son requeridos', 'danger'));
        }
    }

    const handleClose = () => {
        if(!statusProcesar){
            setProviderData({
                id: '',  
                name: '',  
                company_name: '',  
                address: ''
            });

            setEditModal(false);
            restablishProvider(null);
        }
    }

    useEffect(() => {
        if(provider){
            setEditModal(true);

            setProviderData({
                ...providerData, 
                id: provider.id, 
                name: provider.name, 
                company_name: provider.company_name, 
                address: provider.address
            });
        }        
    }, [provider]);

    useEffect(() => {
        if (editModal) {
            const backdrop = document.createElement('div');
            backdrop.classList.add('modal-backdrop', 'fade', 'show');
            document.body.appendChild(backdrop);

            return () => {
                document.body.removeChild(backdrop);
            };
        }
    }, [editModal]);

    return (
        <div className={`modal fade ${editModal ? 'show' : ''}`} style={{ display: editModal ? 'block' : 'none' }} tabIndex="-1" aria-hidden={!editModal}>
            <div className="modal-dialog modal-xl modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Editar proveedor</h5>
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
                                <button type="button" className="btn btn-success" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Editar</button>
                            :
                                <button type="button" className="btn btn-success" onClick={() => handleProccess()}><i className="fas fa-check fa-sm"></i> Editar</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProvider;
