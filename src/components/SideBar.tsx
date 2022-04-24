import { Link, navigate, useLocationChange } from "raviger";
import React, { useContext, useState } from "react";
import { UserLoginContext } from "../context/UserLoginContext";
import { logout } from "../utils/ApiUtils";

function SideBar(props: { children: React.ReactNode }) {
  const { setUser } = useContext(UserLoginContext);
  const routesLinks = [
    { label: "Home", route: "/", icon: "home" },
    { label: "Boards", route: "/boards", icon: "columns" },
    { label: "To Do", route: "/todo", icon: "list" },
  ];

  const [location, setLoc] = useState<any>(null);
  useLocationChange(setLoc, { onInitial: true });
  console.log(location?.path);

  const NAME = "KUNAL KUMAR JHA";
  async function handleLogout() {
    logout();
    await setUser();
    navigate("/");
  }

  function timeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 12) {
      return "Morning";
    } else if (hours >= 12 && hours < 17) {
      return "Afternoon";
    } else {
      return "Evening";
    }
  }

  function getDay() {
    let outputString;
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const dayOfMonth = date.getDate();

    outputString = days[day] + ", " + months[month] + " " + dayOfMonth;
    return outputString;
  }

  return (
    <div>
      <div className="h-max sys-app-notCollapsed">
        <div className="mx-auto flex h-full">
          {/* SIDEBAR */}
          <div className="w-64 h-full fixed left-0 top-0">
            <div className="w-full py-8 h-full relative text-white bg-gray-900 text-left capitalize font-medium shadow-xl">
              <Link href="/">
                <h1 className="pb-10 px-2 font-semibold text-xl flex justify-center gap-2">
                  <span className="text-2xl text-gray-200">Kamawich</span>
                  <svg className="w-8 h-8" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <radialGradient
                        cx="21.152%"
                        cy="86.063%"
                        fx="21.152%"
                        fy="86.063%"
                        r="79.941%"
                        id="header-logo"
                      >
                        <stop stopColor="#4FD1C5" offset="0%" />
                        <stop stopColor="#81E6D9" offset="25.871%" />
                        <stop stopColor="#338CF5" offset="100%" />
                      </radialGradient>
                    </defs>
                    <rect
                      width="32"
                      height="32"
                      rx="16"
                      fill="url(#header-logo)"
                      fillRule="nonzero"
                    />
                  </svg>
                </h1>
              </Link>

              <div>
                {routesLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.route}
                    className={`cursor-pointer px-6 py-4 rounded block my-2 ${
                      location?.path === link.route
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    <i className={"w-8 fas bg-gray-200 rounded-full" + link.icon}></i>
                    <span className="mx-4">{link.label}</span>
                  </Link>
                ))}
              </div>

              <span className="cursor-pointer absolute bottom-4 px-2 py-1  w-full border-t-2 border-blue-500 flex">
                <img
                  src="https://lh3.googleusercontent.com/-U0lTbxzh0bE/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rdJubMZweMDYD49ddsxq1wXai_9Cg/s48-c/photo.jpg"
                  alt="alt placeholder"
                  className="w-12 h-12 mt-1 rounded-full inline-block"
                />
                <div className="flex flex-col justify-evenly mx-3">
                  <div className="font-semibold lowercase hover:text-blue-200">
                    <span className="text-blue-500">@</span>
                    {NAME}
                  </div>
                  <button className="text-gray-700" type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              </span>
            </div>
          </div>
          <div className="ml-64 w-full">
            <div className="h-max sys-app-notCollapsed">
              <div className="px-10 py-10">
                {/* Greetings and time */}
                <h1 className="text-lg py-2">
                  Good {timeOfDay()}, <span className="text-gray-600">{getDay()}</span>
                </h1>
                {props.children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
