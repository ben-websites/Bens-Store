import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faMagnifyingGlass,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  async function fetchCustomers() {
    try {
      const res = await axios.get("http://localhost:3000/customers");

      if (res.data.success) {
        setCustomers(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (customer) =>
        customer.name
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        customer.email
          .toLowerCase()
          .includes(search.toLowerCase())
    );
  }, [customers, search]);

  if (loading) return <Loader />;

  return (
    <section className="min-h-screen bg-[#f8f5ef] p-8">

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Customers
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Manage Customers
          </h1>

          <p className="mt-2 text-slate-500">
            View all registered customers and their order history.
          </p>
        </div>

        <div className="relative">

          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border pl-11 pr-4 py-3"
          />

        </div>

      </div>

      <div className="mt-8 overflow-hidden rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="px-6 py-4 text-left">Customer</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-center">Orders</th>
              <th className="px-6 py-4 text-center">Spent</th>
              <th className="px-6 py-4 text-center">Last Order</th>
              <th className="px-6 py-4 text-center">Action</th>
            </tr>

          </thead>

          <tbody>

            {filteredCustomers.length === 0 ? (

              <tr>
                <td
                  colSpan="6"
                  className="py-16 text-center text-slate-500"
                >
                  <FontAwesomeIcon
                    icon={faUsers}
                    className="mb-4 text-5xl text-slate-400"
                  />

                  <p>No Customers Found</p>
                </td>
              </tr>

            ) : (

              filteredCustomers.map((customer) => (

                <tr
                  key={customer._id}
                  className="border-t hover:bg-slate-50"
                >

                  <td className="px-6 py-5 font-semibold">
                    {customer.name}
                  </td>

                  <td className="px-6 py-5">
                    {customer.email}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {customer.totalOrders}
                  </td>

                  <td className="px-6 py-5 text-center font-bold text-emerald-700">
                    Rs. {customer.totalSpent}
                  </td>

                  <td className="px-6 py-5 text-center">
                    {customer.lastOrder
                      ? new Date(
                          customer.lastOrder
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-5 text-center">

                    <Link
                      to={`/admin/customers/${customer._id}`}
                      className="rounded bg-emerald-600 px-3 py-2 text-white hover:bg-emerald-700"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default Customers;