import React from "react";
import "./Overview.css";

const Overview = () => {
  return (
    <div className="overview">
      <h2 className="overview-title">Dashboard Overview</h2>

      {/* Statistics Cards Section */}
      <div className="overview-cards">
        <div className="card">
          <h3>Total Books</h3>
          <p>1,024</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>765</p>
        </div>
        <div className="card">
          <h3>Total Revenue</h3>
          <p>$23,480</p>
        </div>
        <div className="card">
          <h3>New Users</h3>
          <p>342</p>
        </div>
      </div>

      {/* Monthly Stats Progress Section */}
      <div className="monthly-stats">
        <h3>Monthly Performance</h3>
        <div className="stat-bar">
          <div className="stat-info">
            <p>Sales Goal</p>
            <p>85%</p>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: "85%" }}></div>
          </div>
        </div>
        <div className="stat-bar">
          <div className="stat-info">
            <p>Revenue Target</p>
            <p>75%</p>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: "75%" }}></div>
          </div>
        </div>
        <div className="stat-bar">
          <div className="stat-info">
            <p>New Users Target</p>
            <p>60%</p>
          </div>
          <div className="progress-bar">
            <div className="progress" style={{ width: "60%" }}></div>
          </div>
        </div>
      </div>

      {/* Recent Activities Section */}
      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          <li>Order #23456 - $120.50</li>
          <li>Order #23455 - $75.00</li>
          <li>New User Signup - Alice Smith</li>
          <li>New Book Added - "React Essentials"</li>
          <li>Order #23454 - $250.30</li>
        </ul>
      </div>
    </div>
  );
};

export default Overview;
