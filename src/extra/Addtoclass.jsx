import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { endpoints } from '../services/apis';
import { useSelector } from 'react-redux';
import Spinner from '../image/Spinner';
import book from '../image/book.png';
import user from '../image/user-solid.svg';
const add = async (body, token) => {
    try {
        const res = await axios.post(endpoints.ADD, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        });



        if (res.data.success === true) {
            console.log(res.data);
            toast.success('User added successfully');
        }
        else{
            console.log(res.data);
            toast.error(res.data.message);
        }
    } catch (error) {
        console.error(error);
    }
};



const Addtoclass = () => {
  const [userName, setUserName] = useState('');
  const [class1, setClass1] = useState('');
  const [loading, setLoading] = useState(false);
  const {token} = useSelector((state) => state.auth); 

  const handleLogin = (event) => {
    event.preventDefault();
    setLoading(true);
     
    const body = {
        "userName": userName,
        "instructorName":class1,
        }

    add(body,token);
    setUserName('');
    setClass1('');

    
    setLoading(false);
    console.log(`Email: ${userName}, class: ${class1}`);
  };

if(loading){
    return <Spinner/>
}
 

  return (

    <div className='flex justify-center items-center min-h-screen '>
    <div className=' flex flex-col justify-center p-1 rounded-xl w-[400px] '>
        <form className='max-w-[400px] w-full mx-auto rounded-2xl bg-gray-900 p-[15%] ml-[10%] pl-[10%] pr-[10%]'>
        <div className='flex'>
  <img src={user} className='flex mb-5 ml-16' width='22%' />
  <img src={book} className='mb-5 ml-10 mt-7' width='22%' />
</div>
            <h2 className='text-4xl dark:text-white font-bold text-center mb-5'><span className='underline font-semibold'>Add user to class</span></h2>
            <div className='flex flex-col text-gray-400 py-2'>
                <input className='rounded-lg text-gray-100 bg-gray-700 mt-3 p-3 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" placeholder='Username' value={userName} onChange={(e) => setUserName(e.target.value)}  />
            </div>
            <div className='flex flex-col text-gray-400 py-2'>
              
                <input className='p-3 rounded-lg bg-gray-700 mt-3 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'placeholder="class" value={class1}
            onChange={(e) => setClass1(e.target.value)} />
            </div>
            <div className='flex justify-center item-center text-gray-400 py-2'>
                
    
            </div>
            <button className='w-[50%] m-5 p-4 rounded-2xl bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'  onClick={handleLogin}> Submit </button>

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
    //                     <h1 class="text-2xl font-semibold">Add user to class</h1>
    //                 </div>
    //                 <div class="divide-y divide-gray-200">
    //                     <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
    //                         <div class="relative">
    //                             <input autocomplete="off" id="usename" name="usename" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="UserName" value={userName} onChange={(e) => setUserName(e.target.value)} />
    //                             <label for="usename" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">UserName</label>
    //                         </div>
    //                         <div class="relative">
    //                             <input autocomplete="off" id="class" name="class" type="text" class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600" placeholder="class" value={class1}
    //         onChange={(e) => setClass1(e.target.value)} />
    //                             <label for="class" class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">class</label>
    //                         </div>
                          
    //                         <div class="relative">
    //                             <button class="bg-blue-500 text-white rounded-md px-2 py-1" onClick={handleLogin}>Submit</button>
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

export default Addtoclass;
