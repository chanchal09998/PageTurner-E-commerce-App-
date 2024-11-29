import React, { useState } from "react";
import Layout from "./Layout";
import "./Dashboard.css";
import Sidebar from "./DashboardComponents/Sidebar";
import Overview from "./DashboardComponents/OverView";
import Book from "./DashboardComponents/Book";
import Orders from "./DashboardComponents/Orders";
import Settings from "./DashboardComponents/Settings";

const Dashboard = () => {
  const [activeComponent, setActiveComponent] = useState("dashboard");

  const renderComponent = () => {
    switch (activeComponent) {
      case "dashboard":
        return <Overview />;
      case "books":
        return <Book />;
      case "orders":
        return <Orders />;
      case "settings":
        return <Settings />;
      default:
        return <Overview />;
    }
  };
  return (
    <Layout>
      <div className="dashboard">
        <div className="dashboard-sidebar">
          <Sidebar setActiveComponent={setActiveComponent} />
        </div>
        <div className="content">{renderComponent()}</div>
      </div>
    </Layout>
  );
};

export default Dashboard;
