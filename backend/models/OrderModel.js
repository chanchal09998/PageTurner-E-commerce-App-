import mongoose from "mongoose";

const cartItemsSchema = new mongoose.Schema({
  bookTitle: {
    type: String,
    required: true,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookPrice: {
    type: Number,
    required: true,
  },
  bookQuantity: {
    type: Number,
    required: true,
  },
});

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  h_no: { type: String, required: true },
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pin: { type: String, required: true },
  phone: { type: String, required: true },
});

const orderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  orders: [
    {
      cartItems: [cartItemsSchema],
      address: addressSchema,
      totalAmount: {
        type: Number,
        required: true,
      },
      orderStatus: {
        type: String,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

// Use `mongoose.model` instead of `mongoose.Model`
// Make sure to name the model properly in lowercase or camelCase.
const OrderModel = mongoose.model("Order", orderSchema);

export default OrderModel;
