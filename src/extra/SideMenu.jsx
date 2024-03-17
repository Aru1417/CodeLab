import "./SideBar.css";
import SideBar from "../component/Sidebar/SideBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Dashboard from "../component/pages/Dashboard";
import Users from "../component/pages/Users";
import Messages from "../component/pages/Messages";
import FileManager from "../component/pages/FileManager";
import Analytics from "../component/pages/Analytics";
import Order from "../component/pages/Order";
import Saved from "../component/pages/Saved";
import Setting from "../component/pages/Setting";
function SideMenu() {
  return (
    <Router>
      <SideBar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/file-manager" element={<FileManager />} />
          <Route path="/order" element={<Order />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/settings" element={<Setting />} />

          <Route path="*" element={<> not found</>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default SideMenu;
