import React from "react";
import SideMenu from "./SideMenu";

const UserLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Profile",
      url: "/me/profile",
      icon: "fas fa-user",
    },
    {
      name: "Update Profile",
      url: "/me/update_profile",
      icon: "fas fa-user",
    },
    {
      name: "Upload Avatar",
      url: "/me/upload_avatar",
      icon: "fas fa-user-circle",
    },
    {
      name: "Update Password",
      url: "/me/update_password",
      icon: "fas fa-lock",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="py-4">
        <h2 className="text-3xl font-bold text-center">User Settings</h2>
      </div>
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:justify-between">
          <div className="w-full lg:w-1/4 mb-4 lg:mb-0">
            <SideMenu menuItems={menuItems} />
          </div>
          <div className="w-full lg:w-3/4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLayout;
