import React from 'react'
import { useNavigate } from 'react-router-dom';
import { logout } from "../services/operations/authapi"
import { useDispatch } from 'react-redux';
import logoout from "../image/log-out.png";

const Logout = () => {
    const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleLogout = (event) => {
    event.preventDefault();
   
    dispatch(logout(navigate))

   
  };

    return (
        <div className='flex justify-center items-center min-h-screen '>
    <div className=' flex flex-col justify-center p-1 rounded-xl w-[400px]'>
        <form className='max-w-[400px] w-full mx-auto rounded-2xl bg-gray-900 p-[15%] pl-[10%] pr-[10%] px-8'>
            <img src={logoout} className='ml-[33%] mb-5' width='35%'/>
            <h2 className='text-4xl ml-2 dark:text-white font-bold text-center'><span className='underline font-bold'>Logged In</span></h2>
            {/* <div className='flex flex-col text-gray-400 py-2'> */}
            
            <div className='flex justify-center item-center text-gray-400 py-2'>
                
            
            </div>
            <button className='w-[50%] m-4 p-4 rounded-2xl bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={handleLogout}>LOGOUT</button>

        </form>
    </div>
</div>

  );
}

export default Logout;