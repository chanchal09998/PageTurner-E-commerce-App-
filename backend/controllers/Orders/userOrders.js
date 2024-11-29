import OrderModel from "../../models/OrderModel.js";

export const userOrders = async (req, res) => {
  try {
    const { email } = req.body; // Get email from the request body
    if (!email) {
      return res.status(400).json({ message: "Email not provided" });
    }

    // Find the user's orders in the database
    const userOrders = await OrderModel.findOne({ email }); // Use find() to fetch all orders, not findOne()

    if (!userOrders || userOrders.length === 0) {
      return res.status(404).json({ message: "No orders found for this user" });
    }

    // Return the user's orders
    return res.status(200).json({
      success: true,
      userOrders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
