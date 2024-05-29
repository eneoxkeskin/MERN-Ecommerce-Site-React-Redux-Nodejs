import React, { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";

import { Link, useParams } from "react-router-dom";
import MetaData from "../layout/MetaData";

import AdminLayout from "../layout/AdminLayout";
import {
  useOrderDetailsQuery,
  useUpdateOrderMutation,
} from "../../redux/api/orderApi";

const ProcessOrder = () => {
  const [status, setStatus] = useState("");

  const params = useParams();
  const { data, isLoading, error } = useOrderDetailsQuery(params?.id);
  const order = data?.order || {};

  const [updateOrder, { error: updateError, isSuccess }] = useUpdateOrderMutation();

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
    if (orderStatus) {
      setStatus(orderStatus);
    }
  }, [orderStatus]);

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (updateError) {
      toast.error(updateError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order updated");
    }
  }, [error, updateError, isSuccess]);

  const updateOrderHandler = (id) => {
    const data = { status };
    updateOrder({ id, body: data });
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"Process Order"} />
      <div className="flex flex-col lg:flex-row justify-around my-10">
        <div className="bg-white shadow-md rounded-lg p-6 lg:w-2/3">
          <h3 className="text-2xl font-bold mb-6">Order Details</h3>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-4">Order Info</h4>
            <table className="min-w-full bg-white border">
              <tbody>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">ID</th>
                  <td className="py-2 px-4">{order?._id}</td>
                </tr>
                <tr className="border-t">
                  <th className="py-2 px-4 text-left">Order Status</th>
                  <td className={`py-2 px-4 ${String(orderStatus).includes("Delivered") ? "text-green-500" : "text-red-500"}`}>
                    <b>{orderStatus}</b>
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
                    {shippingInfo?.address}, {shippingInfo?.city}, {shippingInfo?.zipCode}, {shippingInfo?.country}
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
                  <td className={`py-2 px-4 ${isPaid ? "text-green-500" : "text-red-500"}`}>
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

        <div className="bg-white shadow-md rounded-lg p-6 lg:w-1/3 mt-6 lg:mt-0">
          <h4 className="text-xl font-semibold mb-4">Update Status</h4>
          <div className="mb-3">
            <select
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
          <button
            className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition duration-200"
            onClick={() => updateOrderHandler(order?._id)}
          >
            Update Status
          </button>

          <h4 className="text-xl font-semibold mt-6 mb-4">Order Invoice</h4>
          <Link
            to={`/invoice/order/${order?._id}`}
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-200 text-center block"
          >
            <i className="fa fa-print"></i> Generate Invoice
          </Link>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProcessOrder;
