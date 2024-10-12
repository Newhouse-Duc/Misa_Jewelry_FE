import React, { useState, Suspense, useEffect } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    HomeOutlined,
    GiftOutlined,
    ProfileOutlined,
    TableOutlined,
    PoweroffOutlined

} from '@ant-design/icons';

import { Button, Layout, Menu, theme, Input, Avatar, Badge, message } from 'antd';
import Adminhome from './Homeadmin';
import AdminProduct from './AdminProduct';
import AdminUser from './AdminUser';
import AdminOrder from './AdminOrder';
import AdminCategory from './AdminCategory';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutAdmin } from '../../redux/slices/authSlice';
const { Header, Sider, Content } = Layout;

const Dashboard = (props) => {
    const admin = useSelector((state) => state.auth.admin)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(
        () => {
            if (!admin) {
                navigate("/admin")
            }
        }, [admin, navigate]
    )
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();


    const [selectedKey, setSelectedKey] = useState('Home');
    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
        if (e.key === 'Logout') {
            handleLogout();
        }
    };
    const handleLogout = () => {
        dispatch(logoutAdmin())
        navigate("/admin")
    }
    const renderContent = () => {
        if (selectedKey === 'Home') {
            return <Adminhome />;
        }
        if (selectedKey === 'Product') {
            return <AdminProduct />;
        }
        if (selectedKey === 'User') {
            return <AdminUser />;
        }
        if (selectedKey === 'Order') {
            return <AdminOrder />;
        }
        if (selectedKey === 'Category') {
            return <AdminCategory />;
        }

    };
    if (!admin) {

        navigate("/admin");

        return null;
    }
    return (
        <>


            <Layout style={{ height: '100vh' }}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" style={{
                        height: '32px',
                        margin: '16px',
                        background: 'black',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white'
                    }}>
                        {collapsed ? <i className="bi bi-sliders"></i> : 'Admin'}
                    </div>

                    <div className="demo-logo-vertical" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={['Home']}
                        onClick={handleMenuClick}
                        items={[
                            {
                                key: 'Home',
                                icon: <HomeOutlined />,
                                label: 'Home',
                            },
                            {
                                key: 'User',
                                icon: <UserOutlined />,
                                label: 'Customer',
                            },
                            ,

                            {
                                key: 'Product',
                                icon: <GiftOutlined />,
                                label: 'Product',
                            },
                            {
                                key: 'Order',
                                icon: <ProfileOutlined />,
                                label: 'Orders',
                            },
                            {
                                key: 'Category',
                                icon: <TableOutlined />,
                                label: 'Category',
                            },
                            {
                                key: 'Logout',
                                icon: <PoweroffOutlined />,
                                label: 'Log out',
                            },
                        ]}
                    />
                </Sider>
                <Layout>
                    <Header
                        style={{
                            padding: '0 20px',
                            background: '#fff',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            height: 64,
                        }}
                    >

                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={() => setCollapsed(!collapsed)}
                            style={{
                                fontSize: '20px',
                                width: 48,
                                height: 48,
                            }}
                        />



                        {admin &&
                            (
                                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', backgroundColor: '#f0f2f5', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
                                    <Avatar
                                        style={{
                                            backgroundColor: '#1890ff',
                                            color: '#fff',
                                            fontWeight: 'bold',
                                            marginRight: '10px',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                                        }}
                                        icon={<UserOutlined />}
                                    />
                                    <span style={{ fontWeight: '500', color: '#333', fontSize: '16px' }}>
                                        Hello, {admin.username}
                                    </span>
                                </div>
                            )}

                    </Header>
                    <Content
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            overflow: 'auto',
                        }}
                    >
                        <Suspense fallback={<div>Loading...</div>}>
                            {renderContent()}
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>

        </>
    );
}

export default Dashboard;