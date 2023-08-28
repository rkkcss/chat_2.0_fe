import React from "react";
import loginBg from "../assets/loginBg.gif";
import { Button } from "../components/Button";
import { Link } from "react-router-dom";

export const Registration = () => {
  const handleRegistration = () => {};
  const handleSubmit = () => {};
  return (
    <div className="min-h-screen flex justify-center items-center gap-3">
      <form onSubmit={handleSubmit}>
        <div className="min-w-[400px] grid gap-4 border-solid border border-gray-200 rounded-xl bg-gray-50 p-6">
          <div>
            <label className="text-lg font-medium text-gray-600">
              Felhasználónév <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="username"
              className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
              placeholder="Írd a felhasználóneved..."
              required
              onChange={handleRegistration}
            />
          </div>
          <div>
            <label className="text-lg font-medium text-gray-600">
              Vezetéknév <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="username"
              className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
              placeholder="Írd a felhasználóneved..."
              required
              onChange={handleRegistration}
            />
          </div>
          <div>
            <label className="text-lg font-medium text-gray-600">
              Keresztnév <span className="text-red-700">*</span>
            </label>
            <input
              type="text"
              name="username"
              className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
              placeholder="Írd a felhasználóneved..."
              required
              onChange={handleRegistration}
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
              onChange={handleRegistration}
            />
          </div>
          <div>
            <label className="text-lg font-medium text-gray-600">
              Jelszó megerősítés <span className="text-red-700">*</span>
            </label>
            <input
              type="password"
              name="password"
              className="mt-3 shadow border rounded-xl w-full px-2.5 py-2.5 text-gray-700 leading-tight focus:outline-emerald-100 focus:shadow-outline"
              placeholder="******"
              required
              onChange={handleRegistration}
            />
          </div>
          <Button text={"Regisztáció"} variant={"primary"} type={"submit"} />

          <div className="text-center">
            <h1>
              Nincs még felhasználód?{" "}
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
        </div>
      </form>
      <div>
        <h1 className="text-center text-4xl ">
          Regisztrálj és beszélgess barátaiddal!
        </h1>
        <img src={loginBg} alt="Login background image" />
      </div>
    </div>
  );
};
