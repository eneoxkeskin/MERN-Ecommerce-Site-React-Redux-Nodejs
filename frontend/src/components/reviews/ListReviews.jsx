import React from "react";
import StarRatings from "react-star-ratings";

const ListReviews = ({ reviews }) => {
  return (
    <div className="w-full lg:w-3/4 mx-auto my-10 ml-3">
      <h3 className="ml-1 text-2xl font-semibold mb-4 text-gray-800">Reviews:</h3>
      <hr className="mb-4 border-gray-300" />
      {reviews?.map((review) => (
        <div key={review?._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <img
              src={review?.user?.avatar ? review?.user?.avatar?.url : "/images/default_avatar.jpg"}
              alt="User Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />
            <div className="flex flex-col">
              <StarRatings
                rating={review?.rating}
                starRatedColor="#ffb829"
                numberOfStars={5}
                name="rating"
                starDimension="16px"
                starSpacing="2px" 
              />
              <p className="text-gray-700 mt-1">by {review.user?.name}</p>
            </div>
          </div>
          <p className="text-gray-800">{review?.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ListReviews;
