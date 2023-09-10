import React, { useEffect } from "react";
import { CategoryMenu } from "../components/CategoryMenu";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getAccountInfo } from "../redux/authSlice";

export const LandingPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountInfo());
  }, []);

  return (
    <div className="flex flex-row h-screen">
      <CategoryMenu />
      <Outlet />
    </div>
  );
};
