import React, { useEffect, useState } from "react";
import verifySvg from "../assets/waiting-for-verify.svg";
import {
  Link,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { API } from "../axios/API";
import { APILogin } from "../axios/APILogin";
import axios from "axios";
import {
  CheckCircleFilled,
  CheckCircleOutlined,
  CloseCircleFilled,
} from "@ant-design/icons";

export const ConfirmRegistration = () => {
  const location = useLocation();
  const [queryParams] = useSearchParams();
  const [error, setError] = useState("");
  console.log({ queryParams });
  useEffect(() => {
    API.get(`api/activate?key=${queryParams.get("key")}`)
      .then((res) => res.data)
      .catch((err) => setError(err?.response?.status));
  }, []);

  return (
    <div>
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="rounded-lg border border-gray-200 p-3 text-center border-solid max-w-[500px]">
          <div className="flex justify-center">
            <img src={verifySvg} alt="" className="w-72 h-72" />
          </div>
          {error == 500 ? (
            <>
              <div className="bg-red-300 p-2 rounded-lg my-4 flex">
                <div className="flex items-start">
                  <CloseCircleFilled className="text-red-800 text-3xl align-middle" />
                </div>
                <div>
                  <span className="font-semibold text-red-900">
                    A hozzáférését nem sikerült aktiválni.
                  </span>{" "}
                  Kérjük használja a regisztrációs oldalt, hogy hozzáférést
                  igényeljen.
                </div>
              </div>
              <Link
                to={"/registration"}
                className="flex justify-center text-lg font-medium rounded-xl border px-4 py-1.5 bg-emerald-300 text-gray-900 hover:bg-emerald-400 border-emerald-400"
              >
                Regisztráció
              </Link>
            </>
          ) : (
            <>
              <div className="">
                <CheckCircleFilled className="text-emerald-300 text-5xl" />
                <h1 className="text-2xl my-5">
                  Sikeresen aktiváltad a fiókodat.
                </h1>
              </div>
              <Link
                to={"/login"}
                className="flex justify-center text-lg font-medium rounded-xl border px-4 py-1.5 bg-emerald-300 text-gray-900 hover:bg-emerald-400 border-emerald-400"
              >
                Bejelentkezés
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
