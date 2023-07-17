import React from "react";
import { CategoryMenu } from "../components/CategoryMenu";
import { Outlet } from "react-router-dom";

export const LandingPage = () => {
  return (
    <div className="flex flex-row">
      <CategoryMenu />
      <Outlet />
    </div>
  );
};
