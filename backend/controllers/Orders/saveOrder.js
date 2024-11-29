import OrderModel from "../../models/OrderModel.js";

export const saveOrders = async (req, res) => {
  try {
    // Log the incoming data for debugging
    console.log("Request Body:", req.body);

    // Extract order data from request body
    const { email, cartItems, address, totalAmount, orderStatus } = req.body;

    // Check if all essential fields are present
    if (
      !email ||
      !cartItems ||
      !address ||
      totalAmount === undefined ||
      !orderStatus
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields. Please include all necessary data.",
      });
    }

    // Log the extracted fields to ensure we have the right data
    console.log("Extracted Data:", {
      email,
      cartItems,
      address,
      totalAmount,
      orderStatus,
    });

    // Map the cartItems to only include the necessary fields
    const mappedCartItems = cartItems.map((item) => ({
      bookTitle: item.title, // Title of the book
      bookAuthor: item.author, // Author of the book
      bookPrice: item.price, // Price of the book
      bookQuantity: item.quantity, // Quantity of the book
    }));

    // Log the mapped cart items to verify that we have only the necessary fields
    console.log("Mapped Cart Items:", mappedCartItems);

    // Find if the user already has an order based on their email
    const existingUserOrder = await OrderModel.findOne({ email });

    // Log the result of the user search
    console.log("Existing User Order:", existingUserOrder);

    if (existingUserOrder) {
      // Update the existing user order with the new order details
      existingUserOrder.orders.push({
        cartItems: mappedCartItems,
        address,
        totalAmount,
        orderStatus,
      });

      // Log the updated user order
      console.log("Updated User Order:", existingUserOrder);

      // Save the updated order
      await existingUserOrder.save();
      res.status(200).json({
        success: true,
        message: "Order added to existing user successfully.",
      });
    } else {
      // Create a new order for a new user
      const newOrder = new OrderModel({
        email,
        orders: [
          {
            cartItems: mappedCartItems,
            address,
            totalAmount,
            orderStatus,
          },
        ],
      });

      // Log the new order
      console.log("New Order to Save:", newOrder);

      // Save the new order
      await newOrder.save();
      res.status(201).json({
        success: true,
        message: "New user order created successfully.",
      });
    }
  } catch (error) {
    // Log the error for debugging
    console.error("Error saving order:", error.message, error.stack);
    res.status(500).json({
      success: false,
      message:
        "An error occurred while saving the order. Please try again later.",
    });
  }
};
