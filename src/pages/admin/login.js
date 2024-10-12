import React, { useEffect, useState } from 'react';



import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';

import { AdminLogin } from '../../redux/slices/authSlice';
const LoginAdmin = (props) => {

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const admin = useSelector((state) => state.auth.admin)
    const handleLogin = async () => {


        if (!valueLogin) {
            toast.error("thieu tai khoan dang nhap ")
            return;
        }

        if (!password) {
            toast.error("thieu mat khau")
            return;
        }
        dispatch(AdminLogin({ valueLogin, password }));

    }

    useEffect(
        () => {
            if (admin) {

                navigate("/admin/dashboard");
            }
        },
        [admin, navigate]
    )
    return (
        <>

            <div className="bg-image"
                style={{ backgroundImage: 'url(https://mdbootstrap.com/img/Photos/Others/images/76.jpg)', height: '100vh', position: 'relative' }}>

                <div className="overlay" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    zIndex: 1
                }}></div>

                <div className='row d-flex justify-content-center align-items-center min-vh-100' style={{ position: 'relative', zIndex: 2 }}>

                    <div className='col-lg-4'>
                        <h1 className="text-center text-white mb-4"><b>ADMIN</b></h1>
                        <form className='mb-4' style={{
                            border: '2px solid white',
                            borderRadius: '15px',
                            padding: '20px',
                            backdropFilter: "blur(5px)",
                            background: 'rgba(255, 255, 255, 0.1)',
                        }}>
                            <div className="form-group mb-4">
                                <label htmlFor="username" className='text-white'><b>Username</b></label>
                                <div className="d-flex align-items-center" style={{ borderBottom: "2px solid white" }}>
                                    <MDBIcon icon="user" className="text-white me-2" size="lg" />
                                    <input
                                        type="text"
                                        required
                                        className="form-control"
                                        style={{
                                            background: "none",
                                            padding: ".8rem 0",
                                            border: 'none',
                                            color: 'white',
                                            outline: 'none',
                                        }}
                                        value={valueLogin}
                                        onChange={(event) => { setValueLogin(event.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="password" className='text-white'><b>Password</b></label>
                                <div className="d-flex align-items-center" style={{ borderBottom: "2px solid white" }}>
                                    <MDBIcon icon="lock" className="text-white me-2" size="lg" />
                                    <input
                                        type="password"
                                        required
                                        className="form-control"
                                        style={{
                                            background: "none",
                                            padding: ".8rem 0",
                                            border: 'none',
                                            color: 'white',
                                            outline: 'none',
                                        }}
                                        value={password}
                                        onChange={(event) => { setPassword(event.target.value) }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <MDBBtn outline rounded className='mx-2' type='button' color='light' style={{
                                    width: '80%',
                                    transition: 'background-color 0.3s ease',
                                }} onClick={() => { handleLogin() }} onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}>
                                    <b>Đăng nhập</b>
                                </MDBBtn>
                            </div>
                        </form>
                    </div>
                </div>
            </div>





        </>
    );
}

export default LoginAdmin;

