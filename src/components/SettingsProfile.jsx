import React, { useEffect } from "react";
import userImg from "../assets/user.jpg";
import { CameraOutlined, SaveOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getAccountInfo, updateUser, updateUserApi } from "../redux/authSlice";

export const SettingsProfile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.userStore?.user);

  useEffect(() => {
    return () => {
      dispatch(getAccountInfo());
    };
  }, []);

  return (
    <>
      <h1 className="text-2xl mb-8">Saját profil</h1>
      <div className="flex justify-center items-center my-5 ">
        <div className="relative">
          <img src={userImg} alt="" className="rounded-full w-32 h-32" />
          <div className="absolute bottom-2 right-0">
            <CameraOutlined className="p-2 bg-emerald-400 rounded-full hover:cursor-pointer" />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-10">
        <h1 className="text-lg">Személyes információk</h1>
        <div className="flex justify-between gap-8">
          <div className="w-full">
            <label className="text-lg font-medium text-gray-600">
              Felhasználónév
            </label>
            <input
              type="text"
              name="login"
              value={user?.login}
              className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
              placeholder="Írd a felhasználóneved..."
              onChange={(e) =>
                dispatch(updateUser({ value: e.target.value, name: "login" }))
              }
            />
          </div>
        </div>
        <div className="flex gap-8">
          <div className="w-full">
            <label className="text-lg font-medium text-gray-600">
              Vezetéknév
            </label>
            <input
              type="text"
              name="fistName"
              value={user?.firstName}
              className="mt-2 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
              placeholder="Írd a vezetéknéved..."
              onChange={(e) =>
                dispatch(
                  updateUser({ value: e.target.value, name: "firstName" })
                )
              }
            />
          </div>
          <div className="w-full">
            <label className="text-lg font-medium text-gray-600">
              Keresztnév
            </label>
            <input
              type="text"
              name="lastName"
              value={user?.lastName}
              className="mt-2 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
              placeholder="Írd a keresztneved..."
              onChange={(e) =>
                dispatch(
                  updateUser({ value: e.target.value, name: "lastName" })
                )
              }
            />
          </div>
        </div>

        <div className="flex gap-3 justify-end">
          <button
            onClick={() => dispatch(updateUserApi(user))}
            className="flex items-center gap-2 text-sm font-medium rounded-xl border px-4 py-1.5 bg-emerald-300 text-gray-900 hover:bg-emerald-400 border-emerald-400"
          >
            <SaveOutlined />
            Mentés
          </button>
        </div>
      </div>
    </>
  );
};
