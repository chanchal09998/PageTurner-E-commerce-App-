import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import "./UserDetails.css";
import axios from "axios";

const UserDetails = () => {
  // State to manage selected order for popup display
  const [selectedOrder, setSelectedOrder] = useState(null);

  // State to store fetched orders
  const [fetchedOrders, setFetchedOrders] = useState([]);

  // State to store user details
  const [userDetails, setUserDetails] = useState({});

  // Function to fetch user orders from the backend
  const FetchOrders = async () => {
    const email = localStorage.getItem("email");
    if (!email) {
      console.log("No email found in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        "https://pageturner-e-commerce-app.onrender.com/api/fetch/user-orders",
        { email }
      );

      if (response.data.success) {
        setFetchedOrders(response.data.userOrders); // Store fetched orders in state
        console.log("User orders fetched:", response.data.userOrders);
      } else {
        console.log("Error fetching orders:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  // Function to fetch user details from the backend
  const FetchUserDetails = async () => {
    const email = localStorage.getItem("email"); // Retrieve user's email from localStorage
    if (!email) {
      console.log("No email found in localStorage");
      return;
    }

    try {
      const response = await axios.post(
        "https://pageturner-e-commerce-app.onrender.com/api/fetch/user-details",
        { email }
      );

      if (response.data.success) {
        setUserDetails(response.data.user); // Store user details in state
        console.log("User details fetched:", response.data.user);
      } else {
        console.log("Error fetching user details:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Handle row click to show order details in a popup
  const handleRowClick = (order) => {
    setSelectedOrder(order);
  };

  // Close the popup when the close button is clicked
  const closePopup = () => {
    setSelectedOrder(null);
  };

  // Fetch data on component mount
  useEffect(() => {
    FetchOrders();
    FetchUserDetails();
  }, []);

  return (
    <Layout>
      <div className="user-details-container">
        {/* User Information Section */}
        <div className="user-info">
          <h3>User Information</h3>
          <div className="info-item">
            <strong>Name:</strong> {userDetails.name}
          </div>
          <div className="info-item">
            <strong>Email:</strong> {userDetails.email}
          </div>
          <div className="info-item">
            <strong>Password:</strong> ********
          </div>
          <div className="info-item">
            <strong>Security Question:</strong> {userDetails.security}
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="user-orders">
          <h3>Order Summary</h3>
          <table className="order-table">
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Date</th>
                <th>Status</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {fetchedOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No orders placed yet.
                  </td>
                </tr>
              ) : (
                fetchedOrders.orders.map((order, index) => (
                  <tr key={index} onClick={() => handleRowClick(order)}>
                    {/* Nested table to show book details */}
                    <td>
                      <table
                        style={{ width: "100%", borderCollapse: "collapse" }}
                      >
                        <tbody>
                          {order.cartItems.map((item, itemIndex) => (
                            <tr key={itemIndex}>
                              <td>
                                <strong>{item.bookTitle}</strong>
                              </td>
                              <td>Qty: {item.bookQuantity}</td>
                              <td>Price: ${item.bookPrice.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td>
                      {order.cartItems.reduce(
                        (totalQuantity, item) =>
                          totalQuantity + item.bookQuantity,
                        0
                      )}
                    </td>
                    <td>${order.totalAmount}</td>
                    <td>{new Date(order.date).toLocaleDateString()}</td>
                    <td>{order.orderStatus || "N/A"}</td>
                    <td>
                      {order.address
                        ? `${order.address.name}, ${order.address.h_no}, ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.pin}, ${order.address.phone}`
                        : "N/A"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Popup for displaying selected order details */}
        {selectedOrder && (
          <div className="order-popup">
            <div className="popup-content">
              <button className="close-button" onClick={closePopup}>
                &times;
              </button>
              <h3>Order Details</h3>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(selectedOrder.date).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedOrder.orderStatus}
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {selectedOrder.address
                  ? `${selectedOrder.address.name}, ${selectedOrder.address.h_no}, ${selectedOrder.address.street}, ${selectedOrder.address.city}, ${selectedOrder.address.state}, ${selectedOrder.address.pin}`
                  : "N/A"}
              </p>
              <h4>Items:</h4>
              {selectedOrder.cartItems?.map((item, idx) => (
                <div key={idx}>
                  <p>
                    <strong>Book Name:</strong> {item.bookTitle}
                  </p>
                  <p>
                    <strong>Quantity:</strong> {item.bookQuantity}
                  </p>
                  <p>
                    <strong>Price:</strong> ${item.bookPrice.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserDetails;
