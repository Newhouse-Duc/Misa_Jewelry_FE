
import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: '#f0f2f5' }}>
            <h1 style={{ fontSize: '64px', color: '#ff4d4f' }}>404</h1>
            <h2>Trang không tìm thấy</h2>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <Button type="primary" onClick={handleGoHome}>
                Quay lại trang chính
            </Button>
        </div>
    );
};

export default NotFound;
