
import React from 'react';
import { useSelector } from 'react-redux';

const Loader = () => {
    const loader = useSelector(state => state.loader);

    return (
        loader && 
            <div className="loader_container">
                <div className="text-center">
                    <img className="d-inline-block my-4" alt="logo" width="150" src={process.env.REACT_APP_PUBLIC_ROUTE + '/assets/images/logoBlanco.png'}/>
                </div>
            </div>
    )
}

export default Loader;
