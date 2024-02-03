import React, { useState,useEffect } from 'react';
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-c_cpp'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/src-noconflict/mode-java'
import 'ace-builds/src-noconflict/theme-terminal'
import 'ace-builds/src-noconflict/theme-kuroir'
import 'ace-builds/src-noconflict/theme-github_dark'
import 'ace-builds/src-noconflict/theme-monokai'
import DragDrop from './DragAndDrop';
import './CodeStyles.css';
import Copy from './Copy';
import Spinner from '../image/Spinner';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

import submmit from '../image/submit.png';
import software from '../image/software.png';

import { motion, useScroll } from "framer-motion";

// import { get } from 'react-scroll/modules/mixins/scroller';


let token2;
const BASE_URL = process.env.REACT_APP_API_URL
const func = async ({token,id,setCode,getChildCode})=>{
    try {
        
        const body = {
            qid: id,
        }
       
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const res = await axios.post(BASE_URL + "/api/v1/auth/getsubmission",  body);
        
        if(res.data.success == true){
            toast.success(res.data.message);
            console.log(res.data.data.language)
            
            getChildCode(res.data.data.code, res.data.data.language);    
            
            
        }

    }
    catch (error) {
        console.error(error);
    }
}

export default  function Codesub({question , id, token }) {
    token2 =token;


    useEffect(() => {
      setLoading(true);
      func({token: token2,id,setCode,getChildCode}) 
      setLoading(false);
    },[])

    
    const { scrollYProgress } = useScroll();
    
    const [theme, setTheme] = useState('terminal');
    const [code, setCode] = useState('// your code goes here');
    const [mode, setMode] = useState('c_cpp');
    const [res, setRes] = useState("Your output will be displayed here");
    const [language, setLanguage] = useState('c');
    const [stdin, setStdin] = useState('');
    const [loading, setLoading] = useState(false);
   
    const getChildCode = (childcode, extension) => {
        if (extension === "c" || extension === "cpp") {
            setMode('c_cpp');
            setLanguage(extension);
        } else if (extension === "py" || extension === "python" ) {
            setMode('python');
            setLanguage('python');
        } else if (extension === 'java') {
            setMode('java');
            setLanguage(extension);
        }
        setCode(childcode);
    }

    const onChange = (newValue) => {
        setCode(newValue);
    }

    const themeChangeHandler = (event) => {
        setTheme(event.target.value);
    }

    const modeChangeHandler = (event) => {
        setLanguage(event.target.value);
        if (event.target.value === 'c' || event.target.value === 'cpp') {
            setMode('c_cpp');
        } else {
            setMode(event.target.value);
        }
    }

    const send = async () => {
        try {
            setLoading(true);
            // setRes('')
            
            setTimeout(() => {
                setLoading(false);
            },10000);
            const jsonData = {
                language: language,
                content: code,
                stdin: stdin
            }
            const response = await fetch(BASE_URL+'/api/v1/code/compile', {
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            
            const data = await response.json();
            console.log(data);
            if(data.result.exitCode != "0" ){
                setRes(data.result.stderr  +"Error Type: " +data.result.errorType);
            }else{
                setRes(data.result.stdout );
                
                console.log(res);
            }
            setLoading(false);
            // else
            // setResult({   message: 'Compile and Execute the code to see output', language: '',res: data.result.stdout });
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const submit = async () => {
        try {
            setLoading(true);
            // setRes('')
            setTimeout(() => {
                setLoading(false);
            },10000);
            const body = {
                language: language,
                content: code,
                questionId: id,

            }
            // const response = await fetch(BASE_URL+'/api/v1/code/compile', {
            //     method: 'POST',
            //     body: JSON.stringify(jsonData),
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            // })

            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
            const res = await axios.post(BASE_URL + "/api/v1/auth/subasg", body);
            
            if (res.data.success === true) {
                
                toast.success(res.data.message);

            }
            else{
                
                toast.error(res.data.message);
            }
           
            setLoading(false);
           
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
<>         <motion.div
  className="fixed p-0 top-0 z-10 left-0 right-0 h-3 bg-red-500 animate-none origin-top-left"
  style={{ scaleX: scrollYProgress }}
/>


<div>

            <div className='text-3xl' >
                {question}
            </div>
        <div className='scroll-smooth focus:scroll-auto'>
            <div className='pt-5'>
                <div className='flex justify-evenly text-blue-800 text-lg'>
                    <div className='theme-select outline outline-offset-2 outline-pink-400 rounded-md p-1'>
                        <label htmlFor="theme" className='pr-3'>Theme</label>
                        <select name="theme" id="theme" onChange={themeChangeHandler}>
                            <option value="terminal">Terminal</option>
                            <option value="kuroir">Kuroir</option>
                            <option value="github_dark">Github Dark</option>
                            <option value="monokai">Monokai</option>
                        </select>
                    </div>
                    <div className='mode-select outline outline-offset-2 outline-pink-400 rounded-md p-1'>
                        <label htmlFor="mode" className='pr-5'>Language</label>
                        <select name="mode" id="mode" value={language} onChange={modeChangeHandler}>
                            <option value="c">C</option>
                            <option value="cpp">C++</option>
                            <option value="python">Python</option>
                            <option value="java">Java</option>
                        </select>
                    </div>
                </div>
                <div className='ace-editor relative'>
                    <AceEditor
                        placeholder=""
                        mode={mode}
                        theme={theme}
                        width='100%'
                        height='600px'
                        name="blah2"
                        onChange={onChange}
                        fontSize={20}
                        showPrintMargin={true}
                        showGutter={true}
                        highlightActiveLine={true}
                        value={code}
                        setOptions={{
                            enableBasicAutocompletion: true,
                            enableLiveAutocompletion: false,
                            enableSnippets: true,
                            showLineNumbers: true,
                            tabSize: 2,
                        }} />
                    <Copy code={code} />
                </div>
                <div className='flex ml-[70%] '>
                    <div className='flex'>
                        <button className='flex border-2 font-semibold text-xl border-blue-500 mr-0.5 p-3 hover:text-white hover:bg-blue-500 transition-all ease-in-out' onClick={send}>  <img src={software} className="mr-3" width="30px" alt="" /> <span> Compile and Execute</span> </button>
                        <button className='flex border-2 font-semibold text-xl border-blue-500 rounded-tr-lg rounded-br-lg p-3 hover:text-white hover:bg-blue-500 transition-all ease-in-out' onClick={submit}> <img src={submmit} className="mr-3" width="30px" alt="" /> <span> Submit</span> </button>
                    </div>
                </div>

                <div className="flex pl-10 justify-start gap-8 items-start">
                    <label htmlFor="stdin" className='text-4xl'>Your Input : </label>
                    <input
                        type="text"
                        placeholder="Enter stdin"
                        value={stdin}
                        name='stdin'
                        className='border-2 border-black-500 rounded-xl p-3 w-72'
                        onChange={(e) => setStdin(e.target.value)}
                    />
                </div>
                <div className='flex justify-center items-center '>
                    <div className='h-[200px] w-[90%] bg-slate-900 mt-9 border-blue-950 text-white flex justify-center items-center overflow-y-scroll'>
                        {/* <div>{result.message.split('\n').map((line, index) => <h3 key={index} className='text-md'>{line}</h3>)}</div> */}
                        {loading ? 
                            <Spinner  /> : 
                            <div className='flex flex-col w-[80%]'>
                                <h1 className=' font-bold text-xl align-center'>OUTPUT</h1>
                                {res.split('\n').map((line , index) => <h2 key={index} className='text-lg'>{line}</h2>)}
                                {/* <h1 className='text-lg'>{`Output: ${res}`}</h1> */}
                            </div>
                        }
                    </div>
                </div>
            </div>
            <div>
                <DragDrop parentCallBack={getChildCode} />
            </div>
        </div>
        </div>
        </>
    );
}





























// import React, { useState,useEffect } from 'react';
// import AceEditor from 'react-ace';
// import 'ace-builds/src-noconflict/mode-c_cpp'
// import 'ace-builds/src-noconflict/mode-python'
// import 'ace-builds/src-noconflict/mode-java'
// import 'ace-builds/src-noconflict/theme-terminal'
// import 'ace-builds/src-noconflict/theme-kuroir'
// import 'ace-builds/src-noconflict/theme-github_dark'
// import 'ace-builds/src-noconflict/theme-monokai'
// import DragDrop from './DragAndDrop';
// import './CodeStyles.css';
// import Copy from './Copy';
// import Spinner from '../image/Spinner';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { useSelector } from 'react-redux';

// let token2;
// const BASE_URL = process.env.REACT_APP_API_URL
// const func = async ({token2,id,setCode})=>{
//     try {
//         console.log(token2)
//         axios.defaults.headers.common['Authorization'] = `Bearer ${token2}`;

//         const res = await axios.get(BASE_URL + "/api/v1/auth/getsubmission");
//         if(res.success == true){
//             setCode(res.data.code)
//         }

//     }
//     catch (error) {
//         console.error(error);
//     }
// }

// export default  function Codesub({question , id, token }) {
//     token2 =token;
//     // useEffect(() => {
//     //   setLoading(true);
//     //   func(token2,id,setCode) 
//     // })

       
    
//     const [theme, setTheme] = useState('terminal');
//     const [code, setCode] = useState('// your code goes here');
//     const [mode, setMode] = useState('c_cpp');
//     const [res, setRes] = useState("Your output will be displayed here");
//     const [language, setLanguage] = useState('c');
//     const [stdin, setStdin] = useState('');
//     const [loading, setLoading] = useState(false);
   
//     const getChildCode = (childcode, extension) => {
//         if (extension === "c" || extension === "cpp") {
//             setMode('c_cpp');
//             setLanguage(extension);
//         } else if (extension === "py") {
//             setMode('python');
//             setLanguage('python');
//         } else if (extension === 'java') {
//             setMode('java');
//             setLanguage(extension);
//         }
//         setCode(childcode);
//     }

//     const onChange = (newValue) => {
//         setCode(newValue);
//     }

//     const themeChangeHandler = (event) => {
//         setTheme(event.target.value);
//     }

//     const modeChangeHandler = (event) => {
//         setLanguage(event.target.value);
//         if (event.target.value === 'c' || event.target.value === 'cpp') {
//             setMode('c_cpp');
//         } else {
//             setMode(event.target.value);
//         }
//     }

//     const send = async () => {
//         try {
//             setLoading(true);
//             // setRes('')
            
//             setTimeout(() => {
//                 setLoading(false);
//             },10000);
//             const jsonData = {
//                 language: language,
//                 content: code,
//                 stdin: stdin
//             }
//             const response = await fetch(BASE_URL+'/api/v1/code/compile', {
//                 method: 'POST',
//                 body: JSON.stringify(jsonData),
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//             })
            
//             const data = await response.json();
//             console.log(data);
//             if(data.result.exitCode != "0" ){
//                 setRes(data.result.stderr  +"Error Type: " +data.result.errorType);
//             }else{
//                 setRes(data.result.stdout );
                
//                 console.log(res);
//             }
//             setLoading(false);
//             // else
//             // setResult({   message: 'Compile and Execute the code to see output', language: '',res: data.result.stdout });
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }


//     const submit = async () => {
//         try {
//             setLoading(true);
//             // setRes('')
//             setTimeout(() => {
//                 setLoading(false);
//             },10000);
//             const body = {
//                 language: language,
//                 content: code,
//                 questionId: id,

//             }
//             // const response = await fetch(BASE_URL+'/api/v1/code/compile', {
//             //     method: 'POST',
//             //     body: JSON.stringify(jsonData),
//             //     headers: {
//             //         'Content-Type': 'application/json',
//             //     },
//             // })

//             axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
//             const res = await axios.post(BASE_URL + "/api/v1/auth/subasg", body);
            
//             if (res.data.success === true) {
                
//                 toast.success(res.data.message);

//             }
//             else{
                
//                 toast.error(res.data.message);
//             }
           
//             setLoading(false);
           
//         } catch (error) {
//             console.error('Error:', error);
//         }
//     }

//     return (
//         <div>
//             <div className='text-3xl' >
//                 {question}
//             </div>
//         <div>
//             <div className='pt-5'>
//                 <div className='flex justify-evenly text-blue-800 text-lg'>
//                     <div className='theme-select outline outline-offset-2 outline-pink-400 rounded-md p-1'>
//                         <label htmlFor="theme" className='pr-3'>Theme</label>
//                         <select name="theme" id="theme" onChange={themeChangeHandler}>
//                             <option value="terminal">Terminal</option>
//                             <option value="kuroir">Kuroir</option>
//                             <option value="github_dark">Github Dark</option>
//                             <option value="monokai">Monokai</option>
//                         </select>
//                     </div>
//                     <div className='mode-select outline outline-offset-2 outline-pink-400 rounded-md p-1'>
//                         <label htmlFor="mode" className='pr-5'>Language</label>
//                         <select name="mode" id="mode" value={language} onChange={modeChangeHandler}>
//                             <option value="c">C</option>
//                             <option value="cpp">C++</option>
//                             <option value="python">Python</option>
//                             <option value="java">Java</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div className='ace-editor relative'>
//                     <AceEditor
//                         placeholder=""
//                         mode={mode}
//                         theme={theme}
//                         width='100%'
//                         height='600px'
//                         name="blah2"
//                         onChange={onChange}
//                         fontSize={20}
//                         showPrintMargin={true}
//                         showGutter={true}
//                         highlightActiveLine={true}
//                         value={code}
//                         setOptions={{
//                             enableBasicAutocompletion: true,
//                             enableLiveAutocompletion: false,
//                             enableSnippets: true,
//                             showLineNumbers: true,
//                             tabSize: 2,
//                         }} />
//                     <Copy code={code} />
//                 </div>
//                 <div className='flex justify-center mt-2 mb-2'>
//                     <div className='flex justify-evenly w-[50%]'>
//                         <button className='border-2 border-blue-500 rounded-2xl p-2 hover:text-white hover:bg-blue-500 transition-all ease-in-out' onClick={send}>Compile and Execute</button>
//                         <button className='border-2 border-blue-500 rounded-2xl p-2 hover:text-white hover:bg-blue-500 transition-all ease-in-out' onClick={submit}>submit</button>
//                     </div>
//                 </div>
//                 <div className="w-full flex justify-center mt-10 gap-8 items-center">
//                     <label htmlFor="stdin" className='text-3xl'>Your Input</label>
//                     <input
//                         type="text"
//                         placeholder="Enter stdin"
//                         value={stdin}
//                         name='stdin'
//                         className='border-2 border-black-500 rounded-xl p-2 w-72'
//                         onChange={(e) => setStdin(e.target.value)}
//                     />
//                 </div>
//                 <div className='flex justify-center items-center '>
//                     <div className='h-[200px] w-[90%] bg-slate-900 mt-9 border-blue-950 text-white flex justify-center items-center overflow-y-scroll'>
//                         {/* <div>{result.message.split('\n').map((line, index) => <h3 key={index} className='text-md'>{line}</h3>)}</div> */}
//                         {loading ? 
//                             <Spinner  /> : 
//                             <div className='flex flex-col w-[80%]'>
//                                 <h1 className=' font-bold text-xl mt-16'>OUTPUT</h1>
//                                 {res.split('\n').map((line , index) => <h2 key={index} className='text-lg'>{line}</h2>)}
//                                 {/* <h1 className='text-lg'>{`Output: ${res}`}</h1> */}
//                             </div>
//                         }
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <DragDrop parentCallBack={getChildCode} />
//             </div>
//         </div>
//         </div>
//     );
// }
