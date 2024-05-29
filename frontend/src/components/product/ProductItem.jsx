import React from "react";
import { Link } from "react-router-dom";
import StarRatings from "react-star-ratings";

const ProductItem = ({ product, columnSize }) => {
  return (
    <div className={`col-span-1 md:col-span-2 lg:col-span-${columnSize} my-3`}>
      <div className="bg-white shadow-md rounded-lg overflow-hidden max-w-xs mx-auto">
        <div className="h-48 overflow-hidden flex justify-center items-center">
          <img
            className="object-contain h-full"
            src={
              product?.images[0]
                ? product?.images[0]?.url
                : "/images/default_product.png"
            }
            alt={product?.name}
          />
        </div>
        <div className="p-4 flex flex-col justify-between h-48 ">
          <h5 className="text-base font-semibold mb-2">
            <Link to={`/product/${product?._id}`} className="text-gray-900 hover:text-indigo-600">
              {product?.name}
            </Link>
          </h5>
          <div className="flex items-center">
            <StarRatings
              rating={product?.ratings}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              starDimension="18px"
              starSpacing="1px"
            />
            <span className="ml-2 text-gray-700 text-sm mt-1">({product?.numOfReviews})</span>
          </div>
          <p className="text-base font-bold mt-2">${product?.price}</p>
          <Link
            to={`/product/${product?._id}`}
            className="mt-3 py-2 px-4 bg-orange-400 text-white text-center rounded hover:bg-orange-400"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>

  
  );
};

export default ProductItem;
