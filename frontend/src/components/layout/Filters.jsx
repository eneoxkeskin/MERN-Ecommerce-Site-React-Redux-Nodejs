import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getPriceQueryParams } from "../../helpers/helpers";
import { PRODUCT_CATEGORIES } from "../../constants/constants";
import StarRatings from "react-star-ratings";

const Filters = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);

  const navigate = useNavigate();
  let [searchParams] = useSearchParams();

  useEffect(() => {
    searchParams.has("min") && setMin(searchParams.get("min"));
    searchParams.has("max") && setMax(searchParams.get("max"));
  }, [searchParams]);

  const handleClick = (checkbox) => {
    const checkboxes = document.getElementsByName(checkbox.name);

    checkboxes.forEach((item) => {
      if (item !== checkbox) item.checked = false;
    });

    if (checkbox.checked === false) {
      if (searchParams.has(checkbox.name)) {
        searchParams.delete(checkbox.name);
        const path = window.location.pathname + "?" + searchParams.toString();
        navigate(path);
      }
    } else {
      if (searchParams.has(checkbox.name)) {
        searchParams.set(checkbox.name, checkbox.value);
      } else {
        searchParams.append(checkbox.name, checkbox.value);
      }

      const path = window.location.pathname + "?" + searchParams.toString();
      navigate(path);
    }
  };

  const handleButtonClick = (e) => {
    e.preventDefault();

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    navigate(path);
  };

  const defaultCheckHandler = (checkboxType, checkboxValue) => {
    const value = searchParams.get(checkboxType);
    if (checkboxValue === value) return true;
    return false;
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Filters</h3>
      <hr className="mb-4" />
      <div className="mb-6">
        <h5 className="text-lg font-medium mb-3">Price</h5>
        <form id="filter_form" className="space-y-4" onSubmit={handleButtonClick}>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Min ($)"
              name="min"
              min="0"
              value={min}
              onChange={(e) => setMin(e.target.value)}
            />
            <input
              type="number"
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Max ($)"
              min="0"
              name="max"
              value={max}
              onChange={(e) => setMax(e.target.value)}
            />
            <button
              type="submit"
              className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 focus:outline-none"
            >
              GO
            </button>
          </div>
        </form>
      </div>
      <hr className="mb-4" />
      <div className="mb-6">
        <h5 className="text-lg font-medium mb-3">Category</h5>
        <div className="space-y-2">
          {PRODUCT_CATEGORIES?.map((category) => (
            <div className="flex items-center" key={category}>
              <input
                className="form-checkbox h-4 w-4 text-orange-500"
                type="checkbox"
                name="category"
                id={`category-${category}`}
                value={category}
                defaultChecked={defaultCheckHandler("category", category)}
                onClick={(e) => handleClick(e.target)}
              />
              <label htmlFor={`category-${category}`} className="ml-2 text-gray-700">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>
      <hr className="mb-4" />
      <div>
        <h5 className="text-lg font-medium mb-3">Ratings</h5>
        <div className="space-y-2">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div className="flex items-center" key={rating}>
              <input
                className="form-checkbox h-4 w-4 text-orange-500"
                type="checkbox"
                name="ratings"
                id={`ratings-${rating}`}
                value={rating}
                defaultChecked={defaultCheckHandler("ratings", rating.toString())}
                onClick={(e) => handleClick(e.target)}
              />
              <label htmlFor={`ratings-${rating}`} className="ml-2">
                <StarRatings
                  rating={rating}
                  starRatedColor="#ffb829"
                  numberOfStars={5}
                  name="rating"
                  starDimension="20px"
                  starSpacing="2px"
                />
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
