import React from 'react';
import { Button, Result, Typography } from 'antd';
import { SmileOutlined, ShoppingOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useSelector } from 'react-redux';



const ReturnPage = () => {
    const navigate = useNavigate();


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

                </Result>
            </div>
            <Footer />
        </>
    );
};

export default ReturnPage;
