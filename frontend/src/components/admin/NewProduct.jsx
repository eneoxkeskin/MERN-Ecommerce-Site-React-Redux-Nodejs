import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import AdminLayout from "../layout/AdminLayout";
import { useNavigate } from "react-router-dom";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import { useCreateProductMutation } from "../../redux/api/productsApi";

const NewProduct = () => {
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    seller: "",
  });

  const { name, description, price, category, stock, seller } = product;

  const [createProduct, { isLoading, error, isSuccess }] =
    useCreateProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Product created");
      navigate("/admin/products");
    }
  }, [error, isSuccess]);

  const onChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <AdminLayout>
      <MetaData title={"Create new Product"} />
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">New Product</h2>
          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="name_field" className="block text-gray-700 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name_field"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                name="name"
                value={name}
                onChange={onChange}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="description_field" className="block text-gray-700 font-semibold mb-2">
                Description
              </label>
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                id="description_field"
                rows="4"
                name="description"
                value={description}
                onChange={onChange}
              ></textarea>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="price_field" className="block text-gray-700 font-semibold mb-2">
                  Price
                </label>
                <input
                  type="text"
                  id="price_field"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  name="price"
                  value={price}
                  onChange={onChange}
                />
              </div>

              <div className="w-1/2">
                <label htmlFor="stock_field" className="block text-gray-700 font-semibold mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock_field"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  name="stock"
                  value={stock}
                  onChange={onChange}
                />
              </div>
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="w-1/2">
                <label htmlFor="category_field" className="block text-gray-700 font-semibold mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  id="category_field"
                  name="category"
                  value={category}
                  onChange={onChange}
                >
                  {PRODUCT_CATEGORIES?.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-1/2">
                <label htmlFor="seller_field" className="block text-gray-700 font-semibold mb-2">
                  Seller Name
                </label>
                <input
                  type="text"
                  id="seller_field"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  name="seller"
                  value={seller}
                  onChange={onChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "CREATE"}
            </button>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
};

export default NewProduct;
