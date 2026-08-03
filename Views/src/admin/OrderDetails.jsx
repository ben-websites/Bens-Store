import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faUser,
  faEnvelope,
  faPhone,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  async function fetchOrder() {
    try {
      const res = await axios.get(
        `http://localhost:3000/order/${id}`
      );

      if (res.data.success) {
        setOrder(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function updateStatus() {

    const { value } = await Swal.fire({
      title: "Update Order Status",
      input: "select",
      inputOptions: {
        Pending: "Pending",
        Processing: "Processing",
        Shipped: "Shipped",
        Delivered: "Delivered",
      },
      inputValue: order.orderStatus,
      showCancelButton: true,
    });

    if (!value) return;

    try {

      const res = await axios.put(
        `http://localhost:3000/updateorder/${id}`,
        {
          orderStatus: value,
        }
      );

      if (res.data.success) {

        setOrder(res.data.data);

        Swal.fire(
          "Updated!",
          "Order status updated successfully.",
          "success"
        );

      }

    } catch (err) {
      Swal.fire(
        "Error",
        "Unable to update status.",
        "error"
      );
    }
  }

  if (loading) return <Loader />;

  if (!order) return <h2>Order not found.</h2>;

  return (
    <section className="mx-auto max-w-7xl p-8">

      <Link
        to="/admin/orders"
        className="mb-8 inline-flex items-center gap-2 text-emerald-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Orders
      </Link>

      <div className="mb-8 flex justify-between">

        <div>

          <h1 className="text-4xl font-black">
            Order #{order._id.slice(-8)}
          </h1>

          <p className="text-slate-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>

        </div>

        <button
          onClick={updateStatus}
          className="rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white"
        >
          Update Status
        </button>

      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        <div className="space-y-8">

          {/* Customer */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-bold">
              Customer Information
            </h2>

            <p>
              <FontAwesomeIcon icon={faUser} className="mr-2" />
              {order.customerName}
            </p>

            <p className="mt-3">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              {order.customerEmail}
            </p>

            <p className="mt-3">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              {order.customerPhone}
            </p>

          </div>

          {/* Shipping */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-bold">
              Shipping Address
            </h2>

            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-2"
              />

              {order.shippingAddress}

            </p>

          </div>

          {/* Products */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Ordered Products
            </h2>

            {order.products.map((item) => (

              <div
                key={item.productId}
                className="mb-5 flex items-center gap-5 border-b pb-5"
              >

                <img
                  src={item.image}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-bold">
                    {item.title}
                  </h3>

                  <p>
                    Quantity : {item.quantity}
                  </p>

                </div>

                <h3 className="text-xl font-black">

                  $
                  {(item.price * item.quantity).toFixed(2)}

                </h3>

              </div>

            ))}

          </div>

        </div>

        {/* Summary */}

        <div>

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              Order Summary
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span>Status</span>

                <span className="font-bold">
                  {order.orderStatus}
                </span>

              </div>

              <div className="flex justify-between">

                <span>Payment</span>

                <span>

                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="mr-2"
                  />

                  {order.paymentMethod}

                </span>

              </div>

              <div className="flex justify-between">

                <span>Products</span>

                <span>
                  {order.products.length}
                </span>

              </div>

              <hr />

              <div className="flex justify-between text-2xl font-black">

                <span>Total</span>

                <span className="text-emerald-700">

                  ${order.totalAmount.toFixed(2)}

                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default OrderDetails;