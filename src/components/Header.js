import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,

} from 'mdb-react-ui-kit';
import logo from '../../src/assets/logomisa.svg'
import { useSelector, useDispatch } from 'react-redux'
import { logout, setUser } from '../redux/slices/authSlice';
import { jwtDecode } from "jwt-decode";
import { message } from 'antd'
import { fetchAllcategory } from "../redux/slices/categorySlice";

const Header = (props) => {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const handleNavigate = (navi) => {
        navigate(navi);
    }
    const listCategory = useSelector((state) => state.category.listCategory);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [openBasic, setOpenBasic] = useState(false);
    const user = useSelector((state) => state.auth.user)
    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
    }
    useEffect(
        () => {

            dispatch(fetchAllcategory())

        }
        , [])

    useEffect(
        () => {
            const token = localStorage.getItem('jwt');
            if (!token) {
                return
            }
            const decoded = jwtDecode(token);
            if (decoded && !user) {
                try {


                    dispatch(setUser({
                        id: decoded.id,
                        username: decoded.username,
                        email: decoded.email,
                    }));
                } catch (error) {
                    console.error("Invalid token", error);
                }
            }

        }
    )


    return (
        <>

            <MDBNavbar
                expand="xl"
                light
                sticky
                className="shadow-sm"
                style={{
                    height: "auto",
                    zIndex: 1000,
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    borderBottom: "1px solid #dee2e6",
                    padding: "10px 30px",
                }}
            >
                <MDBContainer fluid className="d-flex justify-content-between align-items-center" style={{ maxWidth: "1200px" }}>
                    <MDBNavbarBrand className="d-flex align-items-center" style={{ padding: "0", cursor: "pointer" }} onClick={() => handleNavigate("/")}>
                        <img src={logo} alt="Logo" style={{ maxHeight: "80px", objectFit: "contain", marginRight: "15px" }} />
                    </MDBNavbarBrand>

                    <MDBNavbarToggler aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle Header" onClick={() => setOpenBasic(!openBasic)}>
                        <MDBIcon icon="bars" fas />
                    </MDBNavbarToggler>

                    <MDBCollapse navbar open={openBasic} className="justify-content-end">
                        <form className="input-group w-auto d-none d-xl-flex" style={{ width: "350px" }}>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm sản phẩm..."
                                aria-label="Search"
                                style={{ borderRadius: "50px", padding: "10px", boxShadow: "0px 4px 8px rgba(0,0,0,0.1)" }}
                            />
                            <MDBBtn outline rounded className="mx-2" color="secondary" type="button" style={{ borderRadius: "50px" }}>
                                <MDBIcon fas icon="search" />
                            </MDBBtn>
                        </form>

                        <MDBNavbarNav className="mb-2 mb-lg-0">
                            <MDBNavbarItem>
                                <MDBNavbarLink onClick={() => handleNavigate("/")} style={{ padding: "10px 20px", fontSize: "16px", color: "#000", cursor: "pointer" }}>
                                    Trang chủ
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink onClick={() => handleNavigate("/shop")} style={{ padding: "10px 20px", fontSize: "16px", color: "#000", cursor: "pointer" }}>
                                    Cửa hàng
                                </MDBNavbarLink>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{ padding: "10px 20px", fontSize: "16px", color: "#000", cursor: "pointer" }}>
                                        Thông tin
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>
                                            <MDBNavbarLink onClick={() => handleNavigate("/size")} style={{ padding: "10px 20px" }}>
                                                Hướng dẫn đo size
                                            </MDBNavbarLink>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link>
                                            <MDBNavbarLink onClick={() => handleNavigate("/preserve")} style={{ padding: "10px 20px" }}>
                                                Bảo hành và bảo quản
                                            </MDBNavbarLink>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{ padding: "10px 20px", fontSize: "16px", color: "#000" }}>
                                        Liên hệ
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        <MDBDropdownItem link>
                                            <MDBNavbarLink onClick={() => handleNavigate("/recruitment")} style={{ padding: "10px 20px" }}>
                                                Tuyển dụng
                                            </MDBNavbarLink>
                                        </MDBDropdownItem>
                                        <MDBDropdownItem link>
                                            <MDBNavbarLink onClick={() => handleNavigate("/connect")} style={{ padding: "10px 20px" }}>
                                                Hợp tác truyền thông
                                            </MDBNavbarLink>
                                        </MDBDropdownItem>
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>

                    <MDBCollapse navbar open={openBasic} className="justify-content-end">
                        <MDBNavbarNav className="mb-2 mb-lg-0">
                            <MDBNavbarItem>
                                <MDBDropdown>
                                    <MDBDropdownToggle tag="a" className="nav-link" role="button" style={{ padding: "10px 20px", fontSize: "16px", color: "#000" }}>
                                        <MDBIcon icon="user" fas /> {user ? user.username : "Tài khoản"}
                                    </MDBDropdownToggle>
                                    <MDBDropdownMenu>
                                        {user ? (
                                            <>
                                                <MDBDropdownItem link>
                                                    <MDBNavbarLink onClick={() => handleNavigate("/infor")} style={{ padding: "10px 20px" }}>
                                                        <b>Thông tin</b>
                                                    </MDBNavbarLink>
                                                </MDBDropdownItem>
                                                <MDBDropdownItem divider />
                                                <MDBDropdownItem>
                                                    <MDBNavbarLink onClick={() => handleLogout()} style={{ padding: "10px 20px", cursor: "pointer" }}>
                                                        <MDBIcon icon="sign-out-alt" fas style={{ verticalAlign: "middle", color: "red" }} />
                                                        &nbsp;<b>Đăng xuất</b>
                                                    </MDBNavbarLink>
                                                </MDBDropdownItem>
                                            </>
                                        ) : (
                                            <>
                                                <MDBDropdownItem>
                                                    <MDBNavbarLink onClick={() => handleNavigate("/login")} style={{ padding: "10px 20px", cursor: "pointer" }}>
                                                        <b>Đăng nhập</b>
                                                    </MDBNavbarLink>
                                                </MDBDropdownItem>
                                                <MDBDropdownItem>
                                                    <MDBNavbarLink onClick={() => handleNavigate("/register")} style={{ padding: "10px 20px", cursor: "pointer" }}>
                                                        <b>Đăng ký</b>
                                                    </MDBNavbarLink>
                                                </MDBDropdownItem>
                                            </>
                                        )}
                                    </MDBDropdownMenu>
                                </MDBDropdown>
                            </MDBNavbarItem>

                            <MDBNavbarItem>
                                <MDBNavbarLink onClick={() => handleNavigate("/cart")} style={{ padding: "10px 20px", fontSize: "16px", color: "#000" }}>
                                    <MDBIcon icon="shopping-cart" fas />
                                    <span className="badge rounded-pill badge-notification bg-danger">
                                        {cartItems.length}
                                    </span>
                                </MDBNavbarLink>
                            </MDBNavbarItem>
                        </MDBNavbarNav>
                    </MDBCollapse>
                </MDBContainer>
            </MDBNavbar>



        </>
    );


}

export default Header;