import React from 'react'
import { useParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import axios from 'axios';
import Spinner from '../image/Spinner';
import Codesub from '../component/Codesub';
// import { Toaster } from "@/components/ui/sonner"


const BASE_URL = process.env.REACT_APP_API_URL


const Submitasg = () => {
    const { id2 } = useParams();
    const {token} = useSelector((state) => state.auth);
    const [loading,setLoading] = useState(false);
    const [result,setResult] = useState("");

    useEffect(() => {
        setLoading(true);

      const jsonData={
        asgId: id2
       }
      
       add(jsonData,token);


        setLoading(false);
    }, []);


    const add = async (body, token) => {
        try {
    
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            const res = await axios.post(BASE_URL + "/api/v1/auth/getasg", body);
            // console.log( res.data);
    
            // const res = await axios.get(BASE_URL+"/api/v1/auth/getallasg", body, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${token}`
            //     },
            // });
    
    
    
            if (res.data.success === true) {
                console.log(res.data.data);
                toast.success(res.data.message);
                setResult(res.data.data.name);
                console.log(result);
            }
            else{
                
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
    };





//  if (loading) return(<Spinner/>)
//  else
//     return(

//     )
    return(
        <div>
            {loading?<Spinner/>:
            <div>

                        <Codesub question={result} id={id2} token={token}></Codesub>

            </div>
            }
        </div>
    );
  
}

export default Submitasg