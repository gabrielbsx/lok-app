import React from 'react';
import { Carousel } from 'flowbite-react';
import { motion } from 'framer-motion';
import Slide02 from '../assets/images/pst.jpg';

function Slider() {
    return (
        <div className="h-96 sm:h-56 xl:h-96 2xl:h-96 w-100">
            <Carousel>
                <img src={Slide02} loading="lazy" />
            </Carousel>
        </div>
    );
}

export default Slider;