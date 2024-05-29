import React, { useEffect, useState } from "react";
import { useUpdatePasswordMutation } from "../../redux/api/userApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import UserLayout from "../layout/UserLayout";
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const [updatePassword, { isLoading, error, isSuccess }] =
    useUpdatePasswordMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }

    if (isSuccess) {
      toast.success("Password Updated");
      navigate("/me/profile");
    }
  }, [error, isSuccess, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    const userData = {
      oldPassword,
      password,
    };

    updatePassword(userData);
  };

  return (
    <UserLayout>
      <MetaData title={"Update Password"} />
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={submitHandler}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Update Password</h2>
            <div className="mb-4">
              <label
                htmlFor="old_password_field"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Old Password
              </label>
              <input
                type="password"
                id="old_password_field"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="new_password_field"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                New Password
              </label>
              <input
                type="password"
                id="new_password_field"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
                disabled={isLoading}
              >
                {isLoading ? "Updating..." : "Update Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </UserLayout>
  );
};

export default UpdatePassword;
