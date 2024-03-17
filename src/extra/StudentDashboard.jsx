import React from "react";
import { useState, useEffect } from "react";
import { endpoints } from "../services/apis";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../image/Spinner";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import code from "../image/code.jpg";

import Dashboard from "../component/pages/Dashboard";
import Users from "../component/pages/Users";
import Messages from "../component/pages/Messages";
import FileManager from "../component/pages/FileManager";
import Analytics from "../component/pages/Analytics";
import Order from "../component/pages/Order";
import Saved from "../component/pages/Saved";
import Setting from "../component/pages/Setting";
import TodoList from "./TodoList";

import BottomNavBar from "../extra/BottomNavBar";

import "./SideBar.css";
import StudentSideBar from "../component/Sidebar/StudentSideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const StudentDashboard = () => {
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
    <div className="min-h-screen scroll-smooth focus:scroll-auto">
      <motion.div
        className="fixed p-0 top-0 left-0 z-10 right-0 h-3 bg-red-500 animate-none origin-top-left"
        style={{ scaleX: scrollYProgress }}
      />

      <StudentSideBar>
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
      </StudentSideBar>

      {/* <div className="">
        <BottomNavBar />
      </div> */}
    </div>
  );
};

export default StudentDashboard;

// <div className='h-screen flex justify-center flex-col '>
//     {responseData.length > 0 && responseData.map((data) => {
//         return <div>
//             <Link  className="" to={`sub/${data.id}`}>
//            <div className='flex w-[70%] mx-auto flex-col  justify-center items-center  '>
//            <div className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 m-2'>{data.name}</div>
//            </div>
//             </Link>

//              </div>

//     })}
// </div>
