import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/operations/authapi";
import { useDispatch } from "react-redux";
import user from "../image/log-in.png";
const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogin = (event) => {
    event.preventDefault();
    setUserName("");
    setPassword("");
    dispatch(login(userName, password, navigate));

    console.log(`Email: ${userName}, Password: ${password}`);
  };

  return (
    <div className="flex justify-center items-center min-h-screen ">
      <div className=" flex flex-col justify-center p-1 rounded-xl  ">
        <form className="max-w-[450px]  mx-auto rounded-2xl bg-gray-900 p-[15%] pl-[10%] pr-[10%]">
          <img src={user} className="ml-[35%] mb-8" width="30%" />
          <h2 className="text-4xl dark:text-white font-bold text-center mb-5">
            <span className="underline font-bold">SIGN IN</span>
          </h2>
          <div className="flex flex-col text-gray-400 py-2">
            <input
              className="rounded-lg text-gray-100 bg-gray-700 mt-3 p-3 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              type="text"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="flex flex-col text-gray-400 py-2">
            <input
              className="p-3 rounded-lg bg-gray-700 mt-3 focus:border-blue-500 focus:bg-gray-800 focus:outline-none"
              placeholder=" Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-center item-center text-gray-400 py-2">
            <p className="flex items-center">
              <span className="underline">Forgot your Password </span>{" "}
              <span className="pl-2">?</span>
            </p>
          </div>
          <button
            className="w-[50%] m-5 p-4 rounded-2xl bg-blue-500 hover:bg-blue-600 shadow-lg shadow-blue-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg"
            onClick={handleLogin}
          >
            SIGNIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
