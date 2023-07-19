import { useState } from "react";
import { Button } from "../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/authSlice";

export const Login = () => {
  const dispatch = useDispatch();

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(loginData));
  };

  return (
    <div className="min-h-screen grid place-items-center">
      <form onSubmit={handleSubmit}>
        <div className="min-w-[400px] grid gap-4 border-solid border border-gray-200 rounded-xl bg-gray-50 p-6">
          <div className="text-red-800 font-semibold gap-1  hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>

            <span>Felhasználónév vagy jelszó nem megfelelő!</span>
          </div>
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
              onChange={handleLogin}
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
              onChange={handleLogin}
            />
          </div>
          <Button text={"Belépés"} variant={"primary"} type={'submit'} />

          <div className="text-center">
            <h1>
              Nincs még felhasználód?{" "}
              <span>
                <a className="font-bold text-emerald-500 cursor-pointer underline hover:text-green-600">
                  Regisztrálok
                </a>
              </span>
            </h1>
          </div>
        </div>
      </form>
    </div>
  );
};
