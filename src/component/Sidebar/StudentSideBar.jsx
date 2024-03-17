import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaCode,
  FaHome,
  FaLaptopCode,
  FaLock,
  FaMoneyBill,
  FaSign,
  FaUser,
  FaUserAltSlash,
  FaUserAstronaut,
  FaUserCircle,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import TodoList from "../../extra/TodoList";

import React from "react";
import { useEffect } from "react";
import { endpoints } from "../../services/apis";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../../image/Spinner";
import { Link } from "react-router-dom";
import { useScroll } from "framer-motion";
import code from "../../image/code.jpg";

const routes = [
  {
    path: "/Dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },

  //   {
  //     path: "/file-manager",
  //     name: "Create Use",
  //     icon: <FaUserAstronaut />,
  //     subRoutes: [
  //       {
  //         path: "/dashboard/add",
  //         name: "Add User ",
  //         icon: <FaUser />,
  //       },
  //       {
  //         path: "/dashboard/addtoclass",
  //         name: "Add User To Class",
  //         icon: <FaUserCircle />,
  //       },
  //     ],
  //   },

  {
    path: "/dashboard",
    name: "Classes",
    icon: <FaLaptopCode />,
  },
  {
    path: "/try",
    name: "IDE",
    icon: <FaCode />,
  },

  //   {
  //     path: "/settings",
  //     name: "S",
  //     icon: <BiCog />,
  //     exact: true,
  //     subRoutes: [
  //       {
  //         path: "/settings/profile",
  //         name: "Profile ",
  //         icon: <FaUser />,
  //       },
  //     ],
  //   },

  {
    path: "/logout",
    name: "Logout",
    icon: <FaLock />,
  },
];

const SideBar = ({ children }) => {
  // const { token } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  const { scrollYProgress } = useScroll();

  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState([]);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await axios.get(endpoints.GET_INS, {
          params: user,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setResponseData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    setLoading(false);
  }, []);
  if (loading || responseData.length === 0) {
    return <Spinner />;
  }

  return (
    <>
      <div className="main-container">
        <div className="z-10 flex ">
          <motion.div
            animate={{
              width: isOpen ? "200px" : "45px",

              transition: {
                duration: 0.5,
                type: "spring",
                damping: 10,
              },
            }}
            className={`sidebar`}
          >
            <div className="top_section">
              <AnimatePresence>
                {isOpen && (
                  <motion.h1
                    variants={showAnimation}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    className="logo"
                  >
                    Hello Student{""}
                  </motion.h1>
                )}
              </AnimatePresence>

              <div className="bars">
                <FaBars onClick={toggle} />
              </div>
            </div>
            <div className="search">
              <div className="search_icon">
                <BiSearch />
              </div>
              <AnimatePresence>
                {isOpen && (
                  <motion.input
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    variants={inputAnimation}
                    type="text"
                    placeholder="Search"
                  />
                )}
              </AnimatePresence>
            </div>
            <section className="routes">
              {routes.map((route, index) => {
                if (route.subRoutes) {
                  return (
                    <SidebarMenu
                      setIsOpen={setIsOpen}
                      route={route}
                      showAnimation={showAnimation}
                      isOpen={isOpen}
                    />
                  );
                }

                return (
                  <NavLink
                    to={route.path}
                    key={index}
                    className="link"
                    activeClassName="active"
                  >
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          variants={showAnimation}
                          initial="hidden"
                          animate="show"
                          exit="hidden"
                          className="link_text"
                        >
                          {route.name}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </NavLink>
                );
              })}
            </section>
          </motion.div>
        </div>

        {/* <div className="font-semibold font-mono text-4xl">Hello Student</div> */}

        <main className="flex-wrap mt-10 p-8 bg-white rounded-lg shadow-lg border-gray-400 border-2 h-[50%]">
          <div className=" flex items-center">
            <div>
              <h1 className="text-3xl font-semibold"># All Subjects</h1>
            </div>
          </div>

          <div className="flex justify-evenly">
            {responseData.length > 0 &&
              responseData.map((data) => {
                return (
                  <Link className="" to={`sub/${data.id}`}>
                    <div className="flex justify-center text-black font-semibold  p-10 rounded-3xl m-2">
                      <div className=" bg-sky-100 hover:bg-blue-200 p-10 pl-20 pr-20 rounded-2xl ">
                        <div className="">Ends On: 25 Mar</div>

                        <div className="mx-auto p-5">
                          <img
                            src={code}
                            width="80px"
                            className="rounded-xl ml-4"
                          />
                        </div>

                        <p>
                          Language(s):
                          <div className="mt-1 font-bold">{data.name}</div>
                        </p>

                        <p className="pb-3 ">Faculty: Aditi Pawde</p>
                        <button
                          style={{
                            backgroundColor: "purple",
                            color: "white",
                            padding: "14px",
                            borderRadius: "5px",
                          }}
                        >
                          View
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
          </div>
        </main>
      </div>
    </>
  );
};

export default SideBar;
