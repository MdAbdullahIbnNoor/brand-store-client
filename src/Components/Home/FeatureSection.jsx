import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

import './style.css';


import banner_1 from '../../assets/PromotionalBanner/banner-1.jpg';
import banner_2 from '../../assets/PromotionalBanner/banner-2.jpg';
import banner_3 from '../../assets/PromotionalBanner/banner-3.jpg';
import banner_4 from '../../assets/PromotionalBanner/banner-4.jpg';
import banner_5 from '../../assets/PromotionalBanner/banner-5.jpg';
import banner_6 from '../../assets/PromotionalBanner/banner-6.jpg';

// ------------------------product---img--------------------------------



const FeatureSection = () => {
    return (
        <section className="my-24 px-36">
            <h2 className="text-3xl font-bold text-center mb-8">Featuring</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Carousel in the first grid item with 2-column span */}
                <div className="col-span-2 row-span-2 aspect-[16/9] relative">
                    <Swiper

                        pagination={true}
                        modules={[Autoplay, Pagination]}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        className="mySwiper w-full h-full rounded-lg overflow-hidden"
                    >
                        <SwiperSlide>
                            <img
                                src={banner_1}
                                alt="Offer 1"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={banner_6}
                                alt="Offer 2"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img
                                src={banner_4}
                                alt="Offer 3"
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Static images in other grid items */}
                <div className="aspect-[16/9]">
                    <img
                        src={banner_4}
                        alt="Featured Product 4"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="aspect-[16/9]">
                    <img
                        src={banner_5}
                        alt="Featured Product 5"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="aspect-[16/9]">
                    <img
                        src={banner_2}
                        alt="Featured Product 6"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="aspect-[16/9]">
                    <img
                        src={banner_3}
                        alt="Featured Product 7"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default FeatureSection;
