import React from "react";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { caluclateOrderCost } from "../../helpers/helpers";
import CheckoutSteps from "./CheckoutSteps";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { itemsPrice, shippingPrice, taxPrice, totalPrice } =
    caluclateOrderCost(cartItems);

  return (
    <>
      <MetaData title={"Confirm Order Info"} />
      <CheckoutSteps shipping confirmOrder />
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-4">Shipping Info</h4>
              <p className="mb-2">
                <b>Name:</b> {user?.name}
              </p>
              <p className="mb-2">
                <b>Phone:</b> {shippingInfo?.phoneNo}
              </p>
              <p className="mb-4">
                <b>Address:</b> {shippingInfo?.address}, {shippingInfo?.city},{" "}
                {shippingInfo?.zipCode}, {shippingInfo?.country}
              </p>

              <hr />
              <h4 className="text-xl font-semibold mt-4 mb-4">Your Cart Items:</h4>
              {cartItems?.map((item, index) => (
                <div key={index}>
                  <hr />
                  <div className="flex items-center my-4">
                    <div className="w-16 h-16">
                      <img
                        src={item?.image}
                        alt="Product"
                        className="w-full h-full object-cover rounded"
                      />
                    </div>
                    <div className="flex-grow ml-4">
                      <Link
                        to={`/product/${item.product}`}
                        className="text-lg font-semibold text-blue-600"
                      >
                        {item?.name}
                      </Link>
                    </div>
                    <div className="ml-4">
                      <p className="text-lg font-semibold">
                        {item?.quantity} x ${item?.price} ={" "}
                        <b>${(item?.quantity * item.price).toFixed(2)}</b>
                      </p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white shadow-md rounded-lg p-6">
              <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
              <hr />
              <p className="flex justify-between my-2">
                <span>Subtotal:</span>
                <span className="font-semibold">${itemsPrice}</span>
              </p>
              <p className="flex justify-between my-2">
                <span>Shipping:</span>
                <span className="font-semibold">${shippingPrice}</span>
              </p>
              <p className="flex justify-between my-2">
                <span>Tax:</span>
                <span className="font-semibold">${taxPrice}</span>
              </p>
              <hr />
              <p className="flex justify-between my-2 text-lg font-bold">
                <span>Total:</span>
                <span>${totalPrice}</span>
              </p>
              <hr />
              <Link
                to="/payment_method"
                className="block bg-gray-800 text-white text-center py-2 rounded-lg mt-4 hover:bg-gray-800 transition duration-200"
              >
                Proceed to Payment
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmOrder;
