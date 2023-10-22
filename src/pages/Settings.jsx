import { Outlet } from "react-router-dom";
import { SettingsMenuItems } from "../components/SettingsMenuItems";
import {
  DeleteFilled,
  DeleteOutlined,
  DeleteTwoTone,
  PropertySafetyOutlined,
  UserOutlined,
} from "@ant-design/icons";

export const Settings = () => {
  const menuItems = [
    {
      id: 1,
      label: "Saját profil",
      link: "/settings/profile",
      icon: <UserOutlined />,
    },
    {
      id: 2,
      label: "Biztonság",
      link: "/settings/security",
      icon: <PropertySafetyOutlined />,
    },
    {
      id: 3,
      label: "Fiók törlése",
      icon: <DeleteOutlined className="text-red-600" />,
    },
  ];

  return (
    <>
      <div className="flex flex-col w-full">
        <h1 className="px-4 py-3 text-2xl">Beállítások</h1>
        <div className="border h-screen border-gray-200 flex my-5 ml-11 rounded-lg">
          <div className="min-w-max border-r py-7">
            <ul className="w-80 text-lg ">
              {menuItems.map((item) => {
                return <SettingsMenuItems menuItem={item} key={item.id} />;
              })}
            </ul>
          </div>
          <div className="w-full py-2 px-6 mt-5">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
