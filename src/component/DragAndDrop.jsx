import React, { useState } from "react";
import drag from "../image/drag.png";
const FileDrop = (props) => {
  const [dragging, setDragging] = useState(false);
  const [fileNames, setFileNames] = useState("");
  // const acceptedFileTypes = ['text/plain']; // Define accepted file types

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length > 1) {
      alert("Please select only one file");
      return;
    }

    // Check if dropped files are of the accepted types
    let extension = files[0].name.substring(files[0].name.lastIndexOf(".") + 1);

    if (
      !(
        extension === "cpp" ||
        extension === "c" ||
        extension === "py" ||
        extension === "java"
      )
    ) {
      alert(`.${extension} file is not allowed! Please select valid file`);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      console.log(fileContent);
      props.parentCallBack(fileContent, extension);

      // You can further process or display the file content as needed
    };

    reader.readAsText(files[0]);
    setFileNames(files[0].name);

    // files.length = 0;
  };

  return (
    <div className="flex justify-evenly m-10 flex-col md:flex-row lg:flex-row">
      <div className=" flex flex-col justify-evenly">
        <h1 className=" text-4xl font-semibold text-slate-700">
          Already Have Code File ... ?
        </h1>
        <h1 className=" text-4xl text-slate-800">Drop it here</h1>
        
      </div>
      <div
        className={`${
          dragging ? "dragging" : ""
        } border-2 border-black border-dashed w-[100%] md:w-[50%] lg:w-[50%] h-[200px] flex flex-col justify-center items-center hover:bg-blue-100 transition-all 0.5 text-lg font-medium mt-12`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {dragging
          ? "Drop a source code file here (C, C++, Java, or Python)"
          :<img src={drag} width="90px  " className="border-2 rounded-xl border-black border-dashed p-4" />}
        {fileNames.length > 0 && (
          <div className="file-names">
            <br></br>
            <h3>Dropped File:</h3>
            <p>{fileNames}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileDrop;
