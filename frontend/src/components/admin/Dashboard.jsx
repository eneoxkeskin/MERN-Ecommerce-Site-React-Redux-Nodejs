import React, { useEffect, useState } from "react";
import AdminLayout from "../layout/AdminLayout";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SalesChart from "../charts/SalesChart";
import { useLazyGetDashboardSalesQuery } from "../../redux/api/orderApi";
import { toast } from "react-hot-toast";
import Loader from "../layout/Loader";
import MetaData from "../layout/MetaData";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(new Date().setDate(1));
  const [endDate, setEndDate] = useState(new Date());

  const [getDashboardSales, { error, isLoading, data }] =
    useLazyGetDashboardSalesQuery();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (startDate && endDate && !data) {
      getDashboardSales({
        startDate: new Date(startDate).toISOString(),
        endDate: endDate.toISOString(),
      });
    }
  }, [error]);

  const submitHandler = () => {
    getDashboardSales({
      startDate: new Date(startDate).toISOString(),
      endDate: endDate.toISOString(),
    });
  };

  if (isLoading) return <Loader />;
  return (
    <AdminLayout>
      <MetaData title={"Admin Dashboard"} />
      <div className="flex flex-col lg:flex-row justify-start items-center gap-4">
        <div className="mb-3">
          <label className="block text-gray-700 font-semibold">Start Date</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="block text-gray-700 font-semibold">End Date</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            className="form-control"
          />
        </div>
        <button
          className="bg-gray-800 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition duration-300"
          onClick={submitHandler}
        >
          Fetch
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-5">
        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <div className="text-center text-2xl font-semibold">
            Sales
            <br />
            <b>${data?.totalSales?.toFixed(2)}</b>
          </div>
        </div>

        <div className="bg-gray-800 text-white p-6 rounded-lg shadow-lg">
          <div className="text-center text-2xl font-semibold">
            Orders
            <br />
            <b>{data?.totalNumOrders}</b>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <SalesChart salesData={data?.sales} />
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
