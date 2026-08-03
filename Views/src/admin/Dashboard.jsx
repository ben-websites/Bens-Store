import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import {
  faBoxOpen,
  faUsers,
  faShoppingCart,
  faDollarSign,
  faPlus,
  faArrowTrendUp,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Dashboard() {
  const [dashboard, setDashboard] = useState({
    totalProducts: 0,
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    latestProducts: [],
  });

  const getDashboard = async () => {
    try {
      const res = await axios.get("http://localhost:3000/dashboard");

      if (res.data.success) {
        setDashboard(res.data);
      } else {
        toast.error("Unable to load dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server Error");
    }
  };

  useEffect(() => {
    getDashboard();
  }, []);

  return (
    <section className="min-h-screen bg-[#f8f5ef] p-8">


      <div className="mb-10 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-black text-slate-900">
            Admin Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Manage your store from one place.
          </p>
        </div>

        <Link
          to="/admin/products"
          className="flex items-center gap-2 rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
        >
          <FontAwesomeIcon icon={faPlus} />
          Manage Products
        </Link>

      </div>


      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">



        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Products
              </p>

              <h2 className="mt-2 text-4xl font-black text-slate-900">
                {dashboard.totalProducts}
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-700 text-white">

              <FontAwesomeIcon
                icon={faBoxOpen}
                className="text-2xl"
              />

            </div>

          </div>

        </div>

       

        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Users
              </p>

              <h2 className="mt-2 text-4xl font-black text-slate-900">
                {dashboard.totalUsers}
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-600 text-white">

              <FontAwesomeIcon
                icon={faUsers}
                className="text-2xl"
              />

            </div>

          </div>

        </div>

        {/* Orders */}

        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Orders
              </p>

              <h2 className="mt-2 text-4xl font-black text-slate-900">
                {dashboard.totalOrders}
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500 text-white">

              <FontAwesomeIcon
                icon={faShoppingCart}
                className="text-2xl"
              />

            </div>

          </div>

        </div>


        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <div className="flex items-center justify-between">

            <div>

              <p className="text-slate-500">
                Revenue
              </p>

              <h2 className="mt-2 text-4xl font-black text-slate-900">
                ${dashboard.totalRevenue}
              </h2>

            </div>

            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-purple-600 text-white">

              <FontAwesomeIcon
                icon={faDollarSign}
                className="text-2xl"
              />

            </div>

          </div>

        </div>

      </div>


      <div className="mt-10 grid gap-8 lg:grid-cols-3">     

      <div className="lg:col-span-2 rounded-2xl bg-white p-6 shadow-lg">

        <div className="mb-6 flex items-center justify-between">

          <h2 className="text-2xl font-black text-slate-900">
            Latest Products
          </h2>

          <Link
            to="/admin/products"
            className="font-semibold text-emerald-700 hover:underline"
          >
            View All
          </Link>

        </div>

        {dashboard.latestProducts.length === 0 ? (

          <div className="rounded-xl border-2 border-dashed border-stone-300 py-16 text-center">

            <FontAwesomeIcon
              icon={faBoxOpen}
              className="mb-4 text-6xl text-stone-400"
            />

            <h3 className="text-2xl font-bold text-slate-800">
              No Products Available
            </h3>

            <p className="mt-2 text-slate-500">
              Add your first product from Product Management.
            </p>

            <Link
              to="/admin/products"
              className="mt-6 inline-block rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white transition hover:bg-emerald-800"
            >
              Add Product
            </Link>

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b text-left">

                  <th className="py-4">Image</th>

                  <th>Product</th>

                  <th>Category</th>

                  <th>Price</th>

                  <th>Stock</th>

                </tr>

              </thead>

              <tbody>

                {dashboard.latestProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-b transition hover:bg-stone-50"
                  >

                    <td className="py-4">

                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-16 w-16 rounded-lg object-cover"
                      />

                    </td>

                    <td>

                      <h3 className="font-bold">
                        {product.title}
                      </h3>

                      <p className="text-sm text-slate-500 line-clamp-1">
                        {product.description}
                      </p>

                    </td>

                    <td>

                      <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                        {product.category}
                      </span>

                    </td>

                    <td className="font-bold text-emerald-700">
                      ${Number(product.price).toLocaleString()}
                    </td>

                    <td>

                      {product.stock > 0 ? (

                        <span className="font-semibold text-emerald-700">
                          {product.stock}
                        </span>

                      ) : (

                        <span className="font-semibold text-red-600">
                          Out of Stock
                        </span>

                      )}

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>     

      <div className="space-y-8">


        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <h2 className="mb-6 text-2xl font-black text-slate-900">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <Link
              to="/admin/products"
              className="block rounded-xl bg-emerald-700 px-5 py-3 text-center font-semibold text-white transition hover:bg-emerald-800"
            >
              Manage Products
            </Link>

            <Link
              to="/admin/orders"
              className="block rounded-xl bg-blue-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-blue-700"
            >
              Orders
            </Link>

            <Link
              to="/admin/messages"
              className="block rounded-xl bg-purple-600 px-5 py-3 text-center font-semibold text-white transition hover:bg-purple-700"
            >
              Messages
            </Link>

          </div>

        </div>


        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">

              <FontAwesomeIcon
                icon={faArrowTrendUp}
                className="text-2xl text-emerald-700"
              />

            </div>

            <div>

              <h3 className="text-xl font-bold">
                Store Summary
              </h3>

              <p className="text-sm text-slate-500">
                Live information from your database.
              </p>

            </div>

          </div>

          <div className="mt-6 space-y-4">

            <div className="flex justify-between border-b pb-3">

              <span>Total Products</span>

              <strong>
                {dashboard.totalProducts}
              </strong>

            </div>

            <div className="flex justify-between border-b pb-3">

              <span>Total Users</span>

              <strong>
                {dashboard.totalUsers}
              </strong>

            </div>

            <div className="flex justify-between border-b pb-3">

              <span>Total Orders</span>

              <strong>
                {dashboard.totalOrders}
              </strong>

            </div>

            <div className="flex justify-between">

              <span>Total Revenue</span>

              <strong className="text-emerald-700">
                ${dashboard.totalRevenue}
              </strong>

            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-lg">

          <h2 className="mb-5 text-xl font-black">
            Recently Added
          </h2>

          {dashboard.latestProducts.length === 0 ? (

            <p className="text-slate-500">
              No products added yet.
            </p>

          ) : (

            <div className="space-y-4">

              {dashboard.latestProducts.slice(0, 5).map((product) => (

                <div
                  key={product._id}
                  className="flex items-center gap-3"
                >

                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-12 w-12 rounded-lg object-cover"
                  />

                  <div className="flex-1">

                    <h4 className="font-semibold line-clamp-1">
                      {product.title}
                    </h4>

                    <p className="text-sm text-slate-500">
                      {product.category}
                    </p>

                  </div>

                  <span className="font-bold text-emerald-700">
                    ${Number(product.price).toLocaleString()}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>

  </section>
  );
}

export default Dashboard;