import React from "react";
import UserLayout from "../layout/UserLayout";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <UserLayout>
      <MetaData title={"Your Profile"} />
      <div className="flex justify-center mt-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl flex flex-col md:flex-row items-center">
          <div className="w-32 h-32 mb-6 md:mb-0 md:mr-6 flex-shrink-0">
            <img
              className="rounded-full w-full h-full object-cover"
              src={
                user?.avatar ? user?.avatar?.url : "/images/default_avatar.jpg"
              }
              alt={user?.name}
            />
          </div>
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold mb-2">{user?.name}</h2>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Joined On:</span>{" "}
              {user?.createdAt?.substring(0, 10)}
            </p>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Profile;
