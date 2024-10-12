
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Tabs } from 'antd';
import { Pagination } from 'antd';
import { useNavigate } from "react-router-dom";
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBIcon,
    MDBBtn,
    MDBRipple,
} from "mdb-react-ui-kit";

import { message, Select } from 'antd';
import { fetchAllcategory } from "../../redux/slices/categorySlice";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../../redux/slices/productSlices";
import { addTocart } from "../../redux/slices/cartSlices";
const { Option } = Select;
const Shop = (props) => {
    const dispatch = useDispatch();

    const listCategory = useSelector((state) => state.category.listCategory);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const listproduct = useSelector((state) => state.product.listproduct)
    const product = useSelector((state) => state.product.product);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 12;
    const handleCategoryClick = (categoryId) => {
        setSelectedCategory(categoryId);
        setCurrentPage(1);
    };
    useEffect(
        () => {

            dispatch(fetchAllcategory())

        }
        , [])
    useEffect(
        () => {
            dispatch(getproduct())
        }, []
    )
    useEffect(() => {
        const allCategory = { id: null, categoryName: 'ALL' };
        if (listCategory.length > 0) {
            setSelectedCategory(allCategory.id);
        }
    }, [listCategory]);



    const handleAddcart = (product) => {

        message.success("thêm giỏ hàng thành công ");
        dispatch(addTocart({
            id: product.id,
            productName: product.productName,
            price: product.price,
            img: product.img,
            quantity: 1,
        }));
    }
    let navigate = useNavigate();
    const handleNavigate = (navi) => {
        navigate(navi);
    }

    const filterByPrice = (product) => {
        if (!selectedPriceRange) return true;
        const price = product.price;
        const [min, max] = selectedPriceRange.split('-').map(Number);
        return price >= min && (!max || price <= max);
    };
    const handlePriceChange = (value) => {
        setSelectedPriceRange(value);
        setCurrentPage(1);
    };
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const filteredProducts = listproduct
        .filter((product) => !selectedCategory || product.categoryid === selectedCategory)
        .filter(filterByPrice);


    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
    return (
        <>
            <Header />


            <div
                className="bg-image"
                style={{
                    backgroundImage: "url('https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/breadcrump.jpg?1723393750526 ')",
                    height: '50vh',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    }}
                />
            </div>


            <div style={{ display: 'flex', justifyContent: 'center', padding: '2rem 0' }}>
                <div style={{ width: '100%', maxWidth: '960px', textAlign: 'center' }}>
                    <ul
                        style={{
                            listStyle: 'none',
                            padding: 0,
                            margin: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            gap: '20px',
                        }}
                    >
                        <li style={{ display: 'inline-block' }}>
                            <a
                                onClick={() => handleCategoryClick(null)}
                                style={{
                                    color: selectedCategory === null ? 'white' : 'black',
                                    backgroundColor: selectedCategory === null ? '#6c757d' : 'transparent',
                                    padding: '12px 20px',
                                    textDecoration: 'none',
                                    borderRadius: '5px',
                                    fontWeight: 'bold',
                                    boxShadow: selectedCategory === null ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                                    transition: 'all 0.3s ease',
                                }}
                            >
                                ALL
                            </a>
                        </li>
                        {listCategory.map((category) => (
                            <li key={category.id} style={{ display: 'inline-block' }}>
                                <a
                                    onClick={() => handleCategoryClick(category.id)}
                                    style={{
                                        color: selectedCategory === category.id ? 'white' : 'black',
                                        backgroundColor: selectedCategory === category.id ? '#6c757d' : 'transparent',
                                        padding: '12px 20px',
                                        textDecoration: 'none',
                                        borderRadius: '5px',
                                        fontWeight: 'bold',
                                        boxShadow: selectedCategory === category.id ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                                        transition: 'all 0.3s ease',
                                    }}
                                >
                                    {category.categoryName}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div style={{ padding: '20px', textAlign: 'center' }}>
                <Select
                    placeholder="Lọc theo khoảng giá"
                    onChange={handlePriceChange}
                    style={{ width: 200 }}
                    allowClear
                >
                    <Option value="600000-800000">600,000 - 800,000 VND</Option>
                    <Option value="800000-1000000">800,000 - 1,000,000 VND</Option>
                    <Option value="1000000-1400000">1,000,000 - 1,400,000 VND</Option>
                    <Option value="1400000-2000000">1,400,000 - 2,000,000 VND</Option>
                    <Option value="2000000-">Trên 2,000,000 VND</Option>
                </Select>
            </div>
            <section>
                <div className="container">
                    <div className="row">
                        {currentProducts.map((product) => (
                            <div className="col-md-6 col-lg-3 ftco-animate" key={product.id} style={{ marginBottom: '20px' }}>
                                <MDBCard
                                    className="product-card"
                                    style={{ position: 'relative', textAlign: 'center' }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.querySelector('.hover-buttons').style.opacity = 1;
                                        e.currentTarget.querySelector('.content').style.filter = 'blur(5px)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.querySelector('.hover-buttons').style.opacity = 0;
                                        e.currentTarget.querySelector('.content').style.filter = 'none';
                                    }}
                                >
                                    <MDBRipple rippleColor="light" rippleTag="div" className="bg-image rounded hover-zoom">
                                        <MDBCardImage
                                            src={product.img}
                                            fluid
                                            className="w-100"
                                            style={{ height: '300px', objectFit: 'cover' }}
                                        />
                                        <a onClick={() => handleNavigate(`/detailprd/${product.id}`)}>
                                            <div className="hover-overlay">
                                                <div className="mask" style={{ backgroundColor: 'rgba(251, 251, 251, 0.15)' }} />
                                            </div>
                                        </a>
                                    </MDBRipple>
                                    <MDBCardBody>
                                        <div className="content" style={{ transition: 'filter 0.3s ease' }}>
                                            <h5
                                                className="card-title mb-3 text-center text-reset"
                                                style={{
                                                    whiteSpace: 'nowrap',
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                }}
                                            >
                                                {product.productName}
                                            </h5>
                                            <h6 className="mb-3 text-center">
                                                {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                            </h6>
                                        </div>

                                        <div
                                            className="hover-buttons"
                                            style={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                gap: '10px',
                                                marginTop: '15px',
                                                opacity: 0,
                                                transition: 'opacity 0.3s ease',
                                            }}
                                        >
                                            <MDBBtn
                                                outline
                                                rounded
                                                color="dark"
                                                onClick={() => handleNavigate(`/detailprd/${product.id}`)}
                                            >
                                                <i className="bi bi-eye"></i>
                                            </MDBBtn>

                                            <MDBBtn outline rounded color="dark" onClick={() => handleAddcart(product)}>
                                                <i className="bi bi-cart-plus"></i>
                                            </MDBBtn>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            <div className="container" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                <hr style={{ width: '300px', margin: 'auto', borderTop: '2px solid #42210B' }} />
                <br />
                <Pagination
                    current={currentPage}
                    total={filteredProducts.length}
                    pageSize={productsPerPage}
                    onChange={handlePageChange}
                />
            </div>



            <Footer />
        </>
    );

}

export default Shop;