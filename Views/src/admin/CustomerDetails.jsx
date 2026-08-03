import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faUser,
  faEnvelope,
  faShoppingCart,
  faDollarSign,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

function CustomerDetails() {

  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [orders, setOrders] = useState([]);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomer();
  }, []);

  async function fetchCustomer() {
    try {

      const res = await axios.get(
        `http://localhost:3000/customers/${id}`
      );

      if (res.data.success) {
          const customerData = res.data.data;

          setCustomer(customerData);
          setOrders(customerData.orders);
          setTotalOrders(customerData.totalOrders);
          setTotalSpent(customerData.totalSpent);
      }

    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <Loader />;

  if (!customer)
    return <h2>Customer not found</h2>;

  return (
    <section className="min-h-screen bg-[#f8f5ef] p-8">

      <Link
        to="/admin/customers"
        className="mb-8 inline-flex items-center gap-2 text-emerald-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Customers
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">

        {/* Customer Card */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-black">
            Customer Information
          </h2>

          <p className="mb-4">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-emerald-700"/>
            {customer.name}
          </p>

          <p className="mb-6">
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-emerald-700"/>
            {customer.email}
          </p>

          <hr className="my-5"/>

          <div className="space-y-4">

            <div className="flex justify-between">

              <span>Total Orders</span>

              <strong>{totalOrders}</strong>

            </div>

            <div className="flex justify-between">

              <span>Total Spent</span>

              <strong className="text-emerald-700">
                Rs. {totalSpent}
              </strong>

            </div>

          </div>

        </div>

        {/* Orders */}

        <div className="rounded-xl bg-white p-6 shadow">

          <h2 className="mb-6 text-2xl font-black">
            Order History
          </h2>

          {orders.length === 0 ? (

            <div className="py-10 text-center text-slate-500">
              This customer has not placed any orders.
            </div>

          ) : (

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="py-4 text-left">
                    Order
                  </th>

                  <th>Status</th>

                  <th>Total</th>

                  <th>Date</th>

                  <th></th>

                </tr>

              </thead>

              <tbody>

                {orders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b"
                  >

                    <td className="py-5">
                      #{order._id.slice(-6).toUpperCase()}
                    </td>

                    <td>{order.orderStatus}</td>

                    <td>
                      Rs. {order.totalAmount}
                    </td>

                    <td>
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td>

                      <Link
                        to={`/admin/orders/${order._id}`}
                        className="rounded bg-emerald-600 px-3 py-2 text-white"
                      >
                        <FontAwesomeIcon icon={faEye}/>
                      </Link>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </section>
  );
}

export default CustomerDetails;