import "./App.css";
import React from "react";
import NavBar from "./component/NavBar";
import Footer from "./component/Footer";
import Home from "./component/Home";
import { Routes, Route } from "react-router-dom";
import Code from "./component/Code";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Notfound from "./extra/Notfound";
import AboutUs from "./component/AboutUs";
import Privateroute from "./extra/Privateroute";
import Dashboard from "./component/Dashboard";
import Adminprivateroute from "./extra/Adminprivateroute";
import Adduser from "./extra/Adduser";
import Addtoclass from "./extra/Addtoclass";
import Exam from "./extra/Exam";
import Insprivateroute from "./extra/Insprivateroute";
import Addasg from "./extra/Addasg";
import Stdassignments from "./extra/Stdassignments";
import Submitasg from "./extra/Submitasg";
import Students from "./extra/Students";
import Submissions from "./extra/Submissions";
import Viewsubmission from "./extra/Viewsubmission";
import Codeview from "./component/Codeview";

function App() {
  return (
    <div className="App">
      <NavBar></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />
        <Route
          path="/try"
          element={
            <div>
              <Code />{" "}
            </div>
          }
        />
        <Route
          path="/login"
          element={
            <div>
              <Login />
            </div>
          }
        />
        <Route
          path="/logout"
          element={
            <div>
              <Logout />
            </div>
          }
        />
        <Route
          path="/about"
          element={
            <div>
              <AboutUs />
            </div>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Privateroute>
              <Dashboard />
            </Privateroute>
          }
        />
        <Route
          path="/dashboard/add"
          element={
            <Adminprivateroute>
              <Adduser></Adduser>
            </Adminprivateroute>
          }
        />
        <Route
          path="/dashboard/addtoclass"
          element={
            <Adminprivateroute>
              <Addtoclass />
            </Adminprivateroute>
          }
        />
        <Route
          path="/dashboard/exam"
          element={
            <Adminprivateroute>
              <Exam />
            </Adminprivateroute>
          }
        />
        <Route
          path="/dashboard/addasg"
          element={
            <Insprivateroute>
              <Addasg />
            </Insprivateroute>
          }
        />
        <Route
          path="/dashboard/students"
          element={
            <Insprivateroute>
              <Students />
            </Insprivateroute>
          }
        />
        <Route
          path="/dashboard/students/:id"
          element={
            <Insprivateroute>
              <Submissions />
            </Insprivateroute>
          }
        />
        <Route
          path="/dashboard/students/:id/:id2/:id3"
          element={
            <Insprivateroute>
              <Viewsubmission />
            </Insprivateroute>
          }
        />
        <Route
          path="/dashboard/sub/:id"
          element={
            <Privateroute>
              <Stdassignments />
            </Privateroute>
          }
        />
        <Route
          path="/dashboard/sub/:id/:id2/"
          element={
            <Privateroute>
              <Submitasg />
            </Privateroute>
          }
        />
        <Route path="*" element={<Notfound />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
