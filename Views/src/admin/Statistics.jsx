import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function Statistics() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, []);

  async function fetchStatistics() {
    try {
      const res = await axios.get("http://localhost:3000/statistics");

      if (res.data.success) {
        setStats(res.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  return (
    <section className="space-y-8">

      <div>
        <h1 className="text-4xl font-black text-slate-900">
          Statistics
        </h1>

        <p className="mt-2 text-slate-500">
          Overview of your store performance.
        </p>
      </div>

      {/* Summary Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">Revenue</h3>
          <p className="mt-3 text-3xl font-black text-emerald-700">
            Rs. {stats.totalRevenue}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">Orders</h3>
          <p className="mt-3 text-3xl font-black">
            {stats.totalOrders}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">Customers</h3>
          <p className="mt-3 text-3xl font-black">
            {stats.totalCustomers}
          </p>
        </div>

        <div className="rounded-xl bg-white p-6 shadow">
          <h3 className="text-slate-500">Products</h3>
          <p className="mt-3 text-3xl font-black">
            {stats.totalProducts}
          </p>
        </div>

      </div>

      {/* Order Status */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        <div className="rounded-xl bg-yellow-50 p-6">
          <h3>Pending</h3>
          <p className="mt-3 text-3xl font-black">
            {stats.pendingOrders}
          </p>
        </div>

        <div className="rounded-xl bg-blue-50 p-6">
          <h3>Processing</h3>
          <p className="mt-3 text-3xl font-black">
            {stats.processingOrders}
          </p>
        </div>

        <div className="rounded-xl bg-purple-50 p-6">
          <h3>Shipped</h3>
          <p className="mt-3 text-3xl font-black">
            {stats.shippedOrders}
          </p>
        </div>

        <div className="rounded-xl bg-green-50 p-6">
          <h3>Delivered</h3>
          <p className="mt-3 text-3xl font-black">
            {stats.deliveredOrders}
          </p>
        </div>

      </div>

      {/* Top Products */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-black">
          Top Selling Products
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">Product</th>

              <th className="text-right">Sold</th>

            </tr>

          </thead>

          <tbody>

            {stats.topProducts.map((product, index) => (

              <tr key={index} className="border-b">

                <td className="py-4">{product._id}</td>

                <td className="text-right">
                  {product.totalSold}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Top Customers */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-black">
          Top Customers
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Customer
              </th>

              <th>Total Orders</th>

              <th>Total Spent</th>

            </tr>

          </thead>

          <tbody>

            {stats.topCustomers.map((customer, index) => (

              <tr key={index} className="border-b">

                <td className="py-4">
                  {customer.customerName}
                </td>

                <td>{customer.totalOrders}</td>

                <td>
                  Rs. {customer.totalSpent}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Recent Orders */}

      <div className="rounded-xl bg-white p-6 shadow">

        <h2 className="mb-6 text-2xl font-black">
          Recent Orders
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="py-3 text-left">
                Order
              </th>

              <th>Customer</th>

              <th>Status</th>

              <th>Total</th>

            </tr>

          </thead>

          <tbody>

            {stats.recentOrders.map((order) => (

              <tr key={order._id} className="border-b">

                <td className="py-4">
                  #{order._id.slice(-6).toUpperCase()}
                </td>

                <td>{order.customerName}</td>

                <td>{order.orderStatus}</td>

                <td>
                  Rs. {order.totalAmount}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default Statistics;