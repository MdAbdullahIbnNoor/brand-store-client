
import { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom'
import { Link } from 'react-router-dom';

const BrandDetails = () => {

    const products = useLoaderData();
    const [brandName, setBrandName] = useState([]);
    const { brand } = useParams();

    // const [loadedProduct, setLoadedProducts] = useState([])
    console.log(brand, products);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/data.json');
                console.log(response);
                if (response.ok) {
                    const data = await response.json();
                    const filteredData = data.filter(item => item.brand_name === brand);
                    setBrandName(filteredData[0]);
                    console.log(filteredData[0]);
                } else {
                    console.error('Failed to fetch data from data.json');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [brand]);


    // const newProducts = products.filter(prod => prod.brand === name);
    // setLoadedProducts(newProducts);
    // console.log(brandName.ad_img1);
    // const productCategory = brandName[0]
    // console.log(productCategory);

    return (
        <div>
            <div className="carousel max-w-screen-xl mx-36 h-[450px]">
                <div id="slide1" className="carousel-item relative w-full">
                    <img src={brandName.ad_img1} className="w-full object-cover" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide3" className="btn btn-circle">❮</a>
                        <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <img src={brandName.ad_img2} className="w-full object-cover" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide1" className="btn btn-circle">❮</a>
                        <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                </div>
                <div id="slide3" className="carousel-item relative w-full">
                    <img src={brandName.ad_img3} className="w-full object-cover" />
                    <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a href="#slide2" className="btn btn-circle">❮</a>
                        <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                </div>
            </div>
            <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
                <div className="grid gap-8 row-gap-5 md:grid-cols-2">
                    {
                        products && products.map(product => (
                            <div key={product._id} className="flex max-w-md overflow-hidden bg-white rounded-lg shadow-lg">
                                <div className="w-1/3 bg-cover" style={{ backgroundImage: `url(${product.photo}` }}></div>
                                <div className="w-2/3 p-4 md:p-4">
                                    <h1 className="text-xl font-bold text-gray-800 text-left">{product.name}</h1>
                                    <p className="mt-2 text-base font-medium text-gray-600 text-left">{product.brand}</p>
                                    <p className="mt-2 text-base font-medium text-gray-600 text-left">{product.type}</p>

                                    <div className="flex mt-2 items-center">
                                        <span></span>
                                        {Array.from({ length: parseInt(product.rating, 10) }, (_, index) => (
                                            <svg
                                                key={index}
                                                className="w-5 h-5 text-amber-500 fill-current"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                            </svg>
                                        ))}
                                    </div>

                                    <div className="flex justify-between mt-3 item-center">
                                        <h1 className="text-lg font-bold text-gray-700 md:text-xl">${product.price}</h1>
                                        <div className='flex'>
                                            <Link to={`/productDetails/${product._id}`}>
                                                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 m-2">Details</button>
                                            </Link>
                                            <Link to={`/updateDetails/${product._id}`}>
                                                <button className="px-2 py-1 text-xs font-bold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none focus:bg-gray-700 m-2">Update</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}
export default BrandDetails