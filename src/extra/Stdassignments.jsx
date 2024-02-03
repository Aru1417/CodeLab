import React from 'react'
import { useParams,Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import Spinner from '../image/Spinner';
import toast from 'react-hot-toast';
import axios from 'axios';
import forbidden from "../component/images/forbidden.png"
import file from '../image/file.png'
import { ClassNames } from '@emotion/react';
const BASE_URL = process.env.REACT_APP_API_URL




const Stdassignments = () => {
    const { id } = useParams();
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);
    const [result,setResult] = useState([]);
    useEffect(() => {
        setLoading(true);

        const body = {
            InsId: id
        }
      
        add(body,token);


        setLoading(false);
    }, []);




    const add = async (body, token) => {
        try {
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            const res = await axios.post(BASE_URL + "/api/v1/auth/getallasg", body);
            console.log( res.data.data);
    
            // const res = await axios.get(BASE_URL+"/api/v1/auth/getallasg", body, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            // });
    
    
    
            if (res.data.success === true) {
                
                toast.success(res.data.message);
                setResult(res.data.data);
            }
            else{
                
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };







   if (loading) <Spinner/>
  

    return (
    <div className='min-h-screen'>
         
    {/* {
        
        result.length>0 && result.map((data) => {
            return <div><Link to={`${data._id}`}><div>{data.name}</div> </Link></div>
        })
        // result.length>0 && <div> {result}</div>
        
       
    } */}
    {
        <div className="flex justify-center mt-4">
        <main className=" w-[90%] p-8 bg-white rounded-lg shadow-lg border-gray-400 border-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold"># Assignments</h1>
            </div>
          </div>
         { result.length>0 && result.map((data) => {
            return <div><Link to={`${data._id}` }>
                <div className='flex text-xl bg-slate-200 rounded-xl p-5 m-5'>
                  <img src={file} className='flex justify-center' width="40px"/>
                {data.name}
                </div> 
                </Link></div>
        })}
        </main>
      </div> 

    }
    {
        result.length == 0 && <div className='min-h-screen flex items-center justify-center flex-col'>
            <img  className ="w-16 "src ={forbidden}></img>
              <div className='font-semibold'>No Assignment</div>
            </div>
    }
  </div>
  )
}

export default Stdassignments;


{/* <div className="flex justify-center mt-4">
        <main className=" w-[90%] p-8 bg-white rounded-lg shadow-lg border-gray-400 border-2">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-semibold"># Create User</h1>
            </div>
          </div>

        </main>
      </div> */}