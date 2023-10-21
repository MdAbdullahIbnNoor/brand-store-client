import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyCart = () => {
    const cartProducts = useLoaderData();
    const [myProducts, setMyProducts] = useState(cartProducts)

    const handleDelete = _id => {
        console.log(_id);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {


                fetch(`https://brand-store-server-rouge.vercel.app/cartProducts/${_id}`, {
                    method: 'DELETE'
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire(
                                'Deleted!',
                                'Your Product has been deleted.',
                                'success'
                            )
                            const remaining = myProducts.filter(cof => cof._id !== _id);
                            setMyProducts(remaining);
                        }
                    })

            }
        })
    }

    // Calculate the total price
    // const totalPrice = cartProducts.reduce((total, product) => total + parseInt(product.price), 0);

    return (
        <div>
            <div className="lg:max-w-lg max-w-md mx-auto my-16 bg-white rounded-lg overflow-hidden md:max-w-lg border border-gray-400">
                <div className="px-4 py-2 border-b border-gray-200">
                    <h2 className="font-semibold text-gray-800">Shopping Cart</h2>
                </div>
                <div className="flex flex-col divide-y divide-gray-200">
                    {cartProducts.map((product) => (
                        <div className="flex items-center py-4 px-6" key={product.name}>
                            <img
                                className="w-16 h-16 object-cover rounded"
                                src={product.photo}
                                alt="Product Image"
                            />
                            <div className="ml-3">
                                <h3 className="text-gray-900 font-semibold">{product.name}</h3>
                                <p className="text-gray-700 mt-1">${product.price}</p>
                            </div>
                            <button onClick={() => handleDelete(product._id)} className="ml-auto py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg">
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className="flex items-center justify-between px-6 py-3 bg-gray-100">
                    <h3 className="text-gray-900 font-semibold">Total: $</h3>
                    <button className="py-2 px-4 bg-blue-500 hover-bg-blue-600 text-white rounded-lg">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MyCart;
