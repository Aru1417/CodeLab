import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton, MenuDivider } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import dropdown from "../image/caret-down-solid.svg";
import SideMenu from "./SideMenu";

import "./SideBar.css";
import SideBar from "../component/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "../component/pages/Dashboard";
import Users from "../component/pages/Users";
import Messages from "../component/pages/Messages";
import FileManager from "../component/pages/FileManager";
import Analytics from "../component/pages/Analytics";
import Order from "../component/pages/Order";
import Saved from "../component/pages/Saved";
import Setting from "../component/pages/Setting";
import TodoList from "./TodoList";

const AdminDashboard = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* <div>
        <Link to="/dashboard/add"><div>Add User</div></Link>
        <Link to="/dashboard/addtoclass"><div>Add User to class</div></Link>
        <Link to="/dashboard/exam"><div>Exam</div></Link>
    </div> */}

      <div className=" ">
        <motion.div
          className="fixed p-0 top-0 left-0 right-0 h-3 z-10 bg-red-500 animate-none origin-top-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
      {/* 
        <header className="p-0 scroll-smooth focus:scroll-auto">
          <div className="flex flex-row justify-evenly w-full items-center text-2xl p-2 bg-blue-500 text-white">
            {/* <h1 className="text-3xl bg-sky-100 text-black p-2 rounded-xl">
              Hello Admin !
            </h1> */}
      {/* <select
              className="flex justify-center p-2 rounded-lg font-semibold bg-violet-500 text-white"
              value="Create User"
              >
              <option
              value="/dashboard/add"
              className=" bg-blue-500 hover:bg-blue-700 text-white"
              >
              {" "}
              <Link to="/dashboard/add">Add User</Link>{" "}
              </option>
              
              <option
              value="/dashboard/addtoclass"
              className=" bg-blue-500 hover:bg-blue-700 text-white"
              >
              Add User To Class{" "}
              </option>
              
              <option value="/" className=" text-white">
                {" "}
                <Link to="/dashboard/exam">Exam</Link>
              </option>
            </select> */}
      {/* 
            <Menu
              menuButton={
                <MenuButton className="flex justify-center p-2 rounded-lg font-semibold bg-indigo-400 text-black">
                  {" "}
                  Create User{" "}
                  <img src={dropdown} width="20px" className="ml-4" />
                </MenuButton>
              }
              transition
            >
              <MenuItem className="hover:border-2 border-dashed border-black">
                <Link to="/dashboard/add"> Add User </Link>{" "}
              </MenuItem>
              <MenuItem className="hover:border-2 border-dashed border-black">
                <Link to="/dashboard/addtoclass">Add User To Class</Link>{" "}
              </MenuItem>
              <MenuDivider />
              <MenuItem className="hover:border-2 border-dashed border-black">
                {" "}
                <Link to="/dashboard/exam"> Exam </Link>
              </MenuItem>
            </Menu> */}

      {/* <div className="flex justify-center p-5   rounded-lg font-semibold bg-violet-900 hover:bg-blue-700 text-white"> */}

      {/* <div className="flex justify-center "> */}
      {/* <main className="  bg-white rounded-lg shadow-lg border-gray-400 border-2">
              <div className="flex items-center justify-between "></div>

              <div className="flex justify-center w-full">
              <div className="flex flex-col   gap-6 text-lg items-center bg-slate-100">
                  <Link className="" to="/dashboard/add">
                    <div className="flex justify-center p-5   rounded-lg font-semibold bg-violet-900 hover:bg-blue-700 text-white">
                      Add User
                      </div>
                  </Link>

                  <Link className="" to="/dashboard/addtoclass">
                    <div className="flex justify-center p-5   rounded-lg font-semibold bg-blue-500 hover:bg-blue-700 text-white">
                      {" "}
                      Add User to class
                    </div>
                  </Link>

                  <Link className="" to="/dashboard/exam">
                    <div className="flex justify-center p-5   rounded-lg font-semibold bg-blue-500 hover:bg-blue-700 text-white">
                      Exam
                      </div>
                  </Link>
                </div>
              </div>
            </main> */}
      {/* </div> */}
      {/* </header>  */}
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          {/* <Route path="/messages" element={<Messages />} /> */}
          {/* <Route path="/analytics" element={<Analytics />} /> */}
          <Route path="/file-manager" element={<FileManager />} />
          {/* <Route path="/order" element={<Order />} /> */}
          <Route path="/saved" element={<Saved />} />
          {/* <Route path="/settings" element={<Setting />} /> */}

      
          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </>
  );
};

export default AdminDashboard;
