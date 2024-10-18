import React from "react";
import { Button, Divider, Table, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getdetailbyid } from "../redux/slices/orderSlices";
import { ClockCircleOutlined, CheckCircleOutlined, CarOutlined, HomeOutlined } from '@ant-design/icons';
import { Steps } from 'antd';
const MdUserviewDetail = ({ orderid, orderStatus }) => {
    const dispatch = useDispatch();
    const listdetail = useSelector((state) => state.order.listdetail)
    useEffect(
        () => {

            if (orderid) {
                dispatch(getdetailbyid({ orderid }));
            }
        }
        , [orderid, dispatch]
    )

    const columns = [

        {
            title: 'Tên sản phảm ',
            dataIndex: 'product_name',
        },
        {
            title: 'Ảnh sản phẩm ',
            dataIndex: 'product_img',
            render: (product_img) => (
                <Image
                    width={100}
                    src={`${product_img}`}
                    alt="Product Image"
                />
            ),
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            align: 'center',
            width: 50,
        },
        {
            title: 'Giá sản phẩm ',
            dataIndex: 'product_price',
            align: 'center',

        },
        {
            title: 'Tổng ',
            dataIndex: 'product_totalprice',
        },

    ];

    const steps = [
        {
            title: <span style={{ fontSize: '12px' }}>Chờ xác nhận</span>,
            icon: <ClockCircleOutlined />,
        },
        {
            title: <span style={{ fontSize: '12px' }}>Xác nhận </span>,
            icon: <CheckCircleOutlined />,
        },
        {
            title: <span style={{ fontSize: '12px' }}>Đang giao</span>,
            icon: <CarOutlined />,
        },
        {
            title: <span style={{ fontSize: '12px' }}>Đã giao </span>,
            icon: <HomeOutlined />,
        },
    ];
    const currentStep = (() => {
        switch (orderStatus) {
            case 'pending':
                return 0;
            case 'confirmed':
                return 1;
            case 'shipped':
                return 2;
            case 'delivered':
                return 3;
            default:
                return 0;
        }
    })();

    return (
        <>

            <div>

                <h1> Trạng thái </h1>
                <Steps current={currentStep}>
                    {steps.map((step, index) => (
                        <step
                            key={index}
                            title={step.title}
                            icon={step.icon}
                            status={index <= currentStep ? 'finish' : 'wait'}
                        />
                    ))}
                </Steps>

                <Divider />

                <Table
                    scroll={{ x: 'max-content' }}
                    columns={columns}
                    dataSource={listdetail}
                />
            </div>
        </>
    );
}

export default MdUserviewDetail;