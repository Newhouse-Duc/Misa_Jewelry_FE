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

            <section className="ftco-section" style={{ paddingTop: '50px' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-xl-10 ftco-animate">
                            <form className="billing form">
                                <h3 className="mb-4 billing-heading">Giỏ hàng</h3>
                                <hr />
                                <div className="table cart" style={{ overflowX: 'auto' }}>
                                    <table className="table table-responsive bg-body-tertiary mb-3">
                                        <thead>
                                            <tr className="text-center">
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
                                                    <td colSpan="6" className="text-center">
                                                        <p>Bạn chưa có sản phẩm nào trong giỏ hàng</p>
                                                        <MDBBtn outline className="btn-lg w-50 text-dark" color="success" type="button" onClick={() => navigate('/shop')}>
                                                            Mua sắm ngay
                                                        </MDBBtn>
                                                    </td>
                                                </tr>
                                            ) : (
                                                cartItems.map((item) => (
                                                    <tr className="text-center align-middle" key={item.id}>
                                                        <td>
                                                            <i className="bi bi-x-square-fill" onClick={() => handleremovecart(item.id)}></i>
                                                        </td>
                                                        <td>
                                                            <img src={item.img} alt="Sản phẩm" className="img-thumbnail" style={{ width: "100px", height: "auto" }} />
                                                        </td>
                                                        <td>{item.name}</td>
                                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.price)}</td>
                                                        <td>
                                                            <div className="d-flex justify-content-center align-items-center">
                                                                <button type="button" className="btn btn-outline-secondary" onClick={() => handleIncrease(item.id)}>
                                                                    <i className="bi bi-plus-circle"></i>
                                                                </button>
                                                                <span className="mx-2">{item.quantity}</span>
                                                                <button type="button" className="btn btn-outline-secondary" onClick={() => handleDecrease(item.id)}>
                                                                    <i className="bi bi-dash-circle"></i>
                                                                </button>
                                                            </div>
                                                        </td>
                                                        <td>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}</td>
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
                                    <form className="billing form">
                                        <h4>Tổng tiền giỏ hàng</h4>
                                        <hr />
                                        <p>Tổng tiền: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</p>
                                    </form>
                                    <br />
                                    <MDBBtn outline className="btn-lg w-100 text-dark" color="dark" type="button" onClick={handleCheckout}>
                                        Thanh toán
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

