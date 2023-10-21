import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Brands = () => {

    const [brands, setBrands] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('/data.json'); // Fetch the JSON file from the public folder
                if (response.ok) {
                    const data = await response.json();
                    setBrands(data); // Save the data in the state variable
                } else {
                    console.error('Failed to fetch data.json');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    return (
        <div className='max-w-screen-2xl mx-auto lg:my-24 my-8'>
            <h2 className='text-center font-bold text-3xl mb-12'>We offer you following Brands to choose from</h2>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-14 lg:mx-36 mx-12'>
                {
                    brands.map((brand) => (
                        <Link to={`/brandDetails/${brand.brand_name}`}>
                            <div
                                class="block rounded-lg bg-white shadow-lg ">

                                <img
                                    class="rounded-lg w-full h-60"
                                    src={brand.brand_img}
                                    alt="" />

                                <div class="p-6">
                                    <h5
                                        class="mb-1 text-xl font-bold leading-tight text-neutral-800">
                                        {brand.brand_name}
                                    </h5>
                                    <p class="mb-0 text-base text-neutral-600 ">
                                        {brand.short_description.slice(0,80)}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>

        </div >
    );
}
export default Brands
