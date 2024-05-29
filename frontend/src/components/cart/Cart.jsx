import React from "react";
import MetaData from "../layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCartItem, removeCartItem } from "../../redux/features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const increseQty = (item, quantity) => {
    const newQty = quantity + 1;

    if (newQty > item?.stock) return;

    setItemToCart(item, newQty);
  };

  const decreseQty = (item, quantity) => {
    const newQty = quantity - 1;

    if (newQty <= 0) return;

    setItemToCart(item, newQty);
  };

  const setItemToCart = (item, newQty) => {
    const cartItem = {
      product: item?.product,
      name: item?.name,
      price: item?.price,
      image: item?.image,
      stock: item?.stock,
      quantity: newQty,
    };

    dispatch(setCartItem(cartItem));
  };

  const removeCartItemHandler = (id) => {
    dispatch(removeCartItem(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <>
      <MetaData title={"Your Cart"} />
      {cartItems?.length === 0 ? (
        <h2 className="mt-5 text-center text-2xl font-semibold">
          Your Cart is Empty
        </h2>
      ) : (
        <>
          <h2 className="mt-5 text-3xl font-semibold">
            Your Cart: <b>{cartItems?.length} items</b>
          </h2>

          <div className="flex flex-col lg:flex-row justify-between mt-5">
            <div className="lg:w-2/3">
              {cartItems?.map((item) => (
                <div key={item.product} className="flex items-center border-b py-4">
                  <div className="w-24 h-24 flex-shrink-0">
                    <img
                      src={item?.image}
                      alt={item?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow ml-4">
                    <Link
                      to={`/products/${item?.product}`}
                      className="text-lg font-semibold text-slate-600"
                    >
                      {item?.name}
                    </Link>
                    <div className="text-slate-600 text-lg font-bold mt-2">
                      ${item?.price}
                    </div>
                    <div className="flex items-center mt-2">
                      <button
                        className="bg-orange-400 text-white px-2 py-1 rounded-l"
                        onClick={() => decreseQty(item, item.quantity)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        className="w-12 text-center border-t border-b"
                        value={item?.quantity}
                        readOnly
                      />
                      <button
                        className="bg-orange-400 text-white px-2 py-1 rounded-r"
                        onClick={() => increseQty(item, item.quantity)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      className="text-slate-600 mr-8"
                      onClick={() => removeCartItemHandler(item?.product)}
                    >
                      <i className="fa fa-trash"></i>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:w-1/3 bg-white border border-1 p-6 rounded-lg mt-5 lg:mt-0">
              <h4 className="text-2xl font-semibold">Order Summary</h4>
              <hr className="my-2" />
              <div className="flex justify-between text-lg">
                <span>Units:</span>
                <span className="font-semibold">
                  {cartItems?.reduce((acc, item) => acc + item?.quantity, 0)} (Units)
                </span>
              </div>
              <div className="flex justify-between text-lg mt-2">
                <span>Est. total:</span>
                <span className="font-semibold">
                  $
                  {cartItems
                    ?.reduce((acc, item) => acc + item?.quantity * item.price, 0)
                    .toFixed(2)}
                </span>
              </div>
              <button
                className="bg-orange-400 text-white w-full py-2 rounded-lg mt-4"
                onClick={checkoutHandler}
              >
                Check out
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Cart;
