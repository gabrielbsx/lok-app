import React from 'react';
import { Carousel } from 'flowbite-react';
import { motion } from 'framer-motion';
import Slide02 from '../assets/images/pst.jpg';

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "../assets/css/swiperStyle.css";

import { Autoplay, Pagination, Navigation } from "swiper";

function Slider() {

    const images = [
        import('../assets/images/history_01.png'),
        import('../assets/images/history_02.png'),
        import('../assets/images/history_03.png'),
        import('../assets/images/history_04.png'),
    ]

    return (
        // <div className="h-96 sm:h-56 xl:h-96 2xl:h-96 w-100">
        // <div className="h-96 w-96">
        //     <Carousel>
        //         <img src={Slide02} loading="lazy" />
        //         <img src={Slide02} loading="lazy" />
        //         <img src={Slide02} loading="lazy" />
        //         <img src={Slide02} loading="lazy" />
        //     </Carousel>
        // </div>
        <>
            <Swiper 
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-3/6 pt-12 "
            >
                <SwiperSlide className=' opacity-60'><img src={Slide02} loading="lazy" /></SwiperSlide>
                <SwiperSlide className=' opacity-60'><img src={Slide02} loading="lazy" /></SwiperSlide>
                <SwiperSlide className=' opacity-60'><img src={Slide02} loading="lazy" /></SwiperSlide>
                <SwiperSlide className=' opacity-60'><img src={Slide02} loading="lazy" /></SwiperSlide>
            </Swiper>
        </>
    );
}

export default Slider;