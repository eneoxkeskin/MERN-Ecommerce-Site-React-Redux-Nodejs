import React from "react";
import { Link } from "react-router-dom";

const SideMenu = ({ menuItems }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h3 className="text-xl font-semibold mb-4">Admin Menu</h3>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              to={item.url}
              className="flex items-center p-2 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              <i className={`${item.icon} w-6 h-6 text-gray-500`}></i>
              <span className="ml-3">{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SideMenu;
