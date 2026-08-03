import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  useEffect(() => {
    fetchOrders();
  }, []);

  async function fetchOrders() {
    try {
      const res = await axios.get("http://localhost:3000/orders");

      if (res.data.success) {
        setOrders(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.customerName
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order.customerEmail
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        order._id.includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  async function deleteOrder(id) {
    const result = await Swal.fire({
      title: "Delete Order?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Delete",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/deleteorder/${id}`
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.filter((order) => order._id !== id)
        );

        Swal.fire(
          "Deleted!",
          "Order deleted successfully.",
          "success"
        );
      }
    } catch (err) {
      console.log(err);

      Swal.fire(
        "Error",
        "Unable to delete order.",
        "error"
      );
    }
  }

  if (loading) return <Loader />;

  return (
    <section className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Orders
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Manage Orders
          </h1>

          <p className="mt-2 text-slate-500">
            View and manage all customer purchases.
          </p>
        </div>

        <div className="flex gap-4">

          <div className="relative">

            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="rounded-lg border pl-11 pr-4 py-3"
            />

          </div>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
            className="rounded-lg border px-4"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">
                Order
              </th>

              <th className="px-6 py-4 text-left">
                Customer
              </th>

              <th className="px-6 py-4 text-center">
                Products
              </th>

              <th className="px-6 py-4 text-center">
                Payment
              </th>

              <th className="px-6 py-4 text-center">
                Total
              </th>

              <th className="px-6 py-4 text-center">
                Status
              </th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.map((order) => (

              <tr
                key={order._id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-5">

                  <p className="font-bold">
                    #{order._id.slice(-6).toUpperCase()}
                  </p>

                  <p className="text-sm text-slate-500">
                    {new Date(
                      order.createdAt
                    ).toLocaleDateString()}
                  </p>

                </td>

                <td className="px-6 py-5">

                  <p className="font-semibold">
                    {order.customerName}
                  </p>

                  <p className="text-sm text-slate-500">
                    {order.customerEmail}
                  </p>

                </td>

                <td className="px-6 py-5 text-center">
                  {order.products.length}
                </td>

                <td className="px-6 py-5 text-center">
                  {order.paymentMethod}
                </td>

                <td className="px-6 py-5 text-center font-bold text-emerald-700">
                  ${order.totalAmount}
                </td>

                <td className="px-6 py-5 text-center">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-bold
                    ${
                      order.orderStatus === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : order.orderStatus ===
                          "Processing"
                        ? "bg-blue-100 text-blue-700"
                        : order.orderStatus ===
                          "Shipped"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.orderStatus}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/admin/orders/${order._id}`}
                      className="rounded bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>

                    <button
                      onClick={() =>
                        deleteOrder(order._id)
                      }
                      className="rounded bg-red-600 px-3 py-2 text-white hover:bg-red-700"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default Orders;