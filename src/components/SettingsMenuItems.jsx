import React from "react";
import { Link, useLocation } from "react-router-dom";

export const SettingsMenuItems = ({ menuItem }) => {
  const isActive = useLocation().pathname == menuItem.link;
  return (
    <>
      <li key={menuItem.id} className="ml-4">
        <Link
          to={menuItem.link}
          className={`py-3 hover:cursor-pointer px-5 rounded-full ${
            isActive && "bg-emerald-300"
          }`}
        >
          {menuItem.label}
        </Link>
      </li>
    </>
  );
};
