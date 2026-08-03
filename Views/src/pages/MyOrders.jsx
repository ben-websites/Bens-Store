import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faBoxOpen,
} from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await axios.get(
          `http://localhost:3000/myorders/${userId}`
        );

        if (res.data.success) {
          setOrders(res.data.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [userId]);

  if (loading) return <Loader />;

  return (
    <section className="mx-auto max-w-6xl px-4 py-12">

      <div className="mb-10">
        <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
          Orders
        </p>

        <h1 className="mt-2 text-4xl font-black">
          My Orders
        </h1>

        <p className="mt-3 text-slate-600">
          Track your purchases and view complete order details.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-xl border border-dashed border-stone-300 bg-white py-20 text-center">
          <FontAwesomeIcon icon={faBoxOpen}  className="mx-auto text-5xl text-stone-400" />

          <h2 className="mt-5 text-2xl font-bold">
            No Orders Yet
          </h2>

          <p className="mt-2 text-slate-500">
            Once you place an order, it will appear here.
          </p>

          <Link
            to="/products"
            className="mt-8 inline-block rounded-lg bg-emerald-700 px-6 py-3 font-bold text-white hover:bg-emerald-800"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow">

          {orders.map((order) => (
            <Link
              key={order._id}
              to={`/myorders/${order._id}`}
              className="flex items-center justify-between border-b border-stone-200 p-6 transition hover:bg-stone-50"
            >
              <div className="flex flex-col gap-2">

                <div className="flex items-center gap-3">

                  <span className="font-bold text-slate-900">
                    #{order._id.slice(-6).toUpperCase()}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold
                    ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.orderStatus === "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus === "Shipped"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </div>

                <div className="text-sm text-slate-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>

              </div>

              <div className="hidden md:block text-center">
                <p className="text-xs text-slate-500">
                  Products
                </p>

                <p className="font-bold">
                  {order.products.length}
                </p>
              </div>

              <div className="hidden md:block text-center">
                <p className="text-xs text-slate-500">
                  Payment
                </p>

                <p className="font-semibold">
                  {order.paymentMethod}
                </p>
              </div>

              <div className="text-right">

                <p className="text-2xl font-black text-emerald-700">
                  ${order.totalAmount}
                </p>

              </div>

              <FontAwesomeIcon icon={faChevronRight} className="ml-5 text-stone-400" />

            </Link>
          ))}

        </div>
      )}
    </section>
  );
}

export default Orders;