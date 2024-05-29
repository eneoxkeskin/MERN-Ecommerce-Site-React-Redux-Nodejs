import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import StarRatings from "react-star-ratings";
import { useDispatch, useSelector } from "react-redux";
import { setCartItem } from "../../redux/features/cartSlice";
import MetaData from "../layout/MetaData";
import NewReview from "../reviews/NewReview";
import ListReviews from "../reviews/ListReviews";

const ProductDetails = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);
  const [activeImg, setActiveImg] = useState("");

  const { data, isLoading, error, isError } = useGetProductDetailsQuery(params?.id);
  const product = data?.product;
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    setActiveImg(product?.images[0] ? product?.images[0]?.url : "/images/default_product.png");
  }, [product]);

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
  }, [isError]);

  const increaseQty = () => {
    if (quantity >= product?.stock) return;
    setQuantity(quantity + 1);
  };

  const decreaseQty = () => {
    if (quantity <= 1) return;
    setQuantity(quantity - 1);
  };

  const setItemToCart = () => {
    const cartItem = {
      product: product?._id,
      name: product?.name,
      price: product?.price,
      image: product?.images[0]?.url,
      stock: product?.stock,
      quantity,
    };

    dispatch(setCartItem(cartItem));
    toast.success("Item added to Cart");
  };

  if (isLoading) return <Loader />;

  return (
    <>
   
      <MetaData title={product?.name} />
      <div className="container ml-52 -mt-5">
      <div className="flex flex-col lg:flex-row justify-around mt-10 px-4 lg:px-0 bg-white">
        <div className="lg:w-1/2 p-5">
          <div className="border p-3 rounded-lg bg-white">
            <img
              className="w-full h-auto rounded-lg"
              src={activeImg}
              alt={product?.name}
            />
          </div>
          <div className="flex justify-start mt-5 space-x-3 overflow-x-auto">
            {product?.images?.map((img) => (
              <div key={img.url} className="cursor-pointer border p-1 rounded-lg bg-white">
                <img
                  className={`h-20 w-20 object-cover rounded-lg transition-transform duration-200 hover:scale-105 ${img.url === activeImg ? "border-yellow-500 border-2" : ""}`}
                  src={img?.url}
                  alt={img?.url}
                  onClick={() => setActiveImg(img.url)}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="lg:w-1/2 p-5 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold text-gray-800">{product?.name}</h3>
         

          <hr className="my-4" />

          <div className="flex items-center">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="24px"
              starSpacing="1px"
            />
            <span className="ml-2 text-gray-700">({product?.numOfReviews} Reviews)</span>
          </div>
          <hr className="my-4" />

          <p className="text-2xl font-bold text-gray-900">${product?.price}</p>
          <div className="flex items-center mt-2 space-x-3">
            <button
              className="bg-orange-400 text-white py-2 px-4 rounded-lg text-lg"
              onClick={decreaseQty}
            >
              -
            </button>
            <input
              type="number"
              className="mx-2 w-16 text-center border border-gray-300 rounded-lg text-lg"
              value={quantity}
              readOnly
            />
            <button
              className="bg-orange-400 text-white py-2 px-4 rounded-lg text-lg"
              onClick={increaseQty}
            >
              +
            </button>
          </div>
          <button
            type="button"
            className="bg-orange-400 text-white py-2 px-4 rounded-lg mt-4 text-lg"
            disabled={product?.stock <= 0}
            onClick={setItemToCart}
          >
            Add to Cart
          </button>

          <hr className="my-4" />

          <p className="text-lg">
            Status:{" "}
            <span className={product?.stock > 0 ? "text-green-500" : "text-red-500"}>
              {product?.stock > 0 ? "In Stock" : "Out of Stock"}
            </span>
          </p>

          <hr className="my-4" />

          <h4 className="text-xl font-semibold text-gray-800 mt-2">Description:</h4>
          <p className="text-gray-700">{product?.description}</p>
          <hr className="my-4" />
          <p className="text-gray-700">
            Sold by: <strong>{product?.seller}</strong>
          </p>

          {isAuthenticated ? (
            <NewReview productId={product?._id} />
          ) : (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg my-5">
              Login to post your review.
            </div>
          )}
        </div>
      </div>
      {product?.reviews?.length > 0 && (
        <>
   
          <ListReviews reviews={product?.reviews} />
        </>
      )}
      </div>
    </>
  );
};

export default ProductDetails;
