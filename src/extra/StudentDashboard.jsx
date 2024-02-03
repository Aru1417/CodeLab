import React from "react";
import { useState, useEffect } from "react";
import { endpoints } from "../services/apis";
import { useSelector } from "react-redux";
import axios from "axios";
import Spinner from "../image/Spinner";
import { Link } from "react-router-dom";
import { motion, useScroll } from "framer-motion";
import code from  '../image/code.jpg';
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

      <div className="font-semibold font-mono text-4xl" >Hello Student</div> 
      <div className="flex justify-center mt-4 ">
        <main className=" w-[90%] p-8 bg-white rounded-lg shadow-lg border-gray-400 border-2 h-[50%]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold"># All Subjects</h1>
            </div>
          </div>
          <div className="w-[100%]  flex justify-evenly">
            {responseData.length > 0 &&
              responseData.map((data) => {
                return (
                  <Link className="" to={`sub/${data.id}`}>
                  <div className="flex flex-col justify-center bg-sky-100 hover:bg-blue-200 text-black font-bold w-52 h-40 rounded-3xl m-2">
                      <div className="mx-auto ">
                          <img src={code} width='80px' className="rounded-xl"/>
                        <div className="mt-1 ">
                          {data.name}
                        </div>
                      </div>
                  </div>
                    </Link>
                );
              })}
          </div>
        </main>
      </div>
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
