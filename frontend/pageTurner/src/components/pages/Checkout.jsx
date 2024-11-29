import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./Layout";
import { useDispatch, useSelector } from "react-redux";
import "./Checkout.css";
import { Link } from "react-router-dom";
import CartCard from "../utility/CartCard";
import toast from "react-hot-toast";
import {
  loadFinalCart,
  updateQuantity,
} from "../redux_Store/actionsCreators/cartActions";

const Checkout = () => {
  const dispatch = useDispatch();
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const shippingFee = 5;
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState({});
  const myFinalCart = useSelector((state) => state.updatedCartQuantity);
  const [name, setName] = useState("");
  const [h_no, setH_no] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");

  const myCartItems = useSelector((state) => state.cartReducer);

  // Retrieve user email from local storage
  const userEmail = localStorage.getItem("email");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !h_no || !street || !city || !state || !pin || !phone) {
      toast.error("Please fill in all address fields.");
      return;
    }

    const newAddress = {
      name,
      h_no,
      street,
      city,
      state,
      pin,
      phone,
    };
    setAddress(newAddress);
    toast.success("Address saved successfully!");
  };

  const verifyPayment = async (paymentData) => {
    try {
      const verificationResponse = await axios.post(
        "http://localhost:3000/api/payment/verify-payment",
        paymentData
      );

      if (verificationResponse.data.status === "success") {
        toast.success("Payment successful and verified!");
        saveOrder(); // Save the order to the backend upon payment verification
      } else {
        toast.error("Payment verification failed.");
      }
    } catch (error) {
      console.error("Verification failed", error);
      toast.error("Error verifying payment.");
    }
  };

  const saveOrder = async () => {
    const orderData = {
      cartItems: myFinalCart,
      address,
      totalAmount,
      email: userEmail,
      orderStatus: "processing",
    };

    console.log("Sending Order Data:", orderData); // Log to see if data is correct

    try {
      const response = await axios.post(
        "http://localhost:3000/api/checkout/save-orders",
        orderData
      );

      console.log("Response from backend:", response); // Log backend response

      if (response.data.success) {
        toast.success("Order saved successfully!");
      } else {
        toast.error("Failed to save order.");
      }
    } catch (error) {
      console.error("Order save error:", error); // Log the error
      toast.error("Error saving order.");
    }
  };

  const proceedToPay = () => {
    if (!name || !h_no || !street || !city || !state || !pin || !phone) {
      toast.error("Please fill in your address before proceeding to payment.");
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => toast.error("Razorpay SDK failed to load.");
    script.onload = async () => {
      try {
        const { data } = await axios.post(
          "http://localhost:3000/api/payment/create-order",
          {
            amount: totalAmount,
          }
        );

        const options = {
          key: "rzp_test_4S1o2OCRNGKQRG",
          amount: data.amount,
          currency: data.currency,
          order_id: data.id,
          name: "Your Company Name",
          description: "Payment Transaction",
          image: "/your-logo.png",
          handler: function (response) {
            const paymentData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            };

            verifyPayment(paymentData); // Verify payment and save the order
          },
          prefill: {
            name: "Customer Name",
            email: "customer@example.com",
            contact: "1234567890",
          },
          theme: {
            color: "#3399cc",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        toast.error("Payment failed: " + error.message);
      }
    };
    document.body.appendChild(script);
  };

  useEffect(() => {
    dispatch(loadFinalCart());
  }, []);
  useEffect(() => {
    console.log("updated cart quantity", myFinalCart);
    console.log("myFinalCart:", myFinalCart);
    console.log("mycartItems:", myCartItems);

    if (myFinalCart && myFinalCart.length > 0) {
      const calculatedSubtotal = myFinalCart.reduce(
        (total, item) => total + (item.price * item.quantity || 0),
        0
      );
      const calculatedDiscount = calculatedSubtotal * 0.1;
      const calculatedTotalAmount =
        calculatedSubtotal - calculatedDiscount + shippingFee;

      console.log("Subtotal:", calculatedSubtotal);
      console.log("Discount:", calculatedDiscount);
      console.log("Total Amount:", calculatedTotalAmount);

      setSubtotal(parseFloat(calculatedSubtotal.toFixed(2)));
      setDiscount(parseFloat(calculatedDiscount.toFixed(2)));
      setTotalAmount(parseFloat(calculatedTotalAmount.toFixed(2)));
    }
  }, [myFinalCart]);

  return (
    <Layout>
      <div className="checkout-container">
        {/* Cart Items Section */}
        {myCartItems.length > 0 ? (
          <div className="cart-items">
            {myCartItems.map((book, index) => (
              <CartCard book={book} key={index} />
            ))}
          </div>
        ) : (
          <Link
            to={"/"}
            className="text-center"
            style={{ textDecoration: "none" }}
          >
            <span>Click here</span>
            <p className="text-black">Add some books to the Cart</p>
          </Link>
        )}

        {/* Address Section */}
        {myCartItems.length > 0 ? (
          <div className="edit-address">
            <h5>Edit Address</h5>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="house-no">H.no:</label>
                <input
                  type="text"
                  id="house-no"
                  value={h_no}
                  onChange={(e) => setH_no(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="street/lane">Street/Village*:</label>
                <input
                  type="text"
                  id="street/lane"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="city/town">City/Town*:</label>
                <input
                  type="text"
                  id="city/town"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="state">State*:</label>
                <input
                  type="text"
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="Pincode">PINCODE*:</label>
                <input
                  type="number"
                  id="Pincode"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone-no*:</label>
                <input
                  type="number"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <input type="submit" value="Save Address" />
              </div>
            </form>
          </div>
        ) : null}

        {/* Order Summary Section */}
        {myFinalCart.length > 0 && myCartItems.length > 0 && (
          <div className="checkout-summary">
            <h3>Address</h3>
            <div className="summary-details">
              <p>
                <span>Name:</span> {address.name}
              </p>
              <p>
                <span>House No:</span> {address.h_no}
              </p>
              <p>
                <span>Street/Village:</span> {address.street}
              </p>
              <p>
                <span>City/Town:</span> {address.city}
              </p>
              <p>
                <span>State:</span> {address.state}
              </p>
              <p>
                <span>Pincode:</span> {address.pin}
              </p>
              <p>
                <span>Phone No:</span> {address.phone}
              </p>
            </div>
            <h3>Order Summary</h3>
            <div className="summary-details">
              <p>Subtotal: $.{subtotal}</p>
              <p>Discount: $.{discount}</p>
              <p>Shipping: $.{shippingFee}</p>
            </div>
          </div>
        )}

        {/* Total Amount Section */}
        {myFinalCart.length > 0 && myCartItems.length > 0 && (
          <div className="checkout-amount">
            <h2>Total Amount: ${totalAmount}</h2>
            <button className="checkout-button" onClick={proceedToPay}>
              Proceed to Pay
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Checkout;
