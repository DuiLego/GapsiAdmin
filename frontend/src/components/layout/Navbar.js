import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';

import { logout } from '../../actions/home';

const Navbar = () => {

    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-primary">
            <div className="container-fluid">
                <div className="w-100">
                    <Link className='navbar-brand' to='/providers'>
                        <img src={process.env.REACT_APP_PUBLIC_ROUTE + '/assets/images/logoBlanco.png'} alt="logo" height="35" style={{ marginRight: '0.5rem', verticalAlign: 'baseline' }} />
                    </Link>
                    <button className="navbar-toggler float-end" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                </div>
                <div className="collapse navbar-collapse d-lg-flex justify-content-lg-center px-3" id="navbarNavDropdown">
                    <ul className="navbar-nav text-right">
                        <li className="nav-item">
                            <NavLink className="nav-link text-white" to='/providers'>Proveedores</NavLink>
                        </li>

                        <li className="nav-item dropdown mr-3">
                            <a className="nav-link text-white dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Configuración
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                <li><a className="dropdown-item" onClick={handleLogout} href="/">Cerrar sesión</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar;