import { useMutation } from '@tanstack/react-query';
import useAxios from './../hooks/useAxios';
import Swal from 'sweetalert2';

const AddProductPage = () => {
  const { fetchData } = useAxios();

  const mutation = useMutation({
    mutationFn: (newProduct) => fetchData('/products', 'POST', newProduct),  // send data to backend
    onSuccess: (data) => {
      console.log('Product added successfully', data);
      Swal.fire({
        title: 'Success!',
        text: 'Product Added Successfully',
        icon: 'success',
        confirmButtonText: 'Cool'
      });
    },
    onError: (error) => {
      console.error('Error adding product', error);
      Swal.fire({
        title: 'Error!',
        text: 'There was an issue adding the product.',
        icon: 'error',
        confirmButtonText: 'Okay'
      });
    },
  });


  const handleAddProduct = (event) => {
    event.preventDefault();
    const form = event.target;

    // Collect form data
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
    const images = Array.from(form.images.files).map(file => URL.createObjectURL(file));  // Handle image uploads

    const newProduct = {
      name,
      brand,
      category,
      price,
      shortDescription,
      fullDescription,
      rating,
      photo,
      stock,
      discount,
      colors,
      warranty,
      driverSize,
      batteryLife,
      connectivity,
      videoUrl,
      images,
    };

    console.log(newProduct);
    mutation.mutate(newProduct);
    form.reset();
  };

  return (
    <section className="py-8 bg-gray-100">
      <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-white border-0">
          <div className="rounded-t bg-violet-400 mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-white text-xl font-bold">Add New Product</h6>
              <button
                className="bg-violet-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                type="button"
              >
                Settings
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form onSubmit={handleAddProduct}>
              <h6 className="text-violet-500 text-sm mt-3 mb-6 font-bold uppercase">Product Information</h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="name">
                      Product Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="brand">
                      Brand
                    </label>
                    <input
                      type="text"
                      name="brand"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                {/* Image Upload Section */}
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="image">
                      Product Image
                    </label>
                    <input
                      type="file"
                      name="image"
                      accept="image/*"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="category">
                      Category
                    </label>
                    <select
                      name="category"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                      <option value="smartphone">Smartphone</option>
                      <option value="laptop">Laptop</option>
                      <option value="tv">TV</option>
                      <option value="vr">VR</option>
                      <option value="headphone">Headphone</option>
                      <option value="mouse">Mouse</option>
                      <option value="keyboard">Keyboard</option>
                      <option value="monitor">Monitor</option>
                      <option value="tablet">Tablet</option>
                      <option value="camera">Camera</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="price">
                      Price
                    </label>
                    <input
                      type="number"
                      name="price"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>

              <h6 className="text-violet-500 text-sm mt-3 mb-6 font-bold uppercase">Stock & Specifications</h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="stock">
                      Stock
                    </label>
                    <input
                      type="number"
                      name="stock"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="driverSize">
                      Driver Size
                    </label>
                    <input
                      type="text"
                      name="driverSize"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="batteryLife">
                      Battery Life
                    </label>
                    <input
                      type="text"
                      name="batteryLife"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="connectivity">
                      Connectivity
                    </label>
                    <input
                      type="text"
                      name="connectivity"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>

              <h6 className="text-violet-500 text-sm mt-3 mb-6 font-bold uppercase">Description & Media</h6>
              <div className="flex flex-wrap">
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="shortDescription">
                      Short Description
                    </label>
                    <textarea
                      name="shortDescription"
                      rows="3"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="fullDescription">
                      Full Description
                    </label>
                    <textarea
                      name="fullDescription"
                      rows="6"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="discount">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      name="discount"
                      min="0"
                      max="100"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="color">
                      Color
                    </label>
                    <select
                      name="color"
                      multiple
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    >
                      <option value="black">Black</option>
                      <option value="white">White</option>
                      <option value="red">Red</option>
                      <option value="blue">Blue</option>
                    </select>
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="warranty">
                      Warranty (Years)
                    </label>
                    <input
                      type="number"
                      name="warranty"
                      min="1"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
                <div className="w-full lg:w-6/12 px-4">
                  <div className="relative w-full mb-3">
                    <label className="block uppercase text-gray-600 text-xs font-bold mb-2" htmlFor="videoUrl">
                      Video URL (Optional)
                    </label>
                    <input
                      type="url"
                      name="videoUrl"
                      className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  type="submit"
                  className="bg-violet-600 text-white font-bold uppercase text-xs px-6 py-3 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>

  );
};

export default AddProductPage;
