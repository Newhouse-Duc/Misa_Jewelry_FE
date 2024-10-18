import React, { useEffect, useState } from 'react';



import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { Link, NavLink } from 'react-router-dom';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import { MDBBtn } from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { userLogin } from '../../redux/slices/authSlice';

const Login = (props) => {

    let navigate = useNavigate();

    const [valueLogin, setValueLogin] = useState("");
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const user = useSelector((state) => state.auth.user);
    const isloading = useSelector((state) => state.auth.isLoading)



    const handlePressEnter = (event) => {
        if (event.code === 'Enter' && event.charCode === 13) {
            handleLogin();
        }
    }
    const handleLogin = async () => {
        if (!valueLogin) {
            toast.error("Thiếu tài khoản đăng nhập ")
            return;
        }
        if (!password) {
            toast.error("thiếu mật khẩu")
            return;
        }
        dispatch(userLogin({ valueLogin, password }));
        if (user) {
            navigate("/");
        }

    }
    useEffect(
        () => {
            if (user) {
                navigate("/");
            }
        }, [user, navigate]
    )

    return (
        <>
            <Header />





            <section style={{ padding: '4rem 0', backgroundColor: '#f8f9fa' }}>
                <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ maxWidth: '500px', width: '100%', padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                        <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h3 style={{ marginBottom: '1rem', fontWeight: 'bold', textAlign: 'center', color: '#333' }}>Đăng nhập</h3>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="Gmail" style={{ marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Email</label>
                                <input
                                    type="text"
                                    required
                                    value={valueLogin}
                                    onChange={(event) => setValueLogin(event.target.value)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '5px',
                                        border: '1px solid #ced4da',
                                        fontSize: '1rem',
                                        color: '#495057',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#80bdff'}
                                    onBlur={(e) => e.target.style.borderColor = '#ced4da'}
                                />
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label htmlFor="Password" style={{ marginBottom: '0.5rem', fontWeight: '500', color: '#555' }}>Mật khẩu</label>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                    onKeyPress={(event) => handlePressEnter(event)}
                                    style={{
                                        padding: '0.75rem 1rem',
                                        borderRadius: '5px',
                                        border: '1px solid #ced4da',
                                        fontSize: '1rem',
                                        color: '#495057',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease',
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#80bdff'}
                                    onBlur={(e) => e.target.style.borderColor = '#ced4da'}
                                />
                            </div>

                            <MDBBtn
                                type="button"
                                onClick={handleLogin}
                                style={{
                                    padding: '0.75rem',
                                    backgroundColor: '#28a745',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer',
                                    transition: 'background-color 0.3s ease',
                                    marginTop: '1rem',
                                    textAlign: 'center',
                                }}
                                onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                                onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                            >
                                Đăng nhập
                            </MDBBtn>
                        </form>

                        <p style={{ marginTop: '1rem', textAlign: 'center', color: '#555' }}>
                            Bạn chưa có tài khoản?{' '}
                            <NavLink to="/register" style={{ color: '#007bff', textDecoration: 'none' }}>
                                Đăng ký
                            </NavLink>
                        </p>
                    </div>
                </div>
            </section>

            <Footer />
        </>

    );
}

export default Login;