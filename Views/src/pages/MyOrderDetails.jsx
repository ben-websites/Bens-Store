import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faLocationDot,
  faCreditCard,
  faUser,
  faPhone,
  faEnvelope,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

function MyOrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getOrder() {
      try {
        const res = await axios.get(
          `http://localhost:3000/myorder/${id}`
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

    getOrder();
  }, [id]);

  if (loading) return <Loader />;

  if (!order)
    return (
      <h1 className="py-20 text-center text-2xl font-bold">
        Order not found
      </h1>
    );

  return (
    <section className="mx-auto max-w-6xl px-4 py-10">


      <Link
        to="/myorders"
        className="mb-8 inline-flex items-center gap-2 text-emerald-700 hover:underline"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to My Orders
      </Link>

      {/* Header */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>
          <h1 className="text-4xl font-black">
            Order #{order._id.slice(-8).toUpperCase()}
          </h1>

          <p className="mt-2 text-slate-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        <span className="rounded-full bg-yellow-100 px-5 py-2 font-bold text-yellow-700">
          {order.orderStatus}
        </span>

      </div>

      <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

        {/* LEFT */}

        <div className="space-y-8">

          {/* Customer */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-bold">
              Customer Information
            </h2>

            <div className="space-y-3">

              <p>
                <FontAwesomeIcon icon={faUser} className="mr-2 text-emerald-700"/>
                {order.customerName}
              </p>

              <p>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-emerald-700"/>
                {order.customerEmail}
              </p>

              <p>
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-emerald-700"/>
                {order.customerPhone}
              </p>

            </div>

          </div>

          {/* Shipping */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-2xl font-bold">
              Shipping Address
            </h2>

            <p className="leading-8 text-slate-600">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mr-2 text-emerald-700"
              />
              {order.shippingAddress}
            </p>

          </div>

          {/* Products */}

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Ordered Products
            </h2>

            <div className="space-y-5">

              {order.products.map((item) => (

                <div
                  key={item.productId}
                  className="flex items-center gap-5 border-b pb-5 last:border-none"
                >

                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-bold">
                      {item.title}
                    </h3>

                    <p className="text-slate-500">
                      Quantity : {item.quantity}
                    </p>

                  </div>

                  <p className="text-xl font-black">
                    $
                    {(item.price * item.quantity).toFixed(2)}
                  </p>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* RIGHT */}

        <div className="space-y-6">

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              Payment
            </h2>

            <p className="text-slate-600">
              <FontAwesomeIcon
                icon={faCreditCard}
                className="mr-2 text-emerald-700"
              />
              {order.paymentMethod}
            </p>

          </div>

          <div className="rounded-xl bg-white p-6 shadow">

            <h2 className="mb-5 text-xl font-bold">
              Order Summary
            </h2>

            <div className="space-y-3">

              <div className="flex justify-between">
                <span>Products</span>
                <span>{order.products.length}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="text-green-600">
                  Free
                </span>
              </div>

              <div className="flex justify-between">
                <span>Status</span>
                <span>{order.orderStatus}</span>
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

          <div className="rounded-xl bg-emerald-700 p-6 text-white">

            <FontAwesomeIcon
              icon={faBoxOpen}
              className="mb-4 text-3xl"
            />

            <h2 className="text-xl font-bold">
              Thank you for shopping!
            </h2>

            <p className="mt-2 text-sm text-emerald-100">
              Your order is being processed. We'll notify you
              once it has been shipped.
            </p>

          </div>

        </div>

      </div>

    </section>
  );
}

export default MyOrderDetails;