import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { fetchMethodPayment } from "../../redux/slices/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { Radio, Card, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/slices/authSlice";
import { Order, OrderMomo } from "../../redux/slices/authSlice";
import { clearCart } from "../../redux/slices/cartSlices";
const Checkout = (props) => {

    const navigate = useNavigate();
    const { Title } = Typography;
    const totalAmount = useSelector((state) => state.cart.totalAmount);
    const [selectedValue, setSelectedValue] = useState('');
    const cartItems = useSelector((state) => state.cart.cartItems);

    const user = useSelector((state) => state.auth.user)
    const handleChange = (e) => {
        setSelectedValue(e.target.value);
    };
    const dispatch = useDispatch();
    const listpayment = useSelector((state) => state.auth.listpayment);

    useEffect(() => {
        const token = localStorage.getItem('jwt');

        if (!token) {
            message.warning("hãy đăng nhập để đặt hàng và thanh toán");
            navigate('/login');
            return;
        }
    }, []);
    const token = localStorage.getItem('jwt');
    useEffect(() => {
        dispatch(fetchMethodPayment())
    }, []);

    const defaultValue = {
        userid: '',
        namerecive: '',
        phonerecive: '',
        addressrecive: '',
        emailrecive: '',
        totalbill: totalAmount,
        idpayment: '',
    }
    const [valueoder, setvalueOrder] = useState(defaultValue)
    const orderDetails = cartItems.map((item) => ({
        product_id: item.id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        img: item.img,
        totalPrice: item.totalPrice
    }));
    const handlesetinput = (name, value) => {

        setvalueOrder({
            ...valueoder,
            [name]: value,
        });
    }

    const defaultvalid = {
        isvalidname: true,
        isvalidphone: true,
        isvalidaddress: true,
        isvalidemail: true,
        isvalidpayment: true
    }
    const [checkdefaultvalid, setdefaultvalid] = useState(defaultvalid);

    const validateInput = () => {
        setdefaultvalid(defaultvalid);

        if (!valueoder.namerecive || valueoder.namerecive.trim() === '') {
            message.info("hãy điền tên người nhận");
            setdefaultvalid({ ...defaultvalid, isvalidname: false })
            return false;
        }
        if (!valueoder.phonerecive || valueoder.phonerecive.trim() === '') {
            message.info("hãy điền số điện thoại")
            setdefaultvalid({ ...defaultvalid, isvalidphone: false })
            return false;
        }
        let phoneregex = /^(?:0|\+84)(?:1[0-9]|9[0-9]|[2-8][0-9])\d{7}$/;
        if (!phoneregex.test(valueoder.phonerecive)) {
            message.info("Vui lòng điền số điện thoại hợp lệ ")
            setdefaultvalid({ ...defaultvalid, isvalidphone: false })
            return false;
        }
        if (!valueoder.addressrecive || valueoder.addressrecive.trim() === '') {
            message.info("Vui lòng điền địa chỉ nhận hàng")
            setdefaultvalid({ ...defaultvalid, isvalidaddress: false })
            return false;
        }
        if (!valueoder.emailrecive || valueoder.emailrecive.trim() === '') {
            message.info("vui lòng điền email ")
            setdefaultvalid({ ...defaultvalid, isvalidemail: false })
            return false;
        }
        let emailregex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailregex.test(valueoder.emailrecive)) {
            message.info("vui lòng điền email hợp lệ")
            setdefaultvalid({ ...defaultvalid, isvalidemail: false })
            return false;
        }
        if (!valueoder.idpayment) {
            message.info("hãy chọn phương thức thanh toán ")
            setdefaultvalid({ ...defaultvalid, isvalidpayment: false })
            return false;
        }
        return true;

    }
    useEffect(
        () => {
            if (user && user.id) {
                handlesetinput('userid', user.id);
            }
        }, [user]
    )
    const handlecheck = () => {

        if (!token) {
            message.warning("Vui lòng đăng nhập để đặt hàng.");
            navigate('/login');
            return;
        }

        const isValid = validateInput();
        if (!isValid) {
            return;
        }



        if (valueoder.idpayment === 2) {
            dispatch(OrderMomo({ valueoder, orderDetails }))
                .unwrap()
                .then(() => {
                    message.success("Đặt hàng qua Momo thành công!");
                    dispatch(clearCart());
                })
                .catch((error) => {
                    if (error.status === 401) {
                        localStorage.removeItem('jwt');
                        dispatch(logout());
                        message.warning("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
                        navigate('/login');
                    } else {
                        message.error("Có lỗi xảy ra, vui lòng thử lại.");
                    }
                });
        }


        if (valueoder.idpayment === 1) {
            dispatch(Order({ valueoder, orderDetails }))
                .unwrap()
                .then(() => {

                    dispatch(clearCart());
                    navigate("/return");
                })
                .catch((error) => {
                    if (error.status === 401) {
                        localStorage.removeItem('jwt');
                        dispatch(logout());
                        message.warning("Phiên đăng nhập của bạn đã hết hạn. Vui lòng đăng nhập lại.");
                        navigate('/login');
                    } else {
                        message.error("Có lỗi xảy ra, vui lòng thử lại.");
                    }
                });
        }
    };



    return (

        <>

            <Header />
            <div className="container my-5">
                <div className="row">
                    <div className="col-md-7">
                        <h2 className="mb-4">Checkout</h2>
                        <h5 className="mb-3">Thông tin đặt hàng</h5>
                        <form>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="nameOnCard" className="form-label">Tên người nhận:</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="nameOnCard"
                                        placeholder="Tên người nhận"
                                        value={valueoder.namerecive}
                                        onChange={(event) => handlesetinput('namerecive', event.target.value)}
                                        style={{ borderRadius: '8px' }}
                                    />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="phoneNumber" className="form-label">Số điện thoại:</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="phoneNumber"
                                        placeholder="Số điện thoại"
                                        value={valueoder.phonerecive}
                                        onChange={(event) => handlesetinput('phonerecive', event.target.value)}
                                        style={{ borderRadius: '8px' }}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="address" className="form-label">Địa chỉ:</label>
                                    <input
                                        type="text"
                                        className="form-control form-control-lg"
                                        id="address"
                                        placeholder="Địa chỉ"
                                        value={valueoder.addressrecive}
                                        onChange={(event) => handlesetinput('addressrecive', event.target.value)}
                                        style={{ borderRadius: '8px' }}
                                    />
                                </div>
                                <div className="col-md-6 mb-4">
                                    <label htmlFor="email" className="form-label">Email:</label>
                                    <input
                                        type="email"
                                        className="form-control form-control-lg"
                                        id="email"
                                        placeholder="Email"
                                        value={valueoder.emailrecive}
                                        onChange={(event) => handlesetinput('emailrecive', event.target.value)}
                                        style={{ borderRadius: '8px' }}
                                    />
                                </div>
                            </div>
                        </form>

                        <h5 className="mt-4">Phương thức thanh toán</h5>
                        <form>
                            <div className="payment-method-selector mb-4">
                                <div className="row">
                                    {listpayment.map((paymentMethod) => (
                                        <div key={paymentMethod.id} className="col-md-6 mb-3">
                                            <div
                                                className={`card payment-card p-3 ${selectedValue === paymentMethod.id ? 'selected' : ''}`}
                                                onClick={() => {
                                                    setSelectedValue(paymentMethod.id);
                                                    handlesetinput('idpayment', paymentMethod.id);
                                                }}
                                                style={{
                                                    cursor: 'pointer',
                                                    borderRadius: '8px',
                                                    border: selectedValue === paymentMethod.id ? '2px solid #28a745' : '1px solid #ddd',
                                                    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                                                    boxShadow: selectedValue === paymentMethod.id ? '0px 4px 12px rgba(0, 123, 255, 0.2)' : 'none',
                                                }}
                                            >
                                                <div className="d-flex align-items-center">
                                                    <Radio
                                                        checked={selectedValue === paymentMethod.id}
                                                        onChange={() => {
                                                            setSelectedValue(paymentMethod.id);
                                                            handlesetinput('idpayment', paymentMethod.id);
                                                        }}
                                                        value={paymentMethod.id}
                                                        style={{ marginRight: '10px' }}
                                                    />
                                                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>
                                                        {paymentMethod.payment_method}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <button type="button" className="btn btn-success btn-lg w-100" onClick={handlecheck}>
                                Đặt hàng
                            </button>
                        </form>
                    </div>

                    <div className="col-md-5">
                        <h5>Đơn hàng của bạn</h5>
                        <ul className="list-group mb-4">
                            {cartItems.map((item) => (
                                <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <h6 className="my-0">{item.name}</h6>
                                        <small className="text-muted">Số lượng: {item.quantity}</small>
                                    </div>
                                    <span className="text-muted">
                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.totalPrice)}
                                    </span>
                                </li>
                            ))}
                        </ul>

                        <div className="card p-4" style={{ borderRadius: '10px', boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)' }}>
                            <h5 className="mb-0">
                                Tổng tiền:{' '}
                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </>
    );
}

export default Checkout;