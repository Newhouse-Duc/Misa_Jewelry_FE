import React, { useEffect, useState } from "react";
import { Button, Modal, Tag, Select, Input, DatePicker, Row, Col, Table, Popconfirm, message, Divider } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import MdOrderdetail from "../../Modals/MdDetailorder";
import { getallorder, delOrder, ChangeNewStatusOrder } from "../../redux/slices/orderSlices";
import { fetchMethodPayment } from "../../redux/slices/authSlice";

const { Option } = Select;
const { Search } = Input;


const AdminOrder = () => {

    const dispatch = useDispatch();
    const listOrder = useSelector((state) => state.order.listOrder);
    const listpayment = useSelector((state) => state.auth.listpayment);
    const isLoading = useSelector((state) => state.order.isLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [selectorderid, setSelectorderid] = useState(null);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [searchName, setSearchName] = useState("");
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);


    const statusColors = {
        pending: 'processing',
        confirmed: 'volcano',
        shipped: 'geekblue',
        delivered: 'green',
        cancelled: 'error',

    };

    const statusOptions = [
        { label: 'Chờ xác nhận', value: 'pending' },
        { label: 'Xác nhận', value: 'confirmed' },
        { label: 'Đang giao', value: 'shipped' },
        { label: 'Đã giao hàng', value: 'delivered' },
        { label: 'Hủy', value: 'cancelled' },
    ];

    const handleTableChange = (pagination) => {
        setCurrentPage(pagination.current);
        setPageSize(pagination.pageSize);
    };

    const handledeleteOrder = async (order) => {
        try {
            await dispatch(delOrder({ order })).unwrap();
            message.success("Xóa thành công");
        } catch (error) {
            message.error("Xóa thất bại: " + error);
        }
        dispatch(getallorder());
    };

    useEffect(() => {
        dispatch(getallorder());
        dispatch(fetchMethodPayment());
    }, [dispatch]);

    const filterOrders = () => {
        let filtered = listOrder;

        if (searchName) {
            filtered = filtered.filter(order =>
                order.name_receive.toLowerCase().includes(searchName.toLowerCase())
            );
        }

        if (selectedStatus) {
            filtered = filtered.filter(order => order.status === selectedStatus);
        }

        if (selectedPaymentMethod) {
            filtered = filtered.filter(order => order.payment_id === selectedPaymentMethod);
        }

        setFilteredOrders(filtered);
    };

    useEffect(() => {
        filterOrders();
    }, [searchName, selectedStatus, selectedPaymentMethod, listOrder]);

    const handleShowDetail = (idorder) => {
        setSelectorderid(idorder.id);
    };

    useEffect(() => {
        if (selectorderid !== null) {
            setModal2Open(true);
        }
    }, [selectorderid]);

    const handleStatusChange = (idorder, newStatus) => {
        dispatch(ChangeNewStatusOrder({ idorder, newStatus }));
    };

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: 50,
            align: 'center',
            render: (text, record, index) => <a>{index + 1 + (currentPage - 1) * pageSize}</a>,
        },
        {
            title: 'Mã khách hàng ',
            dataIndex: 'user_id',
            align: 'center',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Phương thức thanh toán ',
            dataIndex: 'payment_id',
            align: 'center',
            render: (payment_id) => {
                const shownamepayment = listpayment.find(pay => pay.id === payment_id);
                const color = shownamepayment?.payment_method === 'COD' ? 'purple' : shownamepayment?.payment_method === 'MOMO' ? 'pink' : 'gray';

                return (
                    <Tag color={color} key={shownamepayment?.payment_method}>
                        {shownamepayment ? shownamepayment.payment_method : 'Không xác định'}
                    </Tag>
                );
            }
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            align: 'center',
            render: (status, record) => {
                const isDelivered = status === 'delivered';

                return isDelivered ? (
                    <Tag color={statusColors[status]}>{statusOptions.find(option => option.value === status).label}</Tag>
                ) : (
                    <Select value={status} onChange={(newStatus) => handleStatusChange(record.id, newStatus)}>
                        {statusOptions.map((option) => (
                            <Option key={option.value} value={option.value}>
                                <Tag color={statusColors[option.value]}>
                                    {option.label}
                                </Tag>
                            </Option>
                        ))}
                    </Select>
                );
            },
        },
        {
            title: 'Tên người nhận',
            dataIndex: 'name_receive',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone_receive',
        },
        {
            title: 'Địa chỉ ',
            dataIndex: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Ngày đặt',
            dataIndex: 'createdAt',
            align: 'center',
            render: (createdAt) => moment(createdAt).format('DD/MM/YYYY'),
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'total_price',
            align: 'center',
            render: (text) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text),
        },
        {
            title: 'Thao tác ',
            dataIndex: 'action',
            fixed: 'right',
            render: (text, record) => (
                <div style={{ display: 'flex', gap: '8px' }}>
                    <Button type="primary" size="small" onClick={() => handleShowDetail(record)}><i className="bi bi-eye"></i></Button>
                    <Popconfirm
                        title="Delete the task"
                        description="Bạn có muốn xóa đơn hàng này "
                        okText="Yes"
                        onConfirm={() => handledeleteOrder(record.id)}
                    >
                        <Button type="danger" size="small" style={{ border: 'solid 1px red', color: 'red' }}><i className="bi bi-x-circle-fill"></i></Button>
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const [modal2Open, setModal2Open] = useState(false);

    return (
        <>
            <div className="container">
                <div style={{ padding: '16px 0' }}>
                    <Row gutter={[16, 16]} justify="space-between" align="middle">
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Search
                                placeholder="Tìm tên người nhận"
                                onSearch={setSearchName}
                                allowClear
                                style={{ width: '100%', borderRadius: '4px' }}
                            />
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                placeholder="Lọc theo trạng thái"
                                onChange={setSelectedStatus}
                                allowClear
                                style={{ width: '100%', borderRadius: '4px' }}
                            >
                                {statusOptions.map(option => (
                                    <Option key={option.value} value={option.value}>
                                        {option.label}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <Select
                                placeholder="Lọc theo phương thức thanh toán"
                                onChange={setSelectedPaymentMethod}
                                allowClear
                                style={{ width: '100%', borderRadius: '4px' }}
                            >
                                {listpayment.map(payment => (
                                    <Option key={payment.id} value={payment.id}>
                                        {payment.payment_method}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                </div>
            </div>

            <Divider />
            <Table
                columns={columns}
                dataSource={isLoading ? [] : filteredOrders}
                loading={isLoading}
                pagination={{ current: currentPage, pageSize: pageSize }}
                onChange={handleTableChange}
                scroll={{ x: 'max-content' }}
            />
            <Modal
                title="Xem chi tiết đơn hàng"
                centered
                open={modal2Open}
                onCancel={() => setModal2Open(false)}
                footer={null}
            >
                <MdOrderdetail orderid={selectorderid} closeModaledit={() => setModal2Open(false)} />
            </Modal>
        </>
    );
}

export default AdminOrder;
