"use client";

import Link from "next/link";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Dropdown, Space, Card } from "antd";
import { useRouter } from "next/navigation";
import { useLoginData } from "./context/LoginContext";

const loggedInItems = (logout) => [
  {
    key: "1",
    label: (
      <a className="flex items-center gap-2" onClick={logout}>
        <IoMdLogOut />
        Sign Out
      </a>
    ),
    danger: true,
  },
];

const loggedOutItems = [
  {
    key: "1",
    label: (
      <Link href="/user/signin" className="px-5">
        Sign In
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link href="/user/signup" className="px-5">
        Sign Up
      </Link>
    ),
  },
];

const Navbar = () => {
  const router = useRouter();

  const { loginData, setLoginData } = useLoginData();

  const logout = () => {
    localStorage.removeItem("loginData");
    setLoginData(null);
    router.push("/user/signin");
  };

  return (
    <div>
      <div className="bg-white fixed z-50 shadow-md top-0 left-3 right-3 flex items-center justify-between px-10 py-2 rounded-b-md">
        <span className="cursor-pointer hover:text-orange-500">
          {" "}
          <Link href="/">Home</Link>
        </span>
        {loginData && (
          <>
            {" "}
            <span className="cursor-pointer hover:text-orange-500">
              {" "}
              <Link href="/blog">blog</Link>
            </span>
            <span className="cursor-pointer hover:text-orange-500">
              {" "}
              <Link href="/blog/create">create</Link>
            </span>
          </>
        )}

        <span>
          {loginData ? (
            <div className="flex items-center gap-2">
              <p className="text-sm">{loginData?.data?.userName}</p>
              <Dropdown
                menu={{ items: loggedInItems(logout) }}
                className="cursor-pointer"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <img
                      src={loginData?.data?.image}
                      alt=""
                      className="w-[40px] aspect-square rounded-[50%] object-cover"
                    />
                  </Space>
                </a>
              </Dropdown>
            </div>
          ) : (
            <div className="cursor-pointer hover:text-orange-500">
              <Dropdown menu={{ items: loggedOutItems }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <FaUser />
                  </Space>
                </a>
              </Dropdown>
            </div>
          )}
        </span>
      </div>
    </div>
  );
};

export default Navbar;
