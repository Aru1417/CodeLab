import { NavLink } from "react-router-dom";
import {
  FaBars,
  FaCode,
  FaHome,
  FaLock,
  FaMoneyBill,
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

let arr = [
  { username: "21510046", exam: "DSA-CSE", date: "09-12-2023", time: "13:05" },
  { username: "21510070", exam: "PL-CSE", date: "09-12-2023", time: "13:05" },
  { username: "21510046", exam: "DSA-CSE", date: "09-12-2023", time: "13:05" },
  { username: "21510046", exam: "DSA-CSE", date: "09-12-2023", time: "13:05" },
];

const routes = [
  {
    path: "/Dashboard",
    name: "Dashboard",
    icon: <FaHome />,
  },

  {
    path: "/file-manager",
    name: "Create User ",
    icon: <FaUserAstronaut />,
    subRoutes: [
      {
        path: "/dashboard/add",
        name: "Add User ",
        icon: <FaUser />,
      },
      {
        path: "/dashboard/addtoclass",
        name: "Add User To Class",
        icon: <FaUserCircle />,
      },
    ],
  },

  {
    path: "/dashboard/exam",
    name: "Exam",
    icon: <FaCode />,
  },

  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
    ],
  },

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

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
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
                  Hello Admin{""}
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

        <div className="flex justify-center mt-[8%] mr-10 w-[100%] h-[50%]">
          <main className="p-8 justify-between bg-white rounded-lg shadow-lg border-gray-400 border-2">
            <div className="flex mb-8">
              <div>
                <h1 className="text-3xl font-semibold"># Activity Log</h1>
              </div>
            </div>

            <div className="overflow-x-auto mb-6 ">
              <table className="w-full table-auto text-lg font-semibold">
                <thead className="text-xl">
                  <tr>
                    <th className="px-4 py-2">PRN/Username</th>
                    <th className="px-4 py-2">Exam</th>
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Time</th>
                    <th className="px-4 py-2">Action</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {arr.map((ele) => (
                    <tr>
                      <td className="px-4 py-2">
                        <p>{ele.username}</p>
                      </td>
                      <td className="px-4 py-2">
                        <p>{ele.exam}</p>
                      </td>
                      <td className="px-4 py-2">{ele.date}</td>
                      <td className="px-4 py-2">{ele.time}</td>
                      <td className="px-4 py-2">
                        <button className="px-2 py-1 font-semibold text-white bg-red-500 rounded-md text-lg">
                          Clear
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="rounded-full bg-red-500 text-white p-2 w-32 mt-2 font-semibold text-lg">
              Clear All
            </button>
          </main>
          <TodoList />
        </div>
      </div>
    </>
  );
};

export default SideBar;
