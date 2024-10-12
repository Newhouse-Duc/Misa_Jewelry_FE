import React, { useEffect } from "react";
import { getproduct } from "../redux/slices/productSlices";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Card, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
const Bestseller = () => {
    const dispatch = useDispatch();
    const listproduct = useSelector((state) => state.product.listproduct);
    const itemsToShow = 4;
    const totalItems = Math.ceil(listproduct.length / itemsToShow);
    const navigate = useNavigate()
    useEffect(() => {
        dispatch(getproduct());
    }, [dispatch]);
    const handleNavigate = (navi) => {
        navigate(navi);
    }

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ textAlign: 'center' }}>Sản phẩm bán chạy</h2>
            <Carousel
                autoplay
                dots={false}
                style={{ marginTop: '20px' }}
                arrows
                autoplaySpeed={2000}
            >
                {Array.from({ length: totalItems }).map((_, index) => (
                    <div key={index}>
                        <Row gutter={[16, 16]} justify="center">
                            {listproduct.slice(index * itemsToShow, (index + 1) * itemsToShow).map((product) => (
                                <Col key={product.id} xs={24} sm={12} md={8} lg={4}>
                                    <Card
                                        hoverable
                                        style={{ width: '100%', margin: '10px 0', textAlign: 'center' }}
                                        onClick={() => handleNavigate(`/detailprd/${product.id}`)}
                                    >
                                        <img
                                            alt={product.productName}
                                            src={product.img}
                                            style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                                        />
                                        <div style={{ margin: '10px 0' }}>
                                            <Card.Meta
                                                title={
                                                    <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{product.productName}</span>
                                                }
                                                description={
                                                    <span style={{ color: 'green', fontWeight: 'bold', fontSize: '16px' }}>
                                                        {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                                    </span>
                                                }
                                            />
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                ))}
            </Carousel>
            <style jsx>{`
                .ant-carousel .slick-prev,
                .ant-carousel .slick-next {
                    color: black; /* Màu sắc của nút điều hướng */
                }
                .ant-carousel .slick-prev:hover,
                .ant-carousel .slick-next:hover {
                    color: #555; /* Màu khi hover */
                }
                .ant-carousel .slick-slide {
                    transition: all 0.5s ease; 
                }
                .ant-carousel .slick-list {
                    overflow: hidden; 
                }
            `}</style>
        </div>
    );
};

export default Bestseller;
