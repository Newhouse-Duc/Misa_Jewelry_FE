

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
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-10 ftco-animate">
                        <div class="row">
                            <div class="col-md-8 col-sm-6  d-flex flex-column">
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about_1.jpg?1723393750526" alt="Image 1" class="img-fluid h-100" />
                            </div>
                            <div class="col-md-4 col-sm-6">
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about_2.jpg?1723393750526" alt="Image 2" class="img-fluid" />
                                <div class="d-none d-md-block">
                                    <h2 class="text-center mb-4">Đeo trang sức là cách thể hiện bạn mà không cần một lời nói nào</h2>
                                    <p class="text-center mb-4">Cuộc sống có bao lâu mà chần chờ, hãy cứ đeo trang sức như chưa từng được đeo nhé.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br></br>
            <div>

                <Slogan />
            </div>
            <br></br>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-xl-10 ftco-animate">
                        <div class="row">
                            <div class="col-md-4 col-sm-6 d-flex flex-column">
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about3_2.jpg?1723393750526" alt="Image 1" class="img-fluid mb-3" />
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about3_3.jpg?1723393750526" alt="Image 2" class="img-fluid" />
                            </div>
                            <div class="col-md-8 col-sm-6">
                                <img src="https://bizweb.dktcdn.net/100/302/551/themes/758295/assets/service_about3_1.jpg?1723393750526" alt="Image 3" class="img-fluid h-100" />
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