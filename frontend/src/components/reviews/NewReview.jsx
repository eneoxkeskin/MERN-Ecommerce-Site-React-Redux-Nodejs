import React, { useEffect, useState } from "react";
import StarRatings from "react-star-ratings";
import {
  useCanUserReviewQuery,
  useSubmitReviewMutation,
} from "../../redux/api/productsApi";
import { toast } from "react-hot-toast";

import '../../App.css'; 

const NewReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const [submitReview, { isLoading, error, isSuccess }] =
    useSubmitReviewMutation();

  const { data } = useCanUserReviewQuery(productId);
  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Review Posted");
    }
  }, [error, isSuccess]);

  const submitHandler = () => {
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
  };

  return (
    <div>
      {canReview && (
        <button
          id="review_btn"
          type="button"
          className="bg-orange-400 text-white py-2 px-4 rounded-lg mt-4"
          data-bs-toggle="modal"
          data-bs-target="#ratingModal"
        >
          Submit Your Review
        </button>
      )}

      <div className="row mt-2 mb-5">
        <div className="rating w-50">
          <div
            className="modal fade"
            id="ratingModal"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="ratingModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <StarRatings
                    rating={rating}
                    starRatedColor="rgb(251 146 60 / var(--tw-bg-opacity))" 
                    starEmptyColor="#D3D3D3" 
                    starHoverColor = "rgb(251 146 60 / var(--tw-bg-opacity))"
                    numberOfStars={5}
                    name="rating"
                    changeRating={(newRating) => setRating(newRating)}
                    starDimension="32px"
                    starSpacing="4px"
                  />

                  <textarea
                    name="review"
                    id="review"
                    className="form-control mt-4 p-2 border border-gray-300 rounded-lg w-full"
                    placeholder="Enter your comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  ></textarea>

                  <button
                    id="new_review_btn"
                    className="bg-orange-400 text-white py-2 px-4 rounded-lg w-full mt-4"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={submitHandler}
                    disabled={isLoading}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReview;
