import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useCart } from "../contextApi/CartDataContext";
import { Navigate } from "react-router-dom";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const [form, setForm] = useState({
    customerName: localStorage.getItem("name") || "",
    customerEmail: localStorage.getItem("email") || "",
    customerPhone: "",
    shippingAddress: "",
    paymentMethod: "Cash on Delivery",
  });

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      return toast.error("Your cart is empty");
    }

    try {
      const order = {
        userId: localStorage.getItem("userId"),

        ...form,

        products: cartItems.map((item) => ({
          productId: item._id,
          title: item.title,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),

        totalAmount,
      };

      const res = await axios.post(
        "http://localhost:3000/placeorder",
        order
      );

      if (res.data.success) {
        toast.success("Order Placed Successfully");

        clearCart();

        navigate("/");
      }
    } catch (error) {
      toast.error("Unable to place order");
    }
  };
  if (cartItems.length === 0) {
  return <Navigate to="/cart" replace />;
}

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="mb-8 text-4xl font-black">
        Checkout
      </h1>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* Shipping Form */}

        <form
          onSubmit={placeOrder}
          className="space-y-5 rounded-xl bg-white p-8 shadow-lg"
        >

          <input
            type="text"
            name="customerName"
            placeholder="Full Name"
            value={form.customerName}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="email"
            name="customerEmail"
            placeholder="Email"
            value={form.customerEmail}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="text"
            name="customerPhone"
            placeholder="Phone Number"
            value={form.customerPhone}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <textarea
            name="shippingAddress"
            placeholder="Shipping Address"
            rows="4"
            value={form.shippingAddress}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
          >
            <option>Cash on Delivery</option>
          </select>

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-700 py-3 font-bold text-white hover:bg-emerald-800"
          >
            Place Order
          </button>

        </form>

        {/* Order Summary */}

        <div className="rounded-xl bg-white p-8 shadow-lg">

          <h2 className="mb-6 text-2xl font-bold">
            Order Summary
          </h2>

          {cartItems.map((item) => (
            <div
              key={item._id}
              className="mb-4 flex items-center gap-4 border-b pb-4"
            >
              <img
                src={item.image}
                alt={item.title}
                className="h-20 w-20 rounded-lg object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold">
                  {item.title}
                </h3>

                <p>
                  Qty : {item.quantity}
                </p>
              </div>

              <p className="font-bold">
                ${item.price * item.quantity}
              </p>
            </div>
          ))}

          <div className="mt-8 flex justify-between border-t pt-5 text-xl font-black">
            <span>Total</span>
            <span>${totalAmount}</span>
          </div>

        </div>

      </div>

    </section>
  );
}

export default Checkout;