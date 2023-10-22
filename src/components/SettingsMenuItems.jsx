import { PropertySafetyOutlined } from "@ant-design/icons";
import React from "react";
import { Link, useLocation } from "react-router-dom";

export const SettingsMenuItems = ({ menuItem }) => {
  const isActive = useLocation().pathname == menuItem.link;
  return (
    <>
      <li key={menuItem.id} className="ml-4">
        <Link
          to={menuItem.link}
          className={`flex w-max items-center gap-2 py-2 mb-2 hover:cursor-pointer px-5 rounded-full ${
            isActive && "bg-emerald-300"
          }`}
        >
          {menuItem.icon}
          {menuItem.label}
        </Link>
      </li>
    </>
  );
};
