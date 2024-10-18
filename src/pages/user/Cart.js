import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MDBBtn } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
import { authSlice } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

import { increasequantity, decreasequantity, removeFromCart } from "../../redux/slices/cartSlices";
import { message } from 'antd';
const Cart = (props) => {

    const dispatch = useDispatch();
    let navigate = useNavigate();
    const user = useSelector((state) => state.auth.user)
    const cartItems = useSelector((state) => state.cart.cartItems);
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const handleCheckout = () => {
        if (cartItems.length === 0) {
            message.warning("bạn không có sản phẩm nào trong giỏ hàng hãy mua sắm nhé ")
            navigate('/shop')
            return;
        }
        if (!user) {
            message.warning("hãy đăng nhập để đặt hàng và thanh tóan")
            navigate('/login');
            return;
        }
        navigate('/checkout');

    }




    const handleIncrease = (itemId) => {
        dispatch(increasequantity(itemId));
    }

    const handleDecrease = (itemId) => {
        dispatch(decreasequantity(itemId));
    }
    const handleremovecart = (itemId) => {
        dispatch(removeFromCart(itemId))
    }
    return (
        <>
            <Header />

            <section className="ftco-section" style={{ paddingTop: '50px', paddingBottom: '50px', backgroundColor: '#f9f9f9' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 col-lg-12 ftco-animate">
                            <form className="billing form bg-white p-5 shadow-sm rounded">
                                <h3 className="mb-4 billing-heading text-dark" style={{ fontWeight: '600', fontSize: '24px', textAlign: 'center' }}>Giỏ hàng</h3>
                                <hr />
                                <div className="table-responsive" style={{ overflowX: 'auto' }}>
                                    <table className="table table-borderless text-center">
                                        <thead className="bg-light">
                                            <tr>
                                                <th>&nbsp;</th>
                                                <th><strong>Ảnh</strong></th>
                                                <th><strong>Tên sản phẩm</strong></th>
                                                <th><strong>Giá</strong></th>
                                                <th><strong>Số lượng</strong></th>
                                                <th><strong>Tổng</strong></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {cartItems.length === 0 ? (
                                                <tr>
                                                    <td colSpan="6" className="text-center p-5">
                                                        <p className="mb-4" style={{ fontSize: '18px', color: '#6c757d' }}>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                                                        <MDBBtn className="btn-lg w-50 text-light" color="success" type="button" onClick={() => navigate('/shop')}>
                                                            Mua sắm ngay
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ) : (
                                                cartItems.map((item) => (
                                                    <tr key={item.id} className="align-middle">
                                                        <td>
                                                            <i className="bi bi-x-square-fill" onClick={() => handleremovecart(item.id)} style={{ color: '#dc3545', cursor: 'pointer' }}></i>
                                                        </td>
                                                        <td>
                                                            <img src={item.img} alt="Sản phẩm" className="img-thumbnail rounded" style={{ width: "80px", height: "auto" }} />
                                                        </td>
                                                        <td style={{ fontWeight: '500', fontSize: '16px' }}>{item.name}</td>
                                                        <td style={{ color: '#007bff', fontWeight: 'bold' }}>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}
                                                        </td>
                                                        <td>
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleIncrease(item.id)}>
                                                                    <i className="bi bi-plus-circle"></i>
                                                                </button>
                                                                <span className="mx-2" style={{ fontSize: '16px' }}>{item.quantity}</span>
                                                                <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => handleDecrease(item.id)}>
                                                                    <i className="bi bi-dash-circle"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td style={{ color: '#28a745', fontWeight: 'bold' }}>
                                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}
                                                        </td>
                                                    </tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </form>
                            <br />
                            <div className="row justify-content-end">
                                <div className="col-xl-5 col-lg-6 ftco-animate">
                                    <div className="billing form bg-white p-4 shadow-sm rounded">
                                        <h4 className="text-dark" style={{ fontWeight: '600', fontSize: '20px' }}>Tổng tiền giỏ hàng</h4>
                                        <hr />
                                        <p style={{ fontSize: '18px', fontWeight: '500' }}>Tổng tiền: <span style={{ color: '#28a745' }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</span></p>
                                    </div>
                                    <br />
                                    <MDBBtn className="btn-lg w-100 text-light" color="dark" type="button" onClick={handleCheckout}>
                                        Đặt hàng
                                    </MDBBtn>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            <Footer />
        </>
    );
}


export default Cart;

