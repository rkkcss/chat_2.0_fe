import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../redux/authSlice";

export const Logout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  return null;
};
