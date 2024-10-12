import React, { useEffect, useState } from 'react';

import { useNavigate } from "react-router-dom";

import { toast } from 'react-toastify';
import { Link, NavLink } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { MDBBtn } from 'mdb-react-ui-kit';
import { userRegister } from '../../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';
const Register = (props) => {

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [re_password, setRe_password] = useState("");
    const dispatch = useDispatch();
    const isloading = useSelector((state) => state.auth.isloading);
    const defaultValidInput = {

        isvalidEmail: true,
        isvalidPhone: true,
        isvalidPassword: true,
        isvalidUsername: true,
        isvalidre_password: true


    }
    const [objCheckinput, setobjCheckinput] = useState(defaultValidInput)



    let navigate = useNavigate();



    const isValidInput = () => {

        setobjCheckinput(defaultValidInput);



        if (!email) {
            toast.error("thiếu email")
            setobjCheckinput({ ...defaultValidInput, isvalidEmail: false });
            return false;
        }

        let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailregex.test(email)) {
            setobjCheckinput({ ...defaultValidInput, isvalidEmail: false });
            toast.error(" email không hợp lệ");
            return false
        }

        if (!phone) {
            toast.error("required phone");
            setobjCheckinput({ ...defaultValidInput, isvalidPhone: false });
            return false;
        }
        let phoneregex = /^(?:0|\+84)(?:1[0-9]|9[0-9]|[2-8][0-9])\d{7}$/;
        if (!phoneregex.test(phone)) {
            setobjCheckinput({ ...defaultValidInput, isvalidPhone: false });
            toast.error("số điện thoại không hợp lệ");
            return false
        }
        if (!password) {
            toast.error("nhập password")
            setobjCheckinput({ ...defaultValidInput, isvalidPassword: false });
            return false;
        }
        if (!username) {
            toast.error("nhập tên người dùng")
            setobjCheckinput({ ...defaultValidInput, isvalidUsername: false });
            return false;
        }
        if (password != re_password) {
            toast.error("password không giống nhau");
            setobjCheckinput({ ...defaultValidInput, isvalidre_password: false });
            return false;
        }



        return true;

    }
    const handleRegister = async () => {
        if (isValidInput()) {
            await dispatch(userRegister({ username, email, phone, password }))
                .unwrap()
                .then(() => {
                    toast.success('Đăng ký thành công!');
                    navigate("/login");
                })
                .catch((error) => {
                    toast.error(error || 'Đăng ký thất bại!');
                });
        }



    }
    useEffect(() => {


    }, []);




    return (
        <>

            <Header />

            <div>
                <section style={{ padding: '4rem 0', backgroundColor: '#f4f4f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ maxWidth: '500px', width: '100%', padding: '2rem', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
                        <div className="content" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <h2 style={{ marginBottom: '1.5rem', fontWeight: 'bold', color: '#333' }}>Đăng kí</h2>

                            <div className="form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>


                                <div className="form-group">
                                    <label htmlFor="email" style={{ marginBottom: '0.5rem', color: '#555', fontSize: '1rem', fontWeight: '500' }}>Email</label>
                                    <div className="inputBox">
                                        <input
                                            type="text"
                                            id="email"
                                            className={objCheckinput.isvalidEmail ? 'form-control' : 'form-control is-invalid'}
                                            required
                                            value={email}
                                            onChange={(event) => setEmail(event.target.value)}

                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderRadius: '5px',
                                                border: objCheckinput.isvalidEmail ? '1px solid #ced4da' : '1px solid #dc3545',
                                                fontSize: '1rem',
                                                color: '#495057',
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease',
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="phone" style={{ marginBottom: '0.5rem', color: '#555', fontSize: '1rem', fontWeight: '500' }}>Số điện thoại</label>
                                    <div className="inputBox">
                                        <input
                                            type="text"
                                            id="phone"
                                            className={objCheckinput.isvalidPhone ? 'form-control' : 'form-control is-invalid'}
                                            required
                                            value={phone}
                                            onChange={(event) => setPhone(event.target.value)}

                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderRadius: '5px',
                                                border: objCheckinput.isvalidPhone ? '1px solid #ced4da' : '1px solid #dc3545',
                                                fontSize: '1rem',
                                                color: '#495057',
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease',
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="username" style={{ marginBottom: '0.5rem', color: '#555', fontSize: '1rem', fontWeight: '500' }}>Tên người dùng</label>
                                    <div className="inputBox">
                                        <input
                                            type="text"
                                            id="username"
                                            required
                                            value={username}
                                            onChange={(event) => setUsername(event.target.value)}

                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderRadius: '5px',
                                                border: objCheckinput.isvalidUsername ? '1px solid #ced4da' : '1px solid #dc3545',
                                                fontSize: '1rem',
                                                color: '#495057',
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease',
                                                width: '100%',
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="password" style={{ marginBottom: '0.5rem', color: '#555', fontSize: '1rem', fontWeight: '500' }}>Mật khẩu</label>
                                    <div className="inputBox">
                                        <input
                                            type="password"
                                            id="password"
                                            className={objCheckinput.isvalidPassword ? 'form-control' : 'form-control is-invalid'}
                                            required
                                            value={password}
                                            onChange={(event) => setPassword(event.target.value)}

                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderRadius: '5px',
                                                border: objCheckinput.isvalidPassword ? '1px solid #ced4da' : '1px solid #dc3545',
                                                fontSize: '1rem',
                                                color: '#495057',
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease',
                                            }}
                                        />
                                    </div>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="re_password" style={{ marginBottom: '0.5rem', color: '#555', fontSize: '1rem', fontWeight: '500' }}>Nhập lại mật khẩu</label>
                                    <div className="inputBox">
                                        <input
                                            type="password"
                                            id="re_password"
                                            className={objCheckinput.isvalidre_password ? 'form-control' : 'form-control is-invalid'}
                                            required
                                            value={re_password}
                                            onChange={(event) => setRe_password(event.target.value)}

                                            style={{
                                                padding: '0.75rem 1rem',
                                                borderRadius: '5px',
                                                border: objCheckinput.isvalidre_password ? '1px solid #ced4da' : '1px solid #dc3545',
                                                fontSize: '1rem',
                                                color: '#495057',
                                                outline: 'none',
                                                transition: 'border-color 0.3s ease',
                                            }}
                                        />
                                    </div>
                                </div>


                                <MDBBtn
                                    outline
                                    rounded
                                    color="success"
                                    type="button"
                                    onClick={handleRegister}
                                    style={{
                                        padding: '0.75rem',
                                        backgroundColor: '#28a745',
                                        color: '#fff',
                                        border: 'none',
                                        borderRadius: '5px',
                                        fontSize: '1.2rem',
                                        cursor: 'pointer',
                                        transition: 'background-color 0.3s ease',
                                    }}
                                    onMouseEnter={(e) => e.target.style.backgroundColor = '#218838'}
                                    onMouseLeave={(e) => e.target.style.backgroundColor = '#28a745'}
                                >
                                    Đăng kí
                                </MDBBtn>
                            </div>

                            <p style={{ marginTop: '1rem', textAlign: 'center', color: '#555' }}>
                                Bạn đã có tài khoản?{' '}
                                <NavLink to="/login" style={{ color: '#007bff', textDecoration: 'none' }}>
                                    Đăng nhập
                                </NavLink>
                            </p>
                        </div>
                    </div>
                </section>
            </div>


            <Footer />
        </>
    );
}

export default Register;