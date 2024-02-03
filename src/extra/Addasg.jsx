import React, { useState } from 'react';
import Spinner from '../image/Spinner';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

import assignment from '../image/paper.png';

const BASE_URL = process.env.REACT_APP_API_URL




const Addasg = () => {
  const [asgName,setAsgName] = useState('');
  const [date, setDate] = useState('');
  const[loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth); 
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    const jsonData = {
                     assignmentname:asgName,
                     lastdate:date
                }
   
   
    
    send(jsonData,token);
    setAsgName('');
    setDate('');

    setLoading(false);
  };

  const send = async (body,token) => {
    try {
        
        // setRes('')
        

        const res = await axios.post(BASE_URL+'/api/v1/auth/addasg', body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });
        if (res.data.success === true) {
            console.log(res.data);
            toast.success(res.data.message);
        }
        else{
            console.log(res.data);
            toast.error(res.data.message);
        }
      
        
        
        
        
    } catch (error) {
        console.error('Error:', error);
    }
}
 

if(loading){
    return <Spinner></Spinner>
}


  return (
    <div className='flex justify-center items-center min-h-screen '>
    <div className=' flex flex-col justify-center p-1 rounded-xl w-[400px] '>
        <form className='max-w-[400px] w-full mx-auto rounded-2xl bg-gray-900 p-[15%] ml-[10%] pl-[10%] pr-[10%]'>
             <img src={assignment} className='ml-[35%] mb-8' width='30%'/>
            <h2 className='text-4xl dark:text-white font-bold text-center mb-5'><span className='underline font-semibold'> Add Assignment </span></h2>
          
            <div className='flex flex-col text-gray-400 py-2'>
                <input className=' rounded-lg text-gray-100 bg-gray-700 mt-3 p-3 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder="Question" value={asgName} onChange={(e) => setAsgName(e.target.value)}  />
            </div>
            {/* <div className='flex flex-col text-gray-400 py-2'>
              
                <input className='p-3 rounded-lg bg-gray-700 mt-3' value={date} onChange={(e) => setDate(e.target.value)} />
            </div> */}

<div className='flex flex-col text-gray-400 py-2'>
                                 <input autocomplete="off" id="password" name="Date" type="date" className="rounded-lg text-gray-100 bg-gray-700 mt-3 p-3" value={date}
            onChange={(e) => setDate(e.target.value)} />
                                {/* <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">lastdate</label> */}
                                </div>

            <button className='w-[50%] m-5 p-4 rounded-2xl bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'  onClick={handleSubmit}> Submit </button>

        </form>
    </div>
</div>


    // <form> 
    // <div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    //     <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    //         <div
    //             class="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
    //         </div>
    //         <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
    //             <div class="max-w-md mx-auto">
    //                 <div>
    //                     <h1 class="text-2xl font-semibold">Assignment </h1>
    //                 </div>
    //                 <div class="divide-y divide-gray-200">
    //                     <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
    //                         <div class="relative">
    //                             <input autocomplete="off" id="usename" name="usename" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="Name" value={asgName} onChange={(e) => setAsgName(e.target.value)} />
    //                             <label for="usename" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Name</label>
    //                         </div>
    //                         <div class="relative">
    //                             <input autocomplete="off" id="password" name="password" type="date" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" value={date}
    //         onChange={(e) => setDate(e.target.value)} />
    //                             <label for="password" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">lastdate</label>
    //                         </div>
    //                         <div class="relative">
    //                             <button class="bg-blue-500 text-white rounded-md px-2 py-1" onClick={handleSubmit}>Submit</button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
    // </form>
  );
};

export default Addasg;
