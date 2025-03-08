import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';

import Navbar from './Navbar';

const Layout = () => {

    const { isAuthenticated } = useSelector(state => state.home);

    const layoutAdmin = (
        <Fragment>
            <Navbar></Navbar>
        </Fragment>
    );

    const layoutGuest = (<Fragment></Fragment>);

    if(isAuthenticated){
        return layoutAdmin;
    } else{
        return layoutGuest;
    }
}

export default Layout;