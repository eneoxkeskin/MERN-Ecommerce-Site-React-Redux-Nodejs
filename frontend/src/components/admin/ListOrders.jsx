import React, { useEffect } from "react";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";

import AdminLayout from "../layout/AdminLayout";
import {
  useDeleteOrderMutation,
  useGetAdminOrdersQuery,
} from "../../redux/api/orderApi";

const ListOrders = () => {
  const { data, isLoading, error } = useGetAdminOrdersQuery();

  const [
    deleteOrder,
    { error: deleteError, isLoading: isDeleteLoading, isSuccess },
  ] = useDeleteOrderMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }

    if (isSuccess) {
      toast.success("Order Deleted");
    }
  }, [error, deleteError, isSuccess]);

  const deleteOrderHandler = (id) => {
    deleteOrder(id);
  };

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "paymentStatus",
          sort: "asc",
        },
        {
          label: "Order Status",
          field: "orderStatus",
          sort: "asc",
        },
        {
          label: "Actions",
          field: "actions",
          sort: "asc",
        },
      ],
      rows: [],
    };

    data?.orders?.forEach((order) => {
      orders.rows.push({
        id: order?._id,
        paymentStatus: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <div className="flex items-center space-x-4">
            <Link
              to={`/admin/orders/${order?._id}`}
              className="text-blue-600 hover:text-blue-800 transition duration-150"
            >
              <i className="fa fa-pencil"></i>
            </Link>
            <button
              className="text-red-600 hover:text-red-800 transition duration-150"
              onClick={() => deleteOrderHandler(order?._id)}
              disabled={isDeleteLoading}
            >
              <i className="fa fa-trash"></i>
            </button>
          </div>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <AdminLayout>
      <MetaData title={"All Orders"} />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-semibold my-5">{data?.orders?.length} Orders</h1>

        <div className="bg-white shadow rounded-lg p-6">
          <MDBDataTable
            data={setOrders()}
            className="px-3"
            bordered
            striped
            hover
          />
        </div>
      </div>
    </AdminLayout>
  );
};

export default ListOrders;
