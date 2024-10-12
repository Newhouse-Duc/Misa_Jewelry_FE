import React from "react";
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import collection1 from "../../src/assets/collection 1.png"
import collection2 from "../../src/assets/collection 2.png"
import collection3 from "../../src/assets/collection 3.png"
import imgcollection4 from "../../src/assets/collection 4.png"
import blog1 from "../../src/assets/blog1.png"
import blog2 from "../../src/assets/blog2.png"
import blog3 from "../../src/assets/blog3.png"
import blog4 from "../../src/assets/blog4.png"
import { Row, Col, Card, Button } from 'antd';
import { useNavigate } from "react-router-dom";

const collections = [
    {

        imageUrl: collection1,
    },
    {

        imageUrl: collection2,
    },
    {

        imageUrl: collection3,
    },
    {

        imageUrl: imgcollection4,
    },
];

const blogImages = [
    blog1,
    blog2,
    blog3,
    blog4

];



const Blogandtip = (props) => {

    const navigate = useNavigate()
    const handleshop = () => {
        navigate('/shop')
    }
    return (
        <>
            <div className="container">
                <div className="text-center py-5" style={{ backgroundColor: '#fff', color: '#fff' }}>
                    <h2 className="mb-5" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1c1c1c' }}>Bộ Sưu Tập Nổi Bật</h2>
                    <MDBRow>
                        {collections.map((collection, index) => (
                            <MDBCol md="6" lg="3" key={index} className="mb-4">
                                <MDBCard
                                    style={{ backgroundColor: 'transparent', border: 'none', transition: 'transform 0.3s' }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <MDBCardImage
                                        src={collection.imageUrl}
                                        alt={collection.title}
                                        fluid
                                        position="top"
                                        className="w-100"
                                        style={{ borderRadius: '10px 10px 0 0', height: '380px', objectFit: 'cover' }}
                                    />
                                    <MDBBtn
                                        onClick={() => handleshop()}
                                        block
                                        style={{
                                            backgroundColor: '#e0a800',
                                            color: '#000',
                                            border: 'none',
                                            transition: 'filter 0.3s',
                                        }}
                                        className="btn-blur"
                                    >
                                        Khám phá ngay
                                    </MDBBtn>


                                </MDBCard>
                            </MDBCol>
                        ))}
                    </MDBRow>
                </div>
                <div className="text-center py-5" style={{ backgroundColor: '#fff', color: '#fff' }}>
                    <h2 className="mb-5" style={{ fontSize: '36px', fontWeight: 'bold', color: '#1c1c1c' }}>Blog & Tin Tức</h2>
                    <MDBRow>
                        {blogImages.map((imageUrl, index) => (
                            <MDBCol md="6" lg="3" key={index} className="mb-4">
                                <MDBCard
                                    style={{
                                        backgroundColor: '#2a2a2a',
                                        border: 'none',
                                        transition: 'transform 0.3s ease-in-out',
                                        borderRadius: '10px',
                                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
                                        overflow: 'hidden',
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.03)'}
                                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                >
                                    <MDBCardImage
                                        src={imageUrl}
                                        alt={`Blog ${index + 1}`}
                                        position="top"
                                        style={{
                                            borderRadius: '10px 10px 0 0',
                                            height: '200px',
                                            objectFit: 'cover',
                                            width: '100%'
                                        }}
                                    />
                                </MDBCard>
                            </MDBCol>

                        ))}
                    </MDBRow>
                </div>
            </div>
        </>
    );
}

export default Blogandtip;
