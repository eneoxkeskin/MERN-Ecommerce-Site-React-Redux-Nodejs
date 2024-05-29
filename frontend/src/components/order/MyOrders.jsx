import React, { useEffect } from "react";
import { useMyOrdersQuery } from "../../redux/api/orderApi";
import Loader from "../layout/Loader";
import { toast } from "react-hot-toast";
import { MDBDataTable } from "mdbreact";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/features/cartSlice";

const MyOrders = () => {
  const { data, isLoading, error } = useMyOrdersQuery();

  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderSuccess = searchParams.get("order_success");

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (orderSuccess) {
      dispatch(clearCart());
      navigate("/me/orders");
    }
  }, [error, orderSuccess, dispatch, navigate]);

  const setOrders = () => {
    const orders = {
      columns: [
        {
          label: "ID",
          field: "id",
          sort: "asc",
        },
        {
          label: "Amount",
          field: "amount",
          sort: "asc",
        },
        {
          label: "Payment Status",
          field: "status",
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
        amount: `$${order?.totalAmount}`,
        status: order?.paymentInfo?.status?.toUpperCase(),
        orderStatus: order?.orderStatus,
        actions: (
          <div className="flex items-center space-x-2">
            <Link
              to={`/me/order/${order?._id}`}
              className="text-blue-600 hover:text-blue-800 transition duration-150"
            >
              <i className="fa fa-eye"></i>
            </Link>
            <Link
              to={`/invoice/order/${order?._id}`}
              className="text-green-600 hover:text-green-800 transition duration-150"
            >
              <i className="fa fa-print"></i>
            </Link>
          </div>
        ),
      });
    });

    return orders;
  };

  if (isLoading) return <Loader />;

  return (
    <div className="container mx-auto px-4 py-8">
      <MetaData title={"My Orders"} />
      <h1 className="text-3xl font-bold mb-6">{data?.orders?.length} Orders Found</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <MDBDataTable
          data={setOrders()}
          className="w-full"
          bordered
          striped
          hover
        />
      </div>
    </div>
  );
};

export default MyOrders;
