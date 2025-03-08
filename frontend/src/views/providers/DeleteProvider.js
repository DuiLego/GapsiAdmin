import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { deleteProvider } from '../../actions/providers';

const DeleteProvider = ({ provider, restablishProvider }) => {

    const dispatch =  useDispatch();

    const [deleteModal, setDeleteModal] = useState(false);
    const [statusProcesar, setStatusProcesar] = useState(false);

    /* Delete provider */
    const handleProcess = async () => {
        await setStatusProcesar(true);
        await dispatch(deleteProvider(provider?.id));
        await handleClose();
        await setStatusProcesar(false);
    }

    const handleClose = () => {
        if(!statusProcesar){
            restablishProvider(null);
            setDeleteModal(false);
        }
    }

    useEffect(() => {
        if(provider){
            setDeleteModal(true);
        }
    }, [provider]);

    useEffect(() => {
        if (deleteModal) {
            const backdrop = document.createElement('div');
            backdrop.classList.add('modal-backdrop', 'fade', 'show');
            document.body.appendChild(backdrop);

            return () => {
                document.body.removeChild(backdrop);
            };
        }
    }, [deleteModal]);

    return (
        <div className={`modal fade ${deleteModal ? 'show' : ''}`} style={{ display: deleteModal ? 'block' : 'none' }} tabIndex="-1" aria-hidden={!deleteModal}>
            <div className="modal-dialog modal-md modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Eliminar proveedor</h5>
                        <button type="button" className="btn-close" onClick={() => handleClose()}></button>
                    </div>
                    
                    <div className="modal-body">
                        <p>¿Deseas eliminar el proveedir <b>"{provider?.name}"</b>?</p>
                    </div>
                    
                    <div className="modal-footer">
                        <button type="button" className="btn btn-danger mr-3" onClick={() => handleClose()} disabled={ statusProcesar }><i className="fas fa-times fa-sm"></i> No</button>
                        {
                            statusProcesar ?
                                <button type="button" className="btn btn-success" disabled><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Si</button>
                            :
                                <button type="button" className="btn btn-success" onClick={() => handleProcess()}><i className="fas fa-check fa-sm"></i> Si</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteProvider;