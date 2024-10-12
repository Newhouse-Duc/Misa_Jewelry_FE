import React from "react";
import Carousel from 'react-bootstrap/Carousel';


const Banner = () => {
    return (
        <Carousel className="banner-carousel" interval={3000} controls={true} indicators={false}  >
            <Carousel.Item >
                <img src='https://pos.nvncdn.com/7be01f-86410/bn/20220805_v2nu0NyvKj6pJCL11a8kFl3g.jpg' className="d-block w-100 img-fluid" alt="First slide" />

            </Carousel.Item>
            <Carousel.Item>
                <img src='https://pos.nvncdn.com/7be01f-86410/bn/20220805_o6i5HTjXcaYoJzBsmZkdNVHS.jpg' className="d-block w-100 img-fluid" alt="Second slide" />

            </Carousel.Item>
            <Carousel.Item >
                <img src='https://pos.nvncdn.com/7be01f-86410/bn/20220805_p8MIELiM6mk3aGNtIEdxblXX.jpg' className="d-block w-100 img-fluid" alt="Third slide" />

            </Carousel.Item>
        </Carousel>
    );
}

export default Banner;
