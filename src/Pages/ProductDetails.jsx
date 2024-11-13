import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Swal from 'sweetalert2';
import { useEffect, useState } from "react";
import { format } from "date-fns";
import styles from './ProductDetails.css'


const ProductDetails = () => {
    const { id } = useParams();
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [ratings, setRatings] = useState(5);
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(0);


    // Fetch product data using React Query
    const { data: product, isLoading, error } = useQuery({
        queryKey: ["product", id],
        queryFn: () =>
            fetch(`http://localhost:3000/products/${id}`).then(res => res.json())
    });

    useEffect(() => {
        if (product?.price) {
            setTotalPrice(product.price * quantity);
        }
    }, [product, quantity]);


    const updateTotalPrice = (newQuantity) => {
        if (product?.price) {
            setTotalPrice(product.price * newQuantity);
        }
    };

    // Increment quantity
    const incrementQuantity = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        updateTotalPrice(newQuantity);
    };

    // Decrement quantity (ensure it doesn't go below 1)
    const decrementQuantity = () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            updateTotalPrice(newQuantity);
        }
    };

    // Default avatar URL
    const defaultAvatar = "https://i.ibb.co/JzCmTqc/oliver-ragfelt-kh-V4f-Ty6-D8-unsplash.jpg";

    // Image loading handler
    const handleImageLoad = () => {
        // Check if all images have loaded
        setImagesLoaded(true);
    };

    // Handle form submission for adding a new review
    const handleSubmit = (e) => {
        e.preventDefault();
        const review = {
            name: "User",
            avatar: "https://i.ibb.co/JzCmTqc/oliver-ragfelt-kh-V4f-Ty6-D8-unsplash.jpg",
            rating,
            comment: newComment,
            date: new Date().toISOString()
        };
        onAddReview(review); // Callback to add review to the list
        setNewComment("");
        setRating(5);
    };

    if (isLoading) return <p>Loading product details...</p>;
    if (error) return <p>Something went wrong: {error.message}</p>;

    const {
        photo, images = [], name, brand, category, price, rating,
        shortDescription, fullDescription, specifications, stock,
        discount, colors, warranty, reviews, videoUrl
    } = product || {};


    console.log({ product });

    // Add product to cart function
    const handleMyCart = () => {
        fetch('http://localhost:3000/cartProducts', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Added To Cart Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    });
                }
            });
    };

    return (
        <div className="bg-gray-100 py-8">
            <div className="lg:max-w-full mx-auto px-4 sm:px-6 lg:px-24">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4 flex lg:flex-row-reverse flex-col lg:items-start md:gap-8 lg:gap-10">
                        <div className="md:h-[40vh] lg:h-[60vh] rounded-lg mb-4">
                            <img
                                className="w-full h-full md:object-cover lg:object-center lg:aspect-video "
                                src={photo}
                                alt="Product Image"
                                onError={() => console.error("Main image failed to load")}
                            />
                        </div>
                        <div className="flex lg:flex-col flex-row space-x-2 lg:space-x-0 lg:space-y-8 lg:justify-center lg:items-center mb-4">
                            {images?.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt={`Additional image ${index + 1}`}
                                    className="w-20 h-20 lg:w-40 lg:h-40 object-cover rounded aspect-video"
                                    onError={() => console.error(`Image ${index + 1} failed to load`)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-3/12 md:w-1/2 px-4">
                        <h2 className="text-2xl font-bold text-gray-800  mb-2">{name}</h2>
                        <p className="text-gray-600 text-sm mb-4">Brand: <span className="text-gray-900 text-lg font-semibold">{brand}</span></p>
                        <p className="text-gray-600 text-sm mb-4">Category: <span className="text-gray-900 text-base font-semibold uppercase">{category}</span></p>
                        <div className="flex mb-4 items-center">
                            <div className="mr-4">
                                <span className="font-bold text-gray-700">Price:</span>
                                <span className="text-red-600 ml-2 text-2xl font-medium">&#2547; {price}</span>
                                {discount && (
                                    <span className="text-green-600 ml-2 font-semibold">({discount}% off)</span>
                                )}
                            </div>
                            <br />
                            <div>
                                <span className="font-bold text-gray-700">Stock:</span>
                                <span className="text-gray-600 ml-2">{stock > 0 ? `${stock} available` : 'Out of stock'}</span>
                            </div>
                        </div>
                        <div className="mb-4">
                            <div className="flex mt-2 items-center">
                                <span className="text-blue-600 text-lg mr-3">Rating: </span>
                                <span className="text-gray-600 text-lg font-semibold mr-2">{rating}</span>
                                {Array.from({ length: Math.floor(rating) }, (_, index) => (
                                    <svg key={index} className="w-6 h-6 text-amber-500 fill-current" viewBox="0 0 24 24">
                                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                    </svg>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700">Colors Available:</span>
                            <div className="flex mt-2 space-x-2">
                                {colors.map((color, index) => (
                                    <span
                                        key={index}
                                        className="inline-block w-6 h-6 rounded-full"
                                        style={{ backgroundColor: color }}
                                        title={color}
                                    ></span>
                                ))}

                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-700 mb-4">Product Description:</span>
                            <p className="text-gray-600 text-sm mt-2 mb-4">{shortDescription}</p>
                            <p className="text-gray-600 text-sm">{fullDescription}</p>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700">Specifications:</span>
                            <ul className="text-gray-600 text-sm mt-2">
                                {Object.entries(specifications).map(([key, value]) => (
                                    <li key={key}><span className="capitalize">{key}:</span> {value}</li>
                                ))}
                            </ul>
                        </div>
                        <div className="mb-4">
                            <span className="font-bold text-gray-700">Warranty:</span>
                            <p className="text-gray-600 text-sm">{warranty}</p>
                        </div>

                        {/* Quantity and Total Price Section */}
                        <div className="flex items-center gap-10">
                            <div className="flex items-center mb-4">
                                <button
                                    onClick={decrementQuantity}
                                    className="px-3 py-1 bg-gray-300 rounded-l text-gray-700"
                                >
                                    -
                                </button>
                                <input
                                    type="text"
                                    value={quantity}
                                    readOnly
                                    className="w-10 text-center border-t border-b border-gray-300 py-1"
                                />
                                <button
                                    onClick={incrementQuantity}
                                    className="px-3 py-1 bg-gray-300 rounded-r text-gray-700"
                                >
                                    +
                                </button>
                            </div>

                            <div className="mb-4">
                                <span className="font-bold text-gray-700">Total Price:</span>
                                <span className="text-red-600 ml-2 text-xl font-bold">&#2547;{totalPrice.toFixed(2)}</span>
                            </div>
                        </div>


                        <div className="flex -mx-2 items-end">
                            <div className="w-full px-0">
                                <button onClick={handleMyCart} className="w-full bg-violet-700  text-white py-2 px-4 rounded-full font-bold hover:bg-violet-800 ">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex lg:flex-row flex-col lg:justify-normal lg:items-start lg:gap-10 lg:w-full">
                    {/* Video Section */}
                    {videoUrl && (
                        <div className="my-6">
                            <h2 className="text-lg font-bold mb-4">Product Video</h2>
                            <div className="aspect-video">
                                <iframe
                                    width="820"
                                    height="455"
                                    src={`https://www.youtube.com/embed/${new URL(videoUrl).searchParams.get("v")}`}
                                    title="YouTube video player"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>
                    )}

                    {/* Review Section */}
                    <div className="my-8 w-3/4">
                        <h3 className="font-bold text-gray-700 mb-4">Customer Reviews:</h3>
                        <div className="space-y-6 overflow-y-auto">
                            {reviews?.length > 0 ? (
                                reviews.map((review, index) => (
                                    <div key={index} className="border rounded-lg p-4 bg-white shadow-sm">
                                        <div className="flex items-center mb-2">
                                            <img
                                                src={review.avatar || defaultAvatar}
                                                alt="User avatar"
                                                className="w-10 h-10 rounded-full mr-3 object-cover"
                                            />
                                            <div>
                                                <h4 className="font-semibold text-gray-800">{review.userId}</h4>
                                                <span className="text-sm text-gray-500">
                                                    {format(new Date(review.reviewDate), "MMM dd, yyyy, hh:mm a")}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center mb-2">
                                            <p className="text-gray-600 text-sm font-semibold mr-2">Rating:</p>
                                            <div className="flex">
                                                {Array.from({ length: review.rating }, (_, i) => (
                                                    <svg
                                                        key={i}
                                                        className="w-5 h-5 text-yellow-500 fill-current"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                                                    </svg>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-700 text-sm">{review.comment}</p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-600">No reviews yet.</p>
                            )}
                        </div>

                        {/* Add a Review Section */}
                        <div className="mt-8">
                            <h4 className="font-semibold text-gray-800 mb-2">Leave a Review:</h4>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="rating">
                                        Rating:
                                    </label>
                                    <select
                                        id="rating"
                                        value={rating}
                                        onChange={(e) => setRating(parseInt(e.target.value))}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                    >
                                        {[5, 4, 3, 2, 1].map((value) => (
                                            <option key={value} value={value}>{`${value} Stars`}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-600 text-sm font-medium mb-1" htmlFor="comment">
                                        Comment:
                                    </label>
                                    <textarea
                                        id="comment"
                                        value={newComment}
                                        onChange={(e) => setNewComment(e.target.value)}
                                        className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                        rows="4"
                                        placeholder="Write your review here..."
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700"
                                >
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
