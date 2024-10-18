import React, { useEffect, useState } from "react";
import { getproduct } from "../redux/slices/productSlices";
import { useDispatch, useSelector } from "react-redux";
import { Carousel, Card, Row, Col, Spin } from "antd";
import { useNavigate } from "react-router-dom";
const Bestseller = () => {
    const dispatch = useDispatch();
    const [slidesToShow, setSlidesToShow] = useState(4);
    const listproduct = useSelector((state) => state.product.listproduct);



    const navigate = useNavigate()
    useEffect(() => {

        dispatch(getproduct());

    }, [dispatch]);
    useEffect(() => {
        updateSlidesToShow();
        window.addEventListener('resize', updateSlidesToShow);
        return () => window.removeEventListener('resize', updateSlidesToShow);
    }, []);
    const handleNavigate = (navi) => {
        navigate(navi);
    }
    const updateSlidesToShow = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setSlidesToShow(1);
        } else if (width < 992) {
            setSlidesToShow(2);
        } else {
            setSlidesToShow(4);
        }
    };

    return (
        <div style={{ padding: '20px', margin: "10px" }}>
            <h2 className="mb-5" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1c1c1c', textAlign: 'center' }}>Sản phẩm bán chạy</h2>
            <Spin spinning={!listproduct.length} tip="Đang tải ...">
                <Carousel
                    autoplay
                    dots={false}
                    style={{ marginTop: '20px' }}
                    arrows
                    autoplaySpeed={2000}
                    slidesToShow={slidesToShow}
                    slidesToScroll={1}

                >
                    {listproduct.map((product) => (
                        <div key={product.id} >
                            <Card
                                hoverable
                                style={{
                                    width: '100%',
                                    textAlign: 'center',
                                    borderRadius: '12px',
                                    overflow: 'hidden',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    transition: 'transform 0.3s, box-shadow 0.3s',
                                    margin: "10px",

                                }}
                                onClick={() => handleNavigate(`/detailprd/${product.id}`)}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'scale(1.05)';
                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'scale(1)';
                                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                                }}
                            >
                                <img
                                    alt={product.productName}
                                    src={product.img}
                                    style={{
                                        width: '100%',
                                        height: '250px',
                                        objectFit: 'cover',
                                        borderBottom: '1px solid #f0f0f0',
                                    }}
                                />
                                <div style={{ padding: '15px 10px' }}>
                                    <Card.Meta
                                        title={
                                            <span style={{ fontWeight: 'bold', fontSize: '18px', color: '#333' }}>
                                                {product.productName}
                                            </span>
                                        }
                                        description={
                                            <span style={{ color: '#28a745', fontWeight: 'bold', fontSize: '16px' }}>
                                                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}
                                            </span>
                                        }
                                    />
                                </div>
                            </Card>
                        </div>
                    ))}
                </Carousel>




            </Spin>
            <style jsx>{`
                    .ant-carousel .slick-prev,
                    .ant-carousel .slick-next {
                    color: #333;  
                    font-size: 30px;
                    width: 50px;
                    border-radius: 50%;
                    display: block;
                    font-size: 50px;
                    border: 15px solid transparent;
                    height: 50px;
                    padding-left: 20px;
                    display: flex;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3); 
                    transition: all 0.3s ease;
                    background-color: rgba(255, 255, 255, 1);
                    }
                    .ant-carousel .slick-prev:hover,
                    .ant-carousel .slick-next:hover {
                        background-color: white;
                        transform: translateY(-50%) scale(1.05);
                        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    color: #555; 
                    }
                    .ant-carousel .slick-slide {
                    transition: all 0.5s ease; 
                    }
                    .ant-carousel .slick-list {
                     overflow: hidden; 
            `}</style>

        </div>
    );
};

export default Bestseller;
