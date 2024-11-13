
import Swal from 'sweetalert2';

const AddProductPage = () => {

  const handleAddProduct = event => {
    event.preventDefault();
    const form = event.target;

    const photo = form.photo.value;
    const name = form.name.value;
    const brand = form.brand.value;
    const category = form.category.value;
    const price = form.price.value;
    const shortDescription = form.shortDescription.value;
    const fullDescription = form.fullDescription.value;
    const rating = form.rating.value;
    const stock = form.stock.value;
    const discount = form.discount.value;
    const colors = Array.from(form.colors.selectedOptions, option => option.value);
    const warranty = form.warranty.value;
    const driverSize = form.driverSize.value;
    const batteryLife = form.batteryLife.value;
    const connectivity = form.connectivity.value;
    const videoUrl = form.videoUrl.value;
    const images = Array.from(form.images.files).map(file => URL.createObjectURL(file));  // For handling image uploads

    const newProduct = {
      name, brand, category, price, shortDescription, fullDescription, rating, photo, stock,
      discount, colors, warranty, driverSize, batteryLife, connectivity, videoUrl, images
    };

    console.log(newProduct);

    fetch('http://localhost:3000/products', {
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
            text: 'Product Added Successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        }
      })
    form.reset();
  }

  return (
    <div className='my-12'>
      <h2 className='text-4xl font-bold text-center mb-10'>Add Product Here:</h2>
      <div className="max-w-screen-lg mx-auto p-4 bg-[#EEEEEE] rounded-lg shadow-md flex flex-col lg:flex-row space-y-4 lg:space-y-0 justify-center items-start lg:justify-between gap-10">
        <div className="w-full lg:w-1/2">
          <img
            src="https://images.unsplash.com/photo-1603389335957-10bea39c9d32?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Product Image"
            className="bg-[#EEEEEE] rounded-lg my-4 lg:my-0 lg:ml-10 lg:h-[700px]"
          />
        </div>
        <div className="w-full lg:w-1/2 overflow-scroll h-[70vh]">
          <form className='w-full lg:w-full' onSubmit={handleAddProduct}>
            {/* Product Image URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Image URL:</label>
              <input
                type="text"
                name="photo"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Product Name:</label>
              <input
                type="text"
                name="name"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Product Brand */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Brand Name:</label>
              <select
                name="brand"
                className="w-full border rounded-md p-2"
              >
                <option value="Apple">Apple</option>
                <option value="Samsung">Samsung</option>
                <option value="Sony">Sony</option>
                <option value="Google">Google</option>
                <option value="Asus">Asus</option>
                <option value="Xiaomi">Xiaomi</option>
              </select>
            </div>
            {/* Product Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Category:</label>
              <select
                name="category"
                className="w-full border rounded-md p-2"
              >
                <option value="headphones">Headphones</option>
                <option value="smartphone">Smartphone</option>
                <option value="laptop">Laptop</option>
                <option value="tablet">Tablet</option>
                <option value="computer">Computer</option>
                <option value="television">Television</option>
                <option value="speaker">Speaker</option>
              </select>
            </div>
            {/* Product Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Price:</label>
              <input
                type="number"
                name="price"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Short Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Short Description:</label>
              <textarea
                name="shortDescription"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Full Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Full Description:</label>
              <textarea
                name="fullDescription"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Rating */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Rating (1-5):</label>
              <input
                type="number"
                name="rating"
                min="1"
                max="5"
                step="0.1"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Stock */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Stock:</label>
              <input
                type="number"
                name="stock"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Discount */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Discount (%):</label>
              <input
                type="number"
                name="discount"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Warranty */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Warranty (in years):</label>
              <input
                type="text"
                name="warranty"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Product Specifications */}
            <h3 className="text-xl font-semibold mt-4 mb-2">Product Specifications</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Driver Size:</label>
              <input
                type="text"
                name="driverSize"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Battery Life:</label>
              <input
                type="text"
                name="batteryLife"
                className="w-full border rounded-md p-2"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Connectivity:</label>
              <input
                type="text"
                name="connectivity"
                className="w-full border rounded-md p-2"
              />
            </div>
            {/* Product Color Options */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Available Colors:</label>
              <select
                name="colors"
                multiple
                className="w-full border rounded-md p-2"
              >
                <option value="red">Red</option>
                <option value="yellow">Yellow</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
                <option value="white">White</option>
              </select>
            </div>
            {/* Video URL */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Video URL:</label>
              <input
                type="text"
                name="videoUrl"
                className="w-full border rounded-md p-2"
              />
            </div>

            {/* Product Image Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-left mb-1">Product Images:</label>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                className="w-full border rounded-md p-2"
              />
              <p className="text-xs text-gray-500 mt-1">You can upload multiple images.</p>
            </div>

            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md font-medium text-left hover:bg-blue-600"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProductPage;