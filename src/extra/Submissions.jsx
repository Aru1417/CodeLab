import React from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "../image/Spinner";
import toast from "react-hot-toast";
import axios from "axios";
import forbidden from "../component/images/forbidden.png";
import file from '../image/file.png'
const BASE_URL = process.env.REACT_APP_API_URL;

const send = async ({ token, stdid }) => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  const params = {
    stdid: stdid,
  };

  const res = await axios.get(BASE_URL + "/api/v1/auth/getallsub", {
    params: params,
  });
  return res;
};

const Submissions = () => {
  const stdid = useParams();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const { token } = useSelector((state) => state.auth);
  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const result = await send({ token: token, stdid: stdid });
        //   console.log(result.data.data)
        //   console.log(result.data.data[0][0])
        //   setData(result.data.data);

        const resultArray = result.data.data.reduce((acc, submissionArray) => {
          const submission = submissionArray[0];
          const userId = submission.user;
          const questionId = submission.question._id;
          const questionName = submission.question.name;
          const submissionId = submission._id;

          acc.push({ userId, questionId, questionName, submissionId });
          return acc;
        }, []);
        console.log(resultArray);
        setData([...resultArray]);
        // for (let i = 0; i < resultArray.length; i++) {
        //     setData((prev) => {
        //     //   console.log(prev);
        //       return [...prev, resultArray[i]];
        //     });
        //   }

        //   console.log(data)
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return loading ? (
    <Spinner />
  ) : (
    <div>
      {data.length > 0 ? (
        // <div>
        //   {
        //   data.map((obj)=>{
        //     return(<div key={obj.userId}><Link to= {`${obj.questionId}/${obj.submissionId}`}>{obj.questionName}</Link></div>)

        //   }
        //   )
        //   }
        // </div>
        <div className="min-h-[80vh]">
        <div className="flex justify-center mt-4">
          <main className=" w-[90%] p-8 bg-white rounded-lg shadow-lg border-gray-400 border-2">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-3xl font-semibold"># Student Submissions </h1>
              </div>
            </div>
            <div className="flex items-center justify-center ">
              <div className=" w-[90%]">
                {data.map((obj) => {
                  return (
                    <div key={obj.userId}>
                      <Link to={`${obj.questionId}/${obj.submissionId}`}>
                        <div  className="flex text-xl bg-slate-200 rounded-xl p-5 m-5">
                        <img src={file} className='flex justify-center' width="40px"/>
                         {obj.questionName}</div>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </main>
        </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen flex-col font-semibold">
          {" "}
          <img className="w-16" src={forbidden} alt="" />
          No assignments submitted
        </div>
      )}
    </div>
  );
};

export default Submissions;
