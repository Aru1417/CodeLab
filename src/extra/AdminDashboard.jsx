import React, { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Link } from "react-router-dom";
import { Menu, MenuItem, MenuButton, MenuDivider } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import dropdown from '../image/caret-down-solid.svg';

let arr = [
  { username: "21510046", exam: "DSA-CSE", date: "09-12-2023", time: "13:05" },
  { username: "21510070", exam: "PL-CSE", date: "09-12-2023", time: "13:05" },
  { username: "21510046", exam: "DSA-CSE", date: "09-12-2023", time: "13:05" },
  { username: "21510046", exam: "DSA-CSE", date: "09-12-2023", time: "13:05" },
];

const AdminDashboard = () => {
  const { scrollYProgress } = useScroll();

  return (
    <>
      {/* <div>
        <Link to="/dashboard/add"><div>Add User</div></Link>
        <Link to="/dashboard/addtoclass"><div>Add User to class</div></Link>
        <Link to="/dashboard/exam"><div>Exam</div></Link>
    </div> */}

      <div className=" min-h-screen bg-slate-200 mb-5 ">
        <motion.div
          className="fixed p-0 top-0 left-0 right-0 h-3 z-10 bg-red-500 animate-none origin-top-left"
          style={{ scaleX: scrollYProgress }}
        />

        <header className="p-0 scroll-smooth focus:scroll-auto">
          <div className="flex flex-row justify-evenly w-full items-center text-2xl p-2 bg-blue-500 text-white">
            <h1 className="text-3xl bg-sky-100 text-black p-2 rounded-xl">Hello Admin !</h1>

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

<Menu menuButton={<MenuButton className="flex justify-center p-2 rounded-lg font-semibold bg-indigo-400 text-black" > Create User <img src={dropdown} width="20px" className="ml-4" /></MenuButton>} transition>
      <MenuItem className='hover:border-2 border-dashed border-black'><Link to="/dashboard/add"> Add User </Link> </MenuItem>
      <MenuItem className='hover:border-2 border-dashed border-black'><Link to="/dashboard/addtoclass">Add User To Class</Link> </MenuItem>
      <MenuDivider/>
      <MenuItem className='hover:border-2 border-dashed border-black'> <Link to="/dashboard/exam"> Exam </Link></MenuItem>
    </Menu>

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
          </div>
        </header>

        <div className="flex justify-center mt-4">
          <main className=" w-[90%] p-8 bg-white rounded-lg shadow-lg border-gray-400 border-2">
            <div className="flex items-center justify-between mb-8">
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
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
