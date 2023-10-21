
import { useLoaderData } from "react-router-dom";
import Swal from 'sweetalert2';

const ProductDetails = () => {

    const product = useLoaderData();

    const { photo, name, brand, type, price, rating, shortDescription } = product

    // Create a new object combining user.email and product details
    const newProduct = product

    const handleMyCart = () => {

        fetch('https://brand-store-server-rouge.vercel.app/cartProducts', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Added To Cart Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
    }
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                            <img className="w-full h-full object-cover" src={photo} alt="Product Image" />
                        </div>

                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{name}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {brand}
                        </p>
                        <div className="flex mb-4">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                                <span className="text-gray-600 dark:text-gray-300 ml-2 uppercase text-lg font-medium">${price}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-700 dark:text-gray-300">Type:</span>
                                <span className="text-gray-600 dark:text-gray-300 ml-2 uppercase text-lg">{type}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex mt-2 items-center">
                                <span className="text-white text-lg mr-3">Rating: </span>
                                {Array.from({ length: parseInt(rating, 10) }, (_, index) => (
                                    <svg
                                        key={index}
                                        className="w-6 h-6 text-amber-500 fill-current"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                    </svg>
                                ))}
                            </div>F
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2 mb-36">
                                {shortDescription}
                            </p>
                        </div>
                        <div className="flex -mx-2 items-end">
                            <div className="w-full">
                                <button onClick={() => handleMyCart()} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover-bg-gray-700">Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetails