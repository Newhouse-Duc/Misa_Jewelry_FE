import { Layout, Menu, Avatar, Table, Tag, Button, Space, message, Modal } from "antd";
import { ShoppingCartOutlined, OrderedListOutlined, LogoutOutlined, UserOutlined, EyeOutlined, CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { ShowlistOrerUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { fetchMethodPayment } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import MdUserviewDetail from "../../Modals/MdUserviewDetail";
import { ChangeNewStatusOrder } from "../../redux/slices/orderSlices";

const { Content, Sider } = Layout;

const Infor = () => {
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState("orders");
    const dispatch = useDispatch();
    const listOrderbyUser = useSelector((state) => state.auth.listOrderbyUser)
    const isLoading = useSelector((state) => state.auth.isLoading);
    const user = useSelector((state) => state.auth.user)
    const listpayment = useSelector((state) => state.auth.listpayment);
    const handleMenuClick = (e) => {
        setActiveSection(e.key);
    };
    const token = localStorage.getItem('jwt');
    useEffect(() => {

        if (token) {
            dispatch(fetchMethodPayment()).unwrap().catch((error) => {
                if (error === 401) {

                    localStorage.removeItem('jwt');
                    dispatch(logout());
                    navigate('/login');
                } else {
                    message.error("Có lỗi xảy ra, vui lòng thử lại.");
                }
            });
        }
    }, [token, dispatch, navigate]);

    useEffect(() => {
        if (user && user.id)
            dispatch(ShowlistOrerUser({ iduser: user.id }));

    }, [user, dispatch]);

    const handleViewOrder = (record) => {
        message.info(`Xem chi tiết đơn hàng ${record.id}`);

        if (record) {
            setSelectorderid(record.id);
            setOrderStatus(record.status);
            setModal2Open(true);
        }

    };
    const handleLogoutuser = () => {
        dispatch(logout())

        navigate('/')
    };

    const handleCancelOrder = async (record) => {
        let newStatus = "";
        const idorder = record.id;

        if (record.status === 'shipped') {
            newStatus = 'delivered';
        } else if (record.status === 'pending') {
            newStatus = 'cancelled';
        }

        if (newStatus) {
            try {
                await dispatch(ChangeNewStatusOrder({ idorder, newStatus })).unwrap();
                await dispatch(ShowlistOrerUser({ iduser: user.id })).unwrap();
            } catch (error) {
                message.error("Có lỗi xảy ra khi cập nhật trạng thái đơn hàng.");
            }
        }
    };

    const columns = [
        {
            title: 'Mã đơn hàng',
            dataIndex: 'id',
            key: 'id',
            fixed: 'left',
            align: 'center',
            width: 50,
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            align: 'center',
            key: 'createdAt',
            render: (text) => new Date(text).toLocaleDateString('vi-VN'),
            width: 60,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            key: 'total_price',
            align: 'center',
            render: (total_price) => total_price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }),
            width: 150,
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'payment_id',
            key: 'payment_id',
            align: 'center',
            render: (payment_id) => {
                const paymentMethod = listpayment.find(method => method.id === payment_id);
                let color;
                switch (paymentMethod?.payment_method) {
                    case 'COD':
                        color = 'purple';
                        break;
                    case 'MOMO':
                        color = 'pink';
                        break;
                    default:
                        color = 'gray';
                }
                return (
                    <Tag color={color} key={paymentMethod?.payment_method}>
                        {paymentMethod ? paymentMethod.payment_method : 'Không xác định'}
                    </Tag>
                );
            },
            width: 100,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status', align: 'center',
            render: (status) => {
                let color;
                switch (status) {
                    case 'shipped':
                        color = 'green';
                        break;
                    case 'pending':
                        color = 'gold';
                        break;
                    case 'confirmed':
                        color = 'blue';
                        break;
                    case 'delivered':
                        color = 'cyan';
                        break;
                    case 'cancelled':
                        color = 'red';
                        break;
                    case 'failed':
                        color = 'volcano';
                        break;
                    default:
                        color = 'gray';
                }
                return (
                    <Tag color={color} key={status}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
            width: 100,
        },
        {
            title: 'Hành động',
            key: 'action',

            width: 60,
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => handleViewOrder(record)}>Xem</Button>
                    {record.status === 'pending' && (
                        <Button danger icon={<CloseOutlined />} onClick={() => handleCancelOrder(record)}>
                            Hủy đặt
                        </Button>
                    )}
                    {record.status === 'shipped' && (
                        <Button color="default" variant="filled" icon={<CheckCircleOutlined />} onClick={() => handleCancelOrder(record)}>
                            Nhận hàng
                        </Button>

                    )}
                </Space>
            ),
        },
    ];

    const data = listOrderbyUser.map((order) => ({
        key: order.id,
        id: order.id,
        createdAt: order.createdAt,
        total_price: order.total_price,
        payment_id: order.payment_id,
        status: order.status,
    }));

    const renderContent = () => {
        switch (activeSection) {
            case "orders":
                if (!listOrderbyUser || listOrderbyUser.length === 0) {
                    return <div>Bạn chưa có đơn hàng nào.</div>;
                }
                return (
                    <div>
                        <h2>Danh sách đơn hàng của bạn</h2>
                        <Table
                            columns={columns}
                            dataSource={isLoading ? [] : data}
                            pagination={false}
                            scroll={{ x: 'max-content' }}
                            style={{ minWidth: '100%' }}


                            loading={isLoading}
                        />
                    </div>
                );

            case "logout":

                return <div>Đang đăng xuất </div>;
            default:
                return <div>Chọn một mục để xem nội dung</div>;
        }
    };
    const [modal2Open, setModal2Open] = useState(false);
    const [selectorderid, setSelectorderid] = useState(null)
    const [orderStatus, setOrderStatus] = useState(null);
    return (
        <>

            <div style={{ marginBottom: '24px' }}>
                <Header />
            </div>

            <Layout style={{ minHeight: '100vh' }}>
                <Sider width={200} style={{ background: '#fff', padding: '16px 0' }}>
                    <div style={{ textAlign: 'center', paddingBottom: '20px' }}>
                        <Avatar size={64} icon={<UserOutlined />} />
                        <div style={{ marginTop: '10px', fontWeight: 'bold' }}>Hello, {user?.username}</div>
                    </div>
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={['orders']}
                        style={{ height: '80%', borderRight: 0 }}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="orders" icon={<OrderedListOutlined />}>
                            Xem đơn hàng
                        </Menu.Item>
                        <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={() => handleLogoutuser()}>
                            Đăng xuất
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Modal
                    title="Chi tiết đơn hàng"
                    centered
                    open={modal2Open}
                    onOk={() => setModal2Open(false)}
                    onCancel={() => setModal2Open(false)}
                    footer={[
                        <Button key="cancel" onClick={() => setModal2Open(false)}>
                            Thoát
                        </Button>,
                        <Button key="submit" type="primary" onClick={() => setModal2Open(false)}>
                            Ok
                        </Button>,
                    ]}
                >
                    <MdUserviewDetail

                        orderid={selectorderid}
                        orderStatus={orderStatus}
                    />
                </Modal>
                <Layout style={{ padding: '24px' }}>

                    <Content style={{ padding: 24, margin: 0, background: '#fff', minHeight: 280 }}>
                        {renderContent()}
                    </Content>
                </Layout>
            </Layout>

            <Footer style={{ textAlign: 'center', marginTop: 'auto' }} />
        </>
    );
};

export default Infor;
