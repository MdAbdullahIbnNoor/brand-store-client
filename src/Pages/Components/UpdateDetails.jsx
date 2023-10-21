import React from 'react'
import { useLoaderData } from 'react-router-dom'
import Swal from 'sweetalert2';

const UpdateDetails = () => {

    const product = useLoaderData();

    console.log(product);
    const { _id, photo, name, brand, type, price, rating } = product

    const handleUpdateProduct = event => {
        event.preventDefault();
        const form = event.target;

        const photo = form.image.value;
        const name = form.name.value;
        const brand = form.brand.value;
        const type = form.type.value;
        const price = form.price.value;
        const rating = form.rating.value;

        const updatedProduct = { name, brand, type, price, rating, photo };

        console.log(updatedProduct);

        fetch(`https://brand-store-server-rouge.vercel.app/products/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Product Details Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'Cool'
                    })
                }
            })
        form.reset();
    }

    return (
        <div>
            <section className="p-8 bg-gray-50 text-gray-900 my-24">
                <form onSubmit={handleUpdateProduct} className="container mx-auto max-w-screen-2xl flex flex-col space-y-12">
                    <fieldset className="grid grid-cols-2 gap-6 p-8 rounded-md shadow-md">
                        <div className="space-y-2 col-span-full">
                            <p className="font-medium text-2xl">Product Information</p>
                            <p className="text-lg font-medium">Update details for the :{name}.</p>
                        </div>
                        <div className="grid grid-cols-6 gap-4 col-span-full">
                            <div className="col-span-full sm:col-span-3">
                                <label for="image" className="text-base text-left">Image</label>
                                <input id="image" type="text" defaultValue={photo} placeholder="Image URL" className="w-full rounded-md focus:ring-gray-700 text-gray-900 py-2 px-3 border-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="name" className="text-base text-left">Name</label>
                                <input id="name" type="text" defaultValue={name} placeholder="Name" className="w-full rounded-md focus:ring-gray-700 text-gray-900 py-2 px-3 border-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="brand" className="text-base text-left">Brand Name</label>
                                {/* <input id="brand" type="text" placeholder="Brand Name" className="w-full rounded-md focus:ring-gray-700 text-gray-900 py-2 px-3 border-2" /> */}
                                <select
                                    name="brand"
                                    className="w-full border rounded-md p-2"
                                    defaultValue={brand}
                                >
                                    <option value="Apple">Apple</option>
                                    <option value="Samsung">Samsung</option>
                                    <option value="Sony">Sony</option>
                                    <option value="Google">Google</option>
                                    <option value="Asus">Asus</option>
                                    <option value="Xiaomi">Xiaomi</option>
                                </select>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="type" className="text-base text-left">Type</label>
                                <select id="type" name="type" defaultValue={type} className="w-full rounded-md focus:ring-gray-700 text-gray-900 py-2 px-3 border-2">
                                    <option value="smartphone">Smartphone</option>
                                    <option value="computer">Computer</option>
                                    <option value="headphone">Headphone</option>
                                    <option value="laptop">Laptop</option>
                                    <option value="speaker">Speaker</option>
                                    <option value="tablet">Tablet</option>
                                    <option value="television">Television</option>
                                </select>
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="price" className="text-base text-left">Price</label>
                                <input id="price" type="number" defaultValue={price} placeholder="Price" className="w-full rounded-md focus:ring-gray-700 text-gray-900 py-2 px-3 border-2" />
                            </div>
                            <div className="col-span-full sm:col-span-3">
                                <label for="rating" className="text-base text-left">Rating</label>
                                <input id="rating" type="number" min="1" max="5" defaultValue={rating} placeholder="Rating" className="w-full rounded-md focus:ring-gray-700 text-gray-900 py-2 px-3 border-2" />
                            </div>
                        </div>
                    </fieldset>
                    <button type="submit" className="px-6 py-3 text-white bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 text-lg">
                        Update
                    </button>
                </form>
            </section>



        </div >
    )
}

export default UpdateDetails