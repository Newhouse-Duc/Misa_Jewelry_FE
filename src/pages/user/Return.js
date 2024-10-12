import React from 'react';
import { Button, Result, Typography } from 'antd';
import { SmileOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';

const { Paragraph, Text } = Typography;

const ReturnPage = () => {
    const navigate = useNavigate();
    const orderreturn = useSelector((state) => state.auth.orderreturn);

    const handleBackToShop = () => {
        navigate('/shop');
    };

    const handleViewOrders = () => {
        navigate('/infor');
    };

    return (
        <>
            <Header />
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5', padding: '20px' }}>
                <Result
                    icon={<SmileOutlined style={{ color: '#52c41a', fontSize: '64px' }} />}
                    title={<h2 style={{ fontWeight: 'bold', color: '#333' }}>Cảm ơn bạn đã đặt hàng!</h2>}
                    subTitle={<span style={{ fontSize: '16px', color: '#555' }}>Đơn hàng của bạn đã được xử lý thành công. Chúng tôi sẽ gửi thông tin chi tiết qua email của bạn.</span>}
                    extra={[
                        <Button
                            type="primary"
                            key="home"
                            onClick={handleBackToShop}
                            icon={<ShoppingOutlined />}
                            style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f', borderRadius: '8px', padding: '10px 20px' }}
                        >
                            Tiếp tục mua sắm
                        </Button>,
                        <Button
                            key="orders"
                            onClick={handleViewOrders}
                            style={{ borderRadius: '8px', padding: '10px 20px' }}
                        >
                            Xem đơn hàng của bạn
                        </Button>,
                    ]}
                    style={{
                        padding: '20px 40px',
                        background: '#fff',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        borderRadius: '12px',
                        textAlign: 'center',
                    }}
                >
                    <div style={{ marginTop: '20px', fontSize: '16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflowX: 'auto' }}>
                            <div style={{ display: 'flex', width: '100%', borderCollapse: 'collapse' }}>
                                <div style={{ flex: '1', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>Ảnh sản phẩm</div>
                                <div style={{ flex: '2', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>Tên sản phẩm</div>
                                <div style={{ flex: '1', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>Số lượng</div>
                                <div style={{ flex: '1', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>Giá</div>
                                <div style={{ flex: '1', padding: '8px', textAlign: 'center', fontWeight: 'bold' }}>Tổng giá</div>
                            </div>
                            <div style={{ border: '1px solid #ddd', width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
                                {orderreturn.map((item, index) => (
                                    <div key={index} style={{ display: 'flex', padding: '8px', borderBottom: '1px solid #ddd' }}>
                                        <div style={{ flex: '1', textAlign: 'center' }}>
                                            <img src={item.product_img} alt={item.product_name} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                        </div>
                                        <div style={{ flex: '2', textAlign: 'center' }}>{item.product_name}</div>
                                        <div style={{ flex: '1', textAlign: 'center' }}>{item.quantity}</div>
                                        <div style={{ flex: '1', textAlign: 'center' }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_price)}
                                        </div>
                                        <div style={{ flex: '1', textAlign: 'center' }}>
                                            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.product_totalprice)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Result>
            </div>
            <Footer />
        </>
    );
};

export default ReturnPage;
