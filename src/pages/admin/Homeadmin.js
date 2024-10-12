import React, { useEffect, useState } from "react";
import { Card, Col, Row, Spin } from 'antd';

import ExportableChart from "../../components/Chart/ExportChart";
import { fetchAllUser } from "../../redux/slices/userSlice";
import { useDispatch, useSelector } from 'react-redux';
import LineChart from "../../components/Chart/Chart";
import { selectTotalRevenue, getAlldetail } from "../../redux/slices/orderSlices";
import { getproduct } from "../../redux/slices/productSlices";
import { getallorder } from "../../redux/slices/orderSlices";

const Adminhome = (props) => {

    const gridStyle = {
        width: '25%',
        textAlign: 'center',
    };
    const dispatch = useDispatch();
    useEffect(
        () => {
            dispatch(fetchAllUser());
            dispatch(getproduct())
            dispatch(getallorder())
            dispatch(getAlldetail())
        }
        , [dispatch])
    const isloading = useSelector((state) => state.user.isloading)
    const listuser = useSelector((state) => state.user.listUser)
    const listOrder = useSelector((state) => state.order.listOrder)
    const listproduct = useSelector((state) => state.product.listproduct)
    const totalRevenue = useSelector(selectTotalRevenue);
    const countproduct = listproduct.length;
    const countorder = listOrder.length;
    const countuser = listuser.length;






    return (
        <>
            <Row gutter={[16, 16]} style={{ marginBottom: '24px' }}>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        title={<><i className="bi bi-person-lines-fill" style={{ color: '#1890ff', fontSize: '1.5rem' }}></i>&nbsp;Người dùng</>}
                        bordered={false}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            padding: '20px',
                        }}
                    >
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{countuser}</span>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        title={<><i className="bi bi-box-seam-fill" style={{ color: '#52c41a', fontSize: '1.5rem' }}></i>&nbsp;Sản phẩm</>}
                        bordered={false}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            padding: '20px',
                        }}
                    >
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{countproduct}</span>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        title={<><i className="bi bi-cash-coin" style={{ color: '#faad14', fontSize: '1.5rem' }}></i>&nbsp;Doanh thu</>}
                        bordered={false}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            padding: '20px',
                            overflow: 'hidden',
                            justifyContent: 'center',

                        }}
                    >
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>
                            {totalRevenue.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                        </span>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card
                        title={<><i className="bi bi-journal-check" style={{ color: '#ff4d4f', fontSize: '1.5rem' }}></i>&nbsp;Đơn hàng</>}
                        bordered={false}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '12px',
                            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center',
                            padding: '20px',
                        }}
                    >
                        <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#333' }}>{countorder}</span>
                    </Card>
                </Col>
            </Row>

            <div
                style={{
                    marginTop: '5vh',
                    padding: '3vw',
                    backgroundColor: '#fff',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
                    borderRadius: '12px',
                    width: '100%',
                    margin: '0 auto',
                    boxSizing: 'border-box',
                }}
            >
                <h3 style={{
                    textAlign: 'center',
                    marginBottom: '3vh',
                    fontWeight: 'bold',
                    fontSize: '1.5rem',
                    color: '#333',
                }}>
                    <i className="bi bi-graph-up" style={{ color: '#1890ff', fontSize: '1.5rem', marginRight: '8px' }}></i>
                    Thống kê
                </h3>


                <div style={{ width: '100%', height: 'auto' }} >
                    <ExportableChart style={{ width: 'auto', height: 'auto' }} />

                </div>
            </div>
        </>

    );

}
export default Adminhome;