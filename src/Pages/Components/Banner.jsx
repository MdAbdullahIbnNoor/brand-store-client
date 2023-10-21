import React from 'react'
import bannar from "./../../assets/banner.jpg"

const Banner = () => {
  return (
    <div>
        <div>
            <div className="hero min-h-[500px] lg:min-h-[930px]" style={{ backgroundImage: `url(${bannar})` }}>
                <div className="hero-overlay bg-opacity-10"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="flex max-w-screen-2xl" data-aos="fade-left">
                        <div className='w-3/4 order-1 text-center mx-auto'>
                            {/* <h1 className="mb-5 text-3xl lg:text-6xl font-bold text-white pt-20">Elevate Your Lifestyle with Cutting-Edge Electronics</h1>
                            <p className="mb-10 lg:text-2xl text-gray-100">Experience a world of technological marvels, where every device is designed to enhance your daily life and keep you connected in exciting new ways.</p> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Banner