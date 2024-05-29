import React from "react";
import SideMenu from "./SideMenu";

const AdminLayout = ({ children }) => {
  const menuItems = [
    {
      name: "Dashboard",
      url: "/admin/dashboard",
      icon: "fas fa-tachometer-alt",
    },
    {
      name: "New Product",
      url: "/admin/product/new",
      icon: "fas fa-plus",
    },
    {
      name: "Products",
      url: "/admin/products",
      icon: "fab fa-product-hunt",
    },
    {
      name: "Orders",
      url: "/admin/orders",
      icon: "fas fa-receipt",
    },
    {
      name: "Users",
      url: "/admin/users",
      icon: "fas fa-user",
    },
    {
      name: "Reviews",
      url: "/admin/reviews",
      icon: "fas fa-star",
    },
  ];

  return (
    <div className="flex min-h-screen bg-white">
      <SideMenu menuItems={menuItems} />
      <div className="flex-grow p-6">
        <h2 className="text-3xl font-bold text-center mb-8">Admin Dashboard</h2>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
