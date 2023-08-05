import React, { useEffect } from "react";
import { API } from "../axios/API";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

export const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logoutUser);
    navigate("/login");
  }, []);
};
