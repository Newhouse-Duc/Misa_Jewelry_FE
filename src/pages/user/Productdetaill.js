import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { MDBBtn } from 'mdb-react-ui-kit';
import { message, Image } from 'antd';
import { getproductbyId } from "../../redux/slices/productSlices";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { addTocart } from "../../redux/slices/cartSlices";
import Bestseller from "../../components/Bestseller";
const DetailProduct = (props) => {
    const { id } = useParams();

    const dispatch = useDispatch();

    const product = useSelector((state) => state.product.product);
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [quantity, setQuantity] = useState(1);
    const handleAddcart = () => {

        message.success("thêm giỏ hàng thành công ")
        dispatch(addTocart({
            id: product.id,
            productName: product.productName,
            price: product.price,
            img: product.img,
            quantity: quantity,
        }));
    }
    const increaseQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };
    useEffect(() => {

        if (id) {
            dispatch(getproductbyId({ id }));
        }
    }, [id, dispatch]);
    return (
        <>
            <Header />

            <section className="py-5">
                <div className="container">
                    <div className="row gx-5">

                        <aside className="col-lg-6 d-flex justify-content-center align-items-center">
                            <div
                                className="rounded-4 mb-3 shadow-sm"
                                style={{
                                    width: "100%",

                                    backgroundColor: "#f8f8f8",
                                    border: "1px solid #e3e3e3",
                                    borderRadius: "12px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }}
                            >
                                {product && product.img ? (
                                    <Image
                                        width="100%"
                                        height="100%"
                                        src={product.img}
                                        alt="Product Image"
                                        style={{ objectFit: "contain", borderRadius: "8px" }}
                                    />
                                ) : (
                                    <p style={{ color: "#999" }}>Image not available</p>
                                )}
                            </div>
                        </aside>


                        <main className="col-lg-6">
                            <div className="ps-lg-4">

                                <h4 className="text-dark mb-3 fw-bold">
                                    {product && product.productName ? (
                                        <span>{product.productName}</span>
                                    ) : (
                                        <p>Name not available</p>
                                    )}
                                </h4>


                                <div className="d-flex flex-row align-items-center my-3">
                                    <div className="text-warning mb-1 me-2" style={{ fontSize: "1.2rem" }}>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fa fa-star"></i>
                                        <i className="fas fa-star-half-alt"></i>
                                        <span className="ms-1 text-muted" style={{ fontSize: "1rem" }}>4.5</span>
                                    </div>
                                    <span className="text-muted ms-3" style={{ fontSize: "1rem" }}>
                                        <i className="fas fa-shopping-basket fa-sm mx-1"></i>154 đặt hàng
                                    </span>
                                </div>

                                <div className="mb-3">
                                    {product && product.price ? (
                                        <span
                                            className="h4"
                                            style={{
                                                fontWeight: "bold",
                                                fontSize: "2rem",
                                                color: "#ff3e00",
                                            }}
                                        >
                                            {product.price.toLocaleString('vi-VN')} VNĐ
                                        </span>
                                    ) : (
                                        <p>Price not available</p>
                                    )}
                                </div>


                                <div className="mb-4">
                                    {product && product.description ? (
                                        <div
                                            style={{ fontSize: "1rem", color: "#666", lineHeight: "1.7" }}
                                            dangerouslySetInnerHTML={{ __html: product.description }}
                                        />
                                    ) : (
                                        <p>Detail not available</p>
                                    )}
                                </div>


                                <div className="mt-4">
                                    <h6 className="fw-bold">Chính sách vận chuyển và đổi trả</h6>
                                    <ul style={{ fontSize: "0.9rem", color: "#666", paddingLeft: "1.5rem" }}>
                                        <li>Miễn phí vận chuyển với đơn hàng trên 500,000 VNĐ</li>
                                        <li>Đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi</li>
                                        <li>Liên hệ: 1900-1234 để được hỗ trợ</li>
                                    </ul>
                                </div>

                                <hr />


                                <div className="row mb-4">
                                    <div className="col-md-6 col-6 mb-3">
                                        <label className="mb-2 d-block fw-bold">Số lượng</label>
                                        <div className="input-group" style={{ width: "170px" }}>
                                            <button className="btn btn-outline-secondary px-3" type="button" onClick={decreaseQuantity}>
                                                <i className="bi bi-dash-square"></i>
                                            </button>
                                            <input
                                                type="text"
                                                className="form-control text-center"
                                                value={quantity}
                                                readOnly
                                                style={{ borderRadius: "0 0" }}
                                            />
                                            <button className="btn btn-outline-secondary px-3" type="button" onClick={increaseQuantity}>
                                                <i className="bi bi-plus-square"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>


                                <MDBBtn
                                    outline
                                    className=" btn-lg w-100"
                                    color="danger"
                                    onClick={handleAddcart}
                                    style={{
                                        padding: "0.75rem 1.5rem",
                                        fontSize: "1rem",
                                        borderRadius: "8px",
                                    }}
                                >
                                    <i className="bi bi-cart-plus me-2"></i> Thêm vào giỏ hàng
                                </MDBBtn>



                                <div
                                    className="mt-4 p-4 rounded-3 shadow-sm"
                                    style={{
                                        backgroundColor: '#fafafa',
                                        border: '1px solid #eaeaea',
                                        marginTop: '2rem',
                                        textAlign: 'center',
                                    }}
                                >
                                    <textarea
                                        placeholder="Nhập đánh giá của bạn..."
                                        rows="4"
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            fontSize: '1rem',
                                            borderRadius: '8px',
                                            border: '1px solid #ccc',
                                            marginBottom: '15px',
                                            resize: 'none',
                                        }}
                                    />
                                    <button
                                        className="btn btn-primary"
                                        style={{
                                            padding: '10px 20px',
                                            fontSize: '1rem',
                                            color: '#fff',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Gửi đánh giá
                                    </button>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
            </section>


            <Bestseller />

            <Footer />
        </>
    );
}


export default DetailProduct;