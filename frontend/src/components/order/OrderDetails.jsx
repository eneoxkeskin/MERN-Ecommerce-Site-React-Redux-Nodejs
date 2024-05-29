import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import MetaData from "../layout/MetaData";
import { useOrderDetailsQuery } from "../../redux/api/orderApi";

const OrderDetails = () => {
  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    user,
    totalAmount,
    orderStatus,
  } = order;

  const isPaid = paymentInfo?.status === "paid" ? true : false;

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
  }, [error]);

  if (isLoading) return <Loader />;

  return (
    <>
      <MetaData title={"Order Details"} />
      <div className="flex justify-center mt-8">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Your Order Details</h3>
            <a
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
              href="/invoice/order/order-id"
            >
              <i className="fa fa-print"></i> Invoice
            </a>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Order Info</h4>
            <table className="min-w-full bg-white border">
              <tbody>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">ID</th>
                  <td className="py-2 px-4">{order?._id}</td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Status</th>
                  <td
                    className={`py-2 px-4 ${
                      String(orderStatus).includes("Delivered")
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    <b>{orderStatus}</b>
                  </td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Date</th>
                  <td className="py-2 px-4">
                    {new Date(order?.createdAt).toLocaleString("en-US")}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Shipping Info</h4>
            <table className="min-w-full bg-white border">
              <tbody>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Name</th>
                  <td className="py-2 px-4">{user?.name}</td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Phone No</th>
                  <td className="py-2 px-4">{shippingInfo?.phoneNo}</td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Address</th>
                  <td className="py-2 px-4">
                    {shippingInfo?.address}, {shippingInfo?.city},{" "}
                    {shippingInfo?.zipCode}, {shippingInfo?.country}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Payment Info</h4>
            <table className="min-w-full bg-white border">
              <tbody>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Status</th>
                  <td
                    className={`py-2 px-4 ${
                      isPaid ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    <b>{paymentInfo?.status}</b>
                  </td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Method</th>
                  <td className="py-2 px-4">{order?.paymentMethod}</td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Stripe ID</th>
                  <td className="py-2 px-4">{paymentInfo?.id || "Nill"}</td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Amount Paid</th>
                  <td className="py-2 px-4">${totalAmount}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Order Items</h4>
            <hr className="mb-4" />
            {orderItems?.map((item, index) => (
              <div key={index} className="flex items-center my-4">
                <div className="w-16 h-16">
                  <img
                    src={item?.image}
                    alt={item?.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
                <div className="flex-grow ml-4">
                  <Link
                    to={`/products/${item?.product}`}
                    className="text-lg font-semibold text-blue-600"
                  >
                    {item?.name}
                  </Link>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">${item?.price}</p>
                </div>
                <div className="ml-4">
                  <p className="text-lg font-semibold">
                    {item?.quantity} Piece(s)
                  </p>
                </div>
              </div>
            ))}
            <hr className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
