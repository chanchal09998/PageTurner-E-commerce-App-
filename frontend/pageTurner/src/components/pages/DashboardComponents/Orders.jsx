import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

const Orders = () => {
  const [dailyOrders, setDailyOrders] = useState([]);
  const [allOrders, setAllOrders] = useState([]);

  // Fetch all orders and filter today's orders
  const AllOrders = async () => {
    const today = new Date().toLocaleDateString("en-CA");
    try {
      const { data } = await axios.get(
        "https://pageturner-e-commerce-app.onrender.com/admin/dashboard/all-orders"
      );
      setAllOrders(data.allOrders);

      const todaysOrders = data.allOrders.flatMap((item) =>
        item.orders.filter(
          (order) => new Date(order.date).toLocaleDateString("en-CA") === today
        )
      );
      setDailyOrders(todaysOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    AllOrders();
  }, []);

  // Handle approve order status
  const approveOrderHandler = async (orderId) => {
    console.log("approved order clicked");
    try {
      const response = await axios.put(
        `https://pageturner-e-commerce-app.onrender.com/admin/dashboard/approve-order/${orderId}`
      );

      if (response.data.success) {
        console.log("Order approved successfully, refreshing orders...");
        await AllOrders(); // Call the function to refetch all orders
      } else {
        console.error("Failed to approve order");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <div className="orders-container">
      <h1 className="dashboard-title">Admin Orders Dashboard</h1>

      {/* All Orders */}
      <div className="orders-section">
        <h2>All Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Email</th>
              <th>Total Orders</th>
            </tr>
          </thead>
          <tbody>
            {allOrders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.email}</td>
                <td>{order.orders.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Daily Orders */}
      <div className="orders-section">
        <h2>Daily Orders</h2>
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Book Details</th>
              <th>Total Amount</th>
              <th>Address</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dailyOrders.length > 0 ? (
              dailyOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>
                    {order.cartItems.map((item, index) => (
                      <div key={index} className="book-details">
                        <p>
                          <strong>Title:</strong> {item.bookTitle}
                        </p>
                        <p>
                          <strong>Author:</strong> {item.bookAuthor}
                        </p>
                        <p>
                          <strong>Qty:</strong> {item.bookQuantity} |{" "}
                          <strong>Price:</strong> ${item.bookPrice}
                        </p>
                      </div>
                    ))}
                  </td>
                  <td>${order.totalAmount}</td>
                  <td>
                    {order.address
                      ? `${order.address.name}, ${order.address.h_no}, ${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.pin},${order.address.phone}`
                      : "N/A"}
                  </td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                  <td>
                    <button
                      onClick={() => approveOrderHandler(order._id)}
                      disabled={order.orderStatus === "approved"}
                    >
                      {order.orderStatus === "approved"
                        ? "Approved"
                        : order.orderStatus}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-orders">
                  No orders available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
