import React from "react";

const Footer = (props) => {
    return (
        <>
            <hr></hr>
            <div className='text-center text-lg-start text-muted' bgColor='light'>

                <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
                    <div className='me-5 d-none d-lg-block'>
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <a href='' className='me-4 text-reset'>
                            <i class="bi bi-facebook"></i>
                        </a>
                        <a href='#' className='me-4 text-reset'>
                            <i class="bi bi-google"></i>
                        </a>
                        <a href='#' className='me-4 text-reset'>
                            <i class="bi bi-instagram"></i>
                        </a>
                        <a href='#' className='me-4 text-reset'>
                            <i class="bi bi-twitter"></i>
                        </a>
                        <a href='#' className='me-4 text-reset'>
                            <i class="bi bi-github"></i>
                        </a>

                    </div>

                </section>

                <div class="container">

                    <br></br>
                    <div class="row mb-5">
                        <div class="col-md">
                            <div class="ftco-footer-widget mb-4">
                                <h6 className='text-uppercase fw-bold mb-4'>Misa</h6>
                                <p>Luôn đem đến sản phẩm tốt nhất cho bạn </p>
                                <ul class="ftco-footer-social list-unstyled float-md-left float-lft mt-5">
                                    <li class="ftco-animate"><a href="#"><span class="icon-twitter"></span></a></li>
                                    <li class="ftco-animate"><a href="#"><span class="icon-facebook"></span></a></li>
                                    <li class="ftco-animate"><a href="#"><span class="icon-instagram"></span></a></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md  ">
                            <div class="ftco-footer-widget mb-4 ml-md-5  text-center ">
                                <h6 class="ftco-heading-2 ">Menu</h6>
                                <ul class="list-unstyled">
                                    <li><span href="#" class="py-2 d-block">Shop</span></li>
                                    <li><span href="#" class="py-2 d-block">About</span></li>
                                    <li><span href="#" class="py-2 d-block">Contact</span></li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-md ">
                            <div class="ftco-footer-widget mb-4 text-center">
                                <h6 class="ftco-heading-2">Giúp đỡ</h6>
                                <div class="d-flex justify-content-center">
                                    <ul class="list-unstyled mr-l-5 pr-l-3 mr-4">
                                        <li><span href="#" class="py-2 d-block">Thông tin vận chuyển</span></li>
                                        <li><span href="#" class="py-2 d-block">Chính sách bảo mật</span></li>
                                    </ul>

                                </div>
                            </div>
                        </div>

                        <div class="col-md">
                            <div class="ftco-footer-widget mb-4">
                                <h6 class="ftco-heading-2">Bất kì câu hỏi nào ?</h6>
                                <div class="block-23 mb-3">
                                    <ul class='list-unstyled'>
                                        <li> <span><i class="bi bi-geo-alt"></i></span><span class="text"> Đông Anh - Hà Nội</span></li>
                                        <li><span class="icon icon-phone"><i class="bi bi-telephone"></i></span><span class="text"> 2 392 3929 210</span></li>
                                        <li><span class="icon icon-envelope"><i class="bi bi-envelope"></i></span><span class="text" /> nnquan@gmail.com</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row">

                    </div>
                </div>

            </div>
        </>
    )
}

export default Footer;