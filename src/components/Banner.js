import React from "react";
import Carousel from 'react-bootstrap/Carousel';
import banner1 from "../../src/assets/banner1.png";
import banner2 from "../../src/assets/banner2.png";
import banner3 from "../../src/assets/banner3.png";

const Banner = () => {
    return (
        <Carousel
            className="banner-carousel"
            interval={3000}
            controls
            indicators={false}
            fade
        >
            <Carousel.Item>
                <div style={{ width: '100%', height: '100%', backgroundColor: "#f8f9fa", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={banner1}
                        className="img-fluid"
                        alt="First slide"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={{ width: '100%', height: '100%', backgroundColor: "#f8f9fa", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={banner2}
                        className="img-fluid"
                        alt="Second slide"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item>
                <div style={{ width: '100%', height: '100%', backgroundColor: "#f8f9fa", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img
                        src={banner3}
                        className="img-fluid"
                        alt="Third slide"
                        style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                </div>
            </Carousel.Item>
        </Carousel>

    );
}

export default Banner;
