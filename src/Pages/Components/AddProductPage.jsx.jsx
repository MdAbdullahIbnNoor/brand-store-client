import Swal from 'sweetalert2';

const AddProductPage = () => {

  const handleAddProduct = event => {
    event.preventDefault();
    const form = event.target;

    const photo = form.image.value;
    const name = form.name.value;
    const brand = form.brand.value;
    const type = form.type.value;
    const price = form.price.value;
    const shortDescription = form.shortDescription.value;
    const rating = form.rating.value;

    const newProduct = { name, brand, type, price, shortDescription, rating, photo };

    console.log(newProduct);

    fetch('http://localhost:5000/products', {
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
            text: 'Coffee Added Successfully',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
        }
      })
  }


return (
  <div>
    <h2 className='text-4xl font-bold text-center mb-10'>Add Product Here: </h2>
    <div className="max-w-screen-xl mx-auto p-4 bg-[#EEEEEE] rounded-lg shadow-md flex space-x-4 justify-around items-center">
      <div className="w-1/2 ">
        <img
          src="https://images.unsplash.com/photo-1603389335957-10bea39c9d32?auto=format&fit=crop&q=80&w=1974&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Product Image"
          className="w-8/12 rounded-lg ml-40"
        />
      </div>
      <div className="w-1/2">
        <form className='w-8/12' onSubmit={handleAddProduct}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Image URL:</label>
            <input
              type="text"
              name="image"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name:</label>
            <input
              type="text"
              name="name"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Brand Name:</label>
            <input
              type="text"
              name="brand"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Type:</label>
            <select
              name="type"
              className="w-full border rounded-md p-2"
            >
              <option value="smartphone">Smartphone</option>
              <option value="computer">Computer</option>
              <option value="headphone">Headphone</option>
              <option value="laptop">Laptop</option>
              <option value="speaker">Speaker</option>
              <option value="tablet">Tablet</option>
              <option value="television">Television</option>
              {/* Add more options for other types */}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Price:</label>
            <input
              type="number"
              name="price"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Short Description:</label>
            <textarea
              name="shortDescription"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Rating:</label>
            <input
              type="range"
              name="rating"
              min="1"
              max="5"
              step="1"
              className="w-full border rounded-md p-2"
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md font-medium hover:bg-blue-600"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)
  }

export default AddProductPage