import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DataTable from 'react-data-table-component';

import { findProviders } from '../../actions/providers';

import AddProvider from './AddProvider';
import EditProvider from './EditProvider';
import DeleteProvider from './DeleteProvider';

const Providers = () => {

    const dispatch =  useDispatch();

    const { list, pages, currentPage } = useSelector(state => state.providers);

    const [providers, setProviders] = useState([]);
    const [pageNumbers, setPageNumbers] = useState([]);

    const [providerAdd, setProviderAdd] = useState(null);
    const [providerEdit, setProviderEdit] = useState(null);
    const [providerDelete, setProviderDelete] = useState(null);

    const columns = [
        {
            name: 'Nombre',
            cell: row => row.name || 'Sin definir'
        },
        {
            name: 'Razón social',
            cell: row => row.company_name || 'Sin definir'
        },
        {
            name: 'Dirección',
            cell: row => row.address || 'Sin definir',
            grow: 1.5
        }, 
        {
            name: '',
            cell: row => {
                return(
                    <div className="text-right w-100">
                        <button type="button" className="btn btn-sm btn-link px-2 float-end" onClick={() => handleDeleteProvider(row)}><i className="fas fa-trash text-danger"></i></button>
                        <button type="button" className="btn btn-sm btn-link px-2 float-end" onClick={() => handleEditProvider(row)}><i className="fas fa-edit text-primary"></i></button>
                    </div>
                )
            }
        }
    ];

    /* Add provider */
    const handleAddProvider = (provider) => {
        setProviderEdit(null)
        setProviderDelete(null);

        setProviderAdd(provider);       
    }

    /* Edit provider */
    const handleEditProvider = (provider) => {
        setProviderAdd(null)
        setProviderDelete(null);

        setProviderEdit(provider);
    }

    /* Delete provider */
    const handleDeleteProvider = (provider) => {
        setProviderAdd(null)
        setProviderEdit(null);

        setProviderDelete(provider);
    }

    const handlePageClick = (page) => {
        if(page >= 1 && page <= pages) {
            dispatch(findProviders({
                page
            }));
        }
    };

    useEffect(() => {
        dispatch(findProviders({
            page: 1
        }));
    }, []);

    useEffect(() => {
        setProviders(list);
    }, [list]);

    useEffect(() => {
        let page_numbers = [];

        for (let i = 1; i <= pages; i++) {
            page_numbers.push(i);
        }

        setPageNumbers(page_numbers);
    }, [pages]);
        
    return (
        <Fragment>
            <AddProvider provider={providerAdd} restablishProvider={handleAddProvider} />
            <EditProvider provider={providerEdit} restablishProvider={handleEditProvider} />
            <DeleteProvider provider={providerDelete} restablishProvider={handleDeleteProvider} />

            <div className="row mx-0">
                <div className="col-md-12 px-4 pb-4">
                    <h3 className="mb-3 mt-5">Administración de proveedores</h3>

                    <div className="d-flex justify-content-end">
                        <button type="button" className="btn btn-secondary mx-1">Filtros de búsqueda</button>
                        <button type="button" className="btn btn-primary mx-1" onClick={() => handleAddProvider({ })}>Agregar proveedor</button>
                    </div>

                    <div className="mt-5">
                        {
                            providers.length > 0 ?
                                <>
                                    <DataTable 
                                        columns={columns}
                                        data={providers}
                                        highlightOnHover={true}
                                    />
                                    <nav className="mt-3">
                                        <ul className="pagination justify-content-center">
                                            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageClick(currentPage - 1)}>&laquo;</button>
                                            </li>

                                            {
                                                pageNumbers?.map((page) => (
                                                    <li key={page} className={`page-item ${currentPage === page ? 'active' : ''}`}>
                                                        <button className="page-link" onClick={() => handlePageClick(page)}>
                                                        {page}
                                                        </button>
                                                    </li>
                                                ))
                                            }

                                            <li className={`page-item ${currentPage === pages ? 'disabled' : ''}`}>
                                                <button className="page-link" onClick={() => handlePageClick(currentPage + 1)}>&raquo;</button>
                                            </li>
                                        </ul>
                                    </nav>
                                </>
                            :
                                <p className="text-center">Aún no hay proveedores registrados, comienza agregando uno.</p>
                        }
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Providers;