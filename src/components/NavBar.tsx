import React, { useState, useEffect } from "react";
import { Link } from "raviger";

function Header() {
  const [top, setTop] = useState(true);

  // detect whether user has scrolled the page down by 10px
  useEffect(() => {
    const scrollHandler = () => {
      window.pageYOffset > 10 ? setTop(false) : setTop(true);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, [top]);

  return (
    <header
      className={`fixed w-full z-30 md:bg-opacity-90 transition duration-300 ease-in-out ${
        !top && "bg-white backdrop-blur-sm shadow-lg"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between mt-0 py-4 px-4 max-w-screen-xl">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <Link className="font-semibold text-xl tracking-tight flex flex-row" href="/">
            <span className="text-2xl text-gray-900">Kamawich</span>
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
              <rect width="32" height="32" rx="16" fill="url(#header-logo)" fillRule="nonzero" />
            </svg>
          </Link>
        </div>
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <div>
            <Link
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-600 hover:text-gray-900 mr-10"
              href="/signin"
            >
              Sign In
            </Link>
            <Link
              className="font-medium inline-flex items-center justify-center border border-transparent rounded leading-snug transition duration-150 ease-in-out bg-black px-8 py-3 shadow-lg"
              href="/signup"
            >
              Sign Up ⚒
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
