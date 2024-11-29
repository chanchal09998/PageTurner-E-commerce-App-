import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ setActiveComponent }) => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <button onClick={() => setActiveComponent("dashboard")}>
            Dashboard
          </button>
        </li>
        <li>
          <button onClick={() => setActiveComponent("books")}>Books</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent("orders")}>Orders</button>
        </li>
        <li>
          <button onClick={() => setActiveComponent("settings")}>
            Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
