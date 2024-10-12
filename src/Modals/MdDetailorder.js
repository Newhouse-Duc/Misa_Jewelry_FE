import React, { useEffect } from "react";
import { Button, Divider, Table, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getdetailbyid } from "../redux/slices/orderSlices";

const MdOrderdetail = ({ orderid }) => {
    const dispatch = useDispatch();
    const listdetail = useSelector((state) => state.order.listdetail);

    useEffect(() => {
        if (orderid) {
            dispatch(getdetailbyid({ orderid }));
        }
    }, [orderid, dispatch]);

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            width: 50,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'product_img',
            render: (product_img) => (
                <Image
                    width={80}
                    src={product_img}
                    alt="Product Image"
                    style={{ borderRadius: '8px' }}
                />
            ),
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'product_price',
            render: (text) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
            },
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
            render: (text) => <span>{text}</span>,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'product_totalprice',
            render: (text) => {
                return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(text);
            },
        },
    ];

    return (
        <>
            <Divider />
            <Table
                scroll={{ x: 'max-content' }}
                columns={columns}
                dataSource={listdetail}
                pagination={false}
                rowKey="product_id"
                bordered
            />
        </>
    );
}

export default MdOrderdetail;
