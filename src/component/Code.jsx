import React, { useState } from "react";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-c_cpp";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/theme-terminal";
import "ace-builds/src-noconflict/theme-kuroir";
import "ace-builds/src-noconflict/theme-github_dark";
import "ace-builds/src-noconflict/theme-monokai";
import DragDrop from "./DragAndDrop";
import "./CodeStyles.css";
import Copy from "./Copy";
import Spinner from "../image/Spinner";
// import Counter from "../extra/Counter";

const BASE_URL = process.env.REACT_APP_API_URL;

export default function Code() {
  const [theme, setTheme] = useState("terminal");
  const [code, setCode] = useState("// your code goes here");
  const [mode, setMode] = useState("c_cpp");
  const [res, setRes] = useState("Your output will be displayed here");
  const [language, setLanguage] = useState("c");
  const [stdin, setStdin] = useState("");
  const [loading, setLoading] = useState(false);
  const getChildCode = (childcode, extension) => {
    if (extension === "c" || extension === "cpp") {
      setMode("c_cpp");
      setLanguage(extension);
    } else if (extension === "py") {
      setMode("python");
      setLanguage("python");
    } else if (extension === "java") {
      setMode("java");
      setLanguage(extension);
    }
    setCode(childcode);
  };

  const onChange = (newValue) => {
    setCode(newValue);
  };

  const themeChangeHandler = (event) => {
    setTheme(event.target.value);
  };

  const modeChangeHandler = (event) => {
    setLanguage(event.target.value);
    if (event.target.value === "c" || event.target.value === "cpp") {
      setMode("c_cpp");
    } else {
      setMode(event.target.value);
    }
  };

  const send = async () => {
    try {
      setLoading(true);
      // setRes('')
      setTimeout(() => {
        setLoading(false);
      }, 10000);
      const jsonData = {
        language: language,
        content: code,
        stdin: stdin,
      };
      const response = await fetch(BASE_URL + "/api/v1/code/compile", {
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data);
      if (data.result.exitCode != "0") {
        setRes(data.result.stderr + "Error Type: " + data.result.errorType);
      } else {
        setRes(data.result.stdout);

        console.log(res);
      }
      setLoading(false);
      // else
      // setResult({   message: 'Compile and Execute the code to see output', language: '',res: data.result.stdout });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="pt-5">
        <div className="flex justify-evenly text-blue-800 text-lg ">
          <div className="theme-select outline outline-offset-2 outline-pink-400 rounded-md p-1">
            <label htmlFor="theme" className="pr-3">
              Theme
            </label>
            <select name="theme" id="theme" onChange={themeChangeHandler}>
              <option value="terminal">Terminal</option>
              <option value="kuroir">Kuroir</option>
              <option value="github_dark">Github Dark</option>
              <option value="monokai">Monokai</option>
            </select>
          </div>
          <div className="mode-select outline outline-offset-2 outline-pink-400 rounded-md p-1">
            <label htmlFor="mode" className="pr-5">
              Language
            </label>
            <select
              name="mode"
              id="mode"
              value={language}
              onChange={modeChangeHandler}
            >
              <option value="c">C</option>
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
            </select>
          </div>
        </div>

        {/* <div className="fixed z-10 bg-slate-300 w-[12%] pr-2 pb-1 rounded-tl-xl rounded-bl-xl top-24 right-0">
          <Counter />
        </div> */}

        <div className="ace-editor relative">
          <AceEditor
            placeholder=""
            mode={mode}
            theme={theme}
            width="100%"
            height="600px"
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
            }}
          />
          <Copy code={code} />
        </div>
        <div className="flex justify-center mt-2 mb-2">
          <div className="flex justify-evenly w-[50%]">
            <button
              className="border-2 border-blue-500 rounded-2xl p-2 hover:text-white hover:bg-blue-500 transition-all ease-in-out"
              onClick={send}
            >
              Compile and Execute
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10 gap-8 items-center">
          <label htmlFor="stdin" className="text-3xl">
            Your Input
          </label>
          <input
            type="text"
            placeholder="Enter stdin"
            value={stdin}
            name="stdin"
            className="border-2 border-black-500 rounded-xl p-2 w-72"
            onChange={(e) => setStdin(e.target.value)}
          />
        </div>
        <div className="flex justify-center items-center ">
          <div className="h-[200px] w-[90%] bg-slate-900 mt-9 border-blue-950 text-white flex justify-center items-center overflow-y-scroll">
            {/* <div>{result.message.split('\n').map((line, index) => <h3 key={index} className='text-md'>{line}</h3>)}</div> */}
            {loading ? (
              <Spinner />
            ) : (
              <div className="flex flex-col w-[80%]">
                <h1 className=" font-bold text-xl mt-16">OUTPUT</h1>
                {res.split("\n").map((line, index) => (
                  <h2 key={index} className="text-lg">
                    {line}
                  </h2>
                ))}
                {/* <h1 className='text-lg'>{`Output: ${res}`}</h1> */}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        <DragDrop parentCallBack={getChildCode} />
      </div>
    </div>
  );
}
