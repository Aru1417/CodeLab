import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";
import "./NavBar.css";

function NavBar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [looading, setloading] = useState(false);

  useEffect(() => {
    setloading(true);
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  return (
    <>
      <nav className="opacity-96 border-gray-200 dark:bg-[#041318]">
        {/* looading?( <ClipLoader
        color='red'
        loading={looading}
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />)
    :  */}
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 form-login ">
          <div className="login-box">
            <a href="">
              {/* <h1 className="bg-red-500 z-10 p-3 rounded-2xl border shadow flex items-center self-center text-3xl font-semibold whitespace-nowrap dark:text-white">
            CodeLab
          </h1> */}
              {/* <span></span> */}
              CodeLab
            </a>
          </div>

          <button
            onClick={toggleMenu}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded={menuOpen}
          >
            <span className="sr-only">Toggle menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto mt-4 md:mt-0`}
            id="navbar-default"
          >
            <ul className="opacity-0.5 font-medium flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 md:border-0 md:bg-[#041318] dark:bg-gray-800 dark:border-gray-700">
              <NavLink to="/">
                <li>
                  <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:border-2  md:hover:bg-transparent md:hover:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                    Home
                  </div>
                </li>
              </NavLink>
              <NavLink to="/about">
                <li>
                  <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:border-2  md:hover:bg-transparent md:hover:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                    About
                  </div>
                </li>
              </NavLink>
              <NavLink to="/try">
                <li>
                  <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:border-2  md:hover:bg-transparent md:hover:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                    Try Now
                  </div>
                </li>
              </NavLink>
              {token === null && (
                <NavLink to="/login">
                  <li>
                    <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:border-2  md:hover:bg-transparent md:hover:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                      Login
                    </div>
                  </li>
                </NavLink>
              )}

              {token !== null && (
                <NavLink to="/logout">
                  <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:border-2  md:hover:bg-transparent md:hover:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                    Logout
                  </div>
                </NavLink>
              )}
              {user !== null && (
                <NavLink to="/dashboard">
                  <li>
                    <div className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 hover:border-2  md:hover:bg-transparent md:hover:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent ">
                      Dashboard
                    </div>
                  </li>
                </NavLink>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
