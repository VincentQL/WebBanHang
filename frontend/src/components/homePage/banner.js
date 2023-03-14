/* eslint-disable jsx-a11y/alt-text */
import React, { Component } from "react";
import "slick-carousel/slick/slick.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const StyledHomeBanner = styled.div`
    .div-banner {
.banner {
    height: 750px;
}


    }
    .slick-dots {
    display: none !important;
    background-color: white !important;
    
}
.slick-dots ul{
    margin: 0 !important;
}
`


class HomeBanner extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        var settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 2000,
            appendDots: dots => (
                <div>
                    <ul style={{ margin: "-100px -80% 0 0" }}> {dots} </ul>
                </div>
            ),

        };
        return (
            <StyledHomeBanner className="div-banner">

                <Slider {...settings}>
                    {/* <div>
                        {<img src="https://file.hstatic.net/200000000131/collection/mdw1-bannerhome-d_d67ed57f13044241b5a8b781dfdd2511.jpg" alt="bannerTree" className="banner" />}
                    </div> */}
                    <div>
                        {<img src="https://js0fpsb45jobj.vcdn.cloud/storage/upload/media/banner/2023/03022023/07/top-1600x635.png" alt="bannerTree" className="banner" />}
                    </div>
                    <div>
                        {<img src="https://theme.hstatic.net/200000182297/1000887316/14/ms_banner_img1.jpg?v=510" alt="bannerTree" className="banner" />}
                    </div>
                </Slider>
            </StyledHomeBanner>
        );
    }
}


export default HomeBanner;