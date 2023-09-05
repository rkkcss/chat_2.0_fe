import React, { useState } from "react";
import loginBg from "../assets/loginBg.gif";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";
import { Divider } from "../components/Divider";
import { API } from "../axios/API";
import { toast } from "react-toastify";

export const Registration = () => {
  const [registrationUser, setRegistrationUser] = useState({
    login: "",
    password: "",
    firstName: "",
    lastName: "",
    langKey: "hu",
  });
  const [error, setError] = useState("");
  const handleRegistrationChanges = (e) => {
    setRegistrationUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    API.post("/api/register", registrationUser)
      .then((res) => {
        toast.success(
          "Sikeresen regisztráltál. Erősítsd meg regisztációdat, amit elküldtünk e-mailben."
        );
      })
      .catch((err) => setError(err?.response?.data?.title));
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center gap-3">
        <form onSubmit={handleSubmit}>
          <div className="min-w-[400px] grid gap-4 border-solid border border-gray-200 rounded-xl bg-gray-50 p-6">
            {error && (
              <div className="bg-red-300 py-4 pl-2 rounded-lg text-red-900 font-semibold">
                <h1>{error}</h1>
              </div>
            )}
            <div>
              <label className="text-lg font-medium text-gray-600">
                Felhasználónév <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="login"
                className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
                placeholder="Írd a felhasználóneved..."
                required
                onChange={handleRegistrationChanges}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-600">
                E-mail <span className="text-red-700">*</span>
              </label>
              <input
                type="email"
                name="email"
                className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
                placeholder="Írd az e-mail címed..."
                required
                onChange={handleRegistrationChanges}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-600">
                Vezetéknév <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
                placeholder="Írd a vezetékneved..."
                required
                onChange={handleRegistrationChanges}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-600">
                Keresztnév <span className="text-red-700">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
                placeholder="Írd a keresztneved..."
                required
                onChange={handleRegistrationChanges}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-600">
                Jelszó <span className="text-red-700">*</span>
              </label>
              <input
                type="password"
                name="password"
                className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
                placeholder="******"
                required
                onChange={handleRegistrationChanges}
              />
            </div>
            <div>
              <label className="text-lg font-medium text-gray-600">
                Jelszó megerősítés <span className="text-red-700">*</span>
              </label>
              <input
                type="password"
                name="passwordAgain"
                className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
                placeholder="******"
                required
                onChange={handleRegistrationChanges}
              />
            </div>
            <Button text={"Regisztáció"} variant={"primary"} type={"submit"} />

            <div className="text-center">
              <h1>
                Van már felhasználód?{" "}
                <span>
                  <Link
                    to={"/login"}
                    className="font-bold text-emerald-500 cursor-pointer underline hover:text-green-600"
                  >
                    Belépés
                  </Link>
                </span>
              </h1>
            </div>
            <Divider text={"vagy"} />
            <div className="flex justify-around items-center text-2xl text-gray-600">
              <FacebookOutlined className="hover:text-emerald-400 hover:cursor-pointer " />
              <GoogleOutlined className="hover:text-emerald-400 hover:cursor-pointer" />
            </div>
          </div>
        </form>
        <div>
          <img src={loginBg} alt="Login background image" />
        </div>
      </div>
    </>
  );
};
