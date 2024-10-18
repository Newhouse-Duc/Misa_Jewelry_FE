

import React from "react";
import Banner from "../../components/Banner";
import Bestseller from "../../components/Bestseller";
import Blogandtip from "../../components/Blog_tip";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Slogan from "../../components/Slogan";


const Home = () => {

    return (
        <>

            <Header />

            <Banner />
            <br></br>
            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        <div class="row gx-5 gy-4">

                            <div class="col-md-8 col-12">
                                <div class="position-relative overflow-hidden rounded-3 shadow-lg">
                                    <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about_1.jpg?1723393750526" alt="Image 1" class="img-fluid w-100 h-auto object-fit-cover" />

                                    <div class="position-absolute bottom-0 start-0 w-100 bg-dark bg-opacity-50 text-white p-3 d-none d-md-block">
                                        <h5 class="mb-0">Khám phá vẻ đẹp của trang sức</h5>
                                    </div>
                                </div>
                            </div>


                            <div class="col-md-4 col-12 text-center d-flex flex-column justify-content-center">
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about_2.jpg?1723393750526" alt="Image 2" class="img-fluid rounded-3 mb-4 shadow-lg" />
                                <div class="p-3 bg-light rounded-3 shadow">
                                    <h2 class="text-uppercase fw-bold mb-3 text-dark">Trang sức thể hiện đẳng cấp</h2>
                                    <p class="text-muted">Cuộc sống ngắn ngủi, đừng ngần ngại thể hiện bản thân bằng những món trang sức tinh tế và sang trọng.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div class="container text-center my-5">
                <Slogan />
            </div>

            <div class="container py-5">
                <div class="row justify-content-center">
                    <div class="col-xl-10">
                        <div class="row gx-5 gy-4">

                            <div class="col-md-4 col-12 d-flex flex-column">
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about3_2.jpg?1723393750526" alt="Image 3" class="img-fluid rounded-3 mb-4 shadow-lg" />
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about3_3.jpg?1723393750526" alt="Image 4" class="img-fluid rounded-3 shadow-lg" />
                            </div>


                            <div class="col-md-8 col-12">
                                <div class="position-relative overflow-hidden">
                                    <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about3_1.jpg?1723393750526" alt="Image 5" class="img-fluid w-100 h-100 object-fit-cover rounded-3 shadow-lg" />


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <Bestseller />
            <br></br>
            <Blogandtip />
            <Footer />
        </>
    )
}

export default Home;