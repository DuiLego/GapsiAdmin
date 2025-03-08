import React, { useState, useEffect, createRef, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setAlert } from '../../actions/alert';
import { login, signup } from '../../actions/home';

const Login = () => {

    const dispatch = useDispatch();

    const { isAuthenticated, user } = useSelector(state => state.home);

    const [loginData, setLoginData] = useState({
        username: null
    });

    const [signupData, setSignupData] = useState({
        username: null,
        name: null, 
        image: process.env.REACT_APP_PUBLIC_ROUTE + '/assets/images/logo.png'
    });

    const [profilePicture, setProfilePicture] = useState({
        img: undefined
    });

    let img = createRef();

    /* Login */
    const submitLogin = () => {
        dispatch(login(loginData));
    }

    /* Signup */
    const handleChangeImg = () => {
        setProfilePicture({
            ...profilePicture, 
            img: img.current.files[0]
        });
    }

    const onChange = (e) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }

    const submitSignup = async () => {
        if(signupData.name && signupData.username){
            let formData = new FormData();

            formData.append('name', signupData.name);
            formData.append('username', signupData.username);
            formData.append('image', profilePicture.img);

            await dispatch(signup(formData));
        }else{
            await dispatch(setAlert('El nombre y usuario son obligatorios', 'danger'));
        }
    }

    useEffect(() => {
        if(user){
            setLoginData({
                ...loginData, 
                username: user.username
            });
        }
    }, [user]);

    useEffect(() => {
        if(isAuthenticated){
            window.location.href = '/providers';
        }
    }, [isAuthenticated]);

    return (
        <Fragment>
            <div className="row mx-0">
                {
                    user ?
                        <div className="col-md-6 offset-md-3 centrado-vertical">
                            <div className="card bg-light">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-12 form-group text-center my-3">
                                            <label className="contenedor_imagen_perfil">
                                                <div className="contenedor_imagen">
                                                    <img id="imagen_perfil" src={ user?.image || process.env.REACT_APP_PUBLIC_ROUTE + '/assets/images/logo.png' }/>
                                                </div>
                                            </label>
                                        </div>

                                        <div className="col-md-12 text-center mb-3">
                                            <h5 className="card-title">Bienvenido {user?.name}</h5>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group mt-3 text-center">
                                                <button type="button" className="btn btn-primary" onClick={() => submitLogin()}>Continuar</button>
                                            </div>
                                        </div>

                                        <div className="col-md-12 pt-4">
                                            <div className="mt-3 text-end">
                                                <p>versión {user?.version}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    :
                        <div className="col-md-6 offset-md-3 centrado-vertical">
                            <div className="card bg-light"> 
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-12 text-center my-3">
                                            <h5 className="card-title">Crea tu cuenta para ingresar</h5>
                                        </div>

                                        <div className="col-12 form-group text-center my-3">
                                            <label htmlFor="photo-upload" className="custom-file-upload fas">
                                                <div className="img-wrap img-upload">
                                                    <img id="img-photo" htmlFor="photo-upload" src={profilePicture.img != null ? URL.createObjectURL(profilePicture.img) : signupData.image}/>
                                                </div>
                                                <input id="photo-upload" type="file" accept="image/*" ref={img} onChange={handleChangeImg}/> 
                                            </label>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" placeholder="Nombre" id="name" name="name" value={signupData.name || ''} onChange={e => onChange(e)}></input>
                                                    <label htmlFor="name">Nombre</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-6">
                                            <div className="input-group mb-3">
                                                <div className="form-floating">
                                                    <input type="text" className="form-control" placeholder="Usuario" id="username" name="username" value={signupData.username || ''} onChange={e => onChange(e)}></input>
                                                    <label htmlFor="username">Usuario</label>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-md-12">
                                            <div className="form-group mt-3 text-center">
                                                <button type="button" className="btn btn-primary" onClick={() => submitSignup()}>Regístrate</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                }
            </div>
        </Fragment>
    )
}

export default Login;