import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faArrowLeft,
  faBagShopping,
  faTruckFast,
  faShieldHalved,
  faBoxOpen,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

import Loader from "../components/Loader";
import { useCart } from "../contextApi/CartDataContext";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart, cartItems } = useCart();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/product/${id}`
      );

      if (res.data.success) {
        setProduct(res.data.data);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error("Unable to load product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!product) {
    return (
      <section className="mx-auto max-w-6xl px-4 py-20 text-center">
        <h1 className="text-3xl font-black">
          Product Not Found
        </h1>

        <Link
          to="/products"
          className="mt-8 inline-block rounded-lg bg-emerald-700 px-6 py-3 text-white"
        >
          Back to Products
        </Link>
      </section>
    );
  }

  const alreadyInCart = cartItems.some(
    (item) => item._id === product._id
  );

  return (
    <section className="mx-auto max-w-7xl px-4 py-14">

      <Link
        to="/products"
        className="mb-10 inline-flex items-center gap-2 text-emerald-700 hover:underline"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Products
      </Link>

      <div className="grid gap-10 lg:grid-cols-2">

        {/* Image */}

        <div className="rounded-2xl bg-white p-8 shadow-xl">

          <img
            src={product.image}
            alt={product.title}
            className="mx-auto h-[420px] object-contain"
          />

        </div>

        {/* Details */}

        <div>

          <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-800">
            {product.category}
          </span>

          <h1 className="mt-5 text-5xl font-black">
            {product.title}
          </h1>

          <h2 className="mt-6 text-4xl font-black text-emerald-700">
            ${product.price}
          </h2>

          <p className="mt-6 leading-8 text-slate-600">
            {product.description}
          </p>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">

            <div className="rounded-xl border p-5">

              <div className="flex items-center gap-3">

                <FontAwesomeIcon
                  icon={faTag}
                  className="text-emerald-700"
                />

                <div>

                  <h3 className="font-bold">
                    Brand
                  </h3>

                  <p>{product.brand}</p>

                </div>

              </div>

            </div>

            <div className="rounded-xl border p-5">

              <div className="flex items-center gap-3">

                <FontAwesomeIcon
                  icon={faBoxOpen}
                  className="text-emerald-700"
                />

                <div>

                  <h3 className="font-bold">
                    Stock
                  </h3>

                  <p>{product.stock} Available</p>

                </div>

              </div>

            </div>

            <div className="rounded-xl border p-5">

              <div className="flex items-center gap-3">

                <FontAwesomeIcon
                  icon={faTruckFast}
                  className="text-emerald-700"
                />

                <div>

                  <h3 className="font-bold">
                    Fast Delivery
                  </h3>

                  <p>2-4 Business Days</p>

                </div>

              </div>

            </div>

            <div className="rounded-xl border p-5">

              <div className="flex items-center gap-3">

                <FontAwesomeIcon
                  icon={faShieldHalved}
                  className="text-emerald-700"
                />

                <div>

                  <h3 className="font-bold">
                    Warranty
                  </h3>

                  <p>1 Year Warranty</p>

                </div>

              </div>

            </div>

          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={alreadyInCart}
            className={`mt-10 flex items-center gap-3 rounded-xl px-8 py-4 text-lg font-bold text-white transition ${
              alreadyInCart
                ? "cursor-not-allowed bg-amber-600"
                : "bg-emerald-700 hover:bg-emerald-800"
            }`}
          >
            <FontAwesomeIcon icon={faBagShopping} />

            {alreadyInCart
              ? "Already in Cart"
              : "Add to Cart"}
          </button>

        </div>

      </div>

    </section>
  );
}

export default ProductDetails;