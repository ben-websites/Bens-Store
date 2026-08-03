import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBagShopping,
  faEye,
  faBoxOpen,
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCart } from "../contextApi/CartDataContext";

function ProductCard({ product }) {
  const { addToCart, cartItems } = useCart();

  const alreadyInCart = cartItems.some(
    (item) => item._id === product._id
  );
  return (
    <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Product Image */}

      <Link to={`/products/${product._id}`}>
        <div className="flex h-64 items-center justify-center bg-stone-100 p-6">
          <img
            src={product.image}
            alt={product.title}
            className="h-full object-contain"
            onError={(e) => {
              e.target.src =
                "https://placehold.co/400x400?text=No+Image";
            }}
          />
        </div>
      </Link>

      {/* Content */}

      <div className="space-y-3 p-5">

        <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
          {product.category}
        </span>

        <h2 className="line-clamp-2 text-xl font-bold text-slate-900">
          {product.title}
        </h2>

        <p className="line-clamp-2 text-sm text-slate-600">
          {product.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FontAwesomeIcon
            icon={faTag}
            className="text-emerald-700"
          />
          {product.brand}
        </div>

        <div className="flex items-center gap-2 text-sm text-slate-600">
          <FontAwesomeIcon
            icon={faBoxOpen}
            className="text-emerald-700"
          />
          Stock: {product.stock}
        </div>

        <div className="flex items-center justify-between">

          <span className="text-3xl font-black text-emerald-700">
            ${product.price}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${
              product.stock > 0
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>

        </div>

        {/* Buttons */}

        <div className="mt-4 flex gap-3">

          <button
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            disabled={alreadyInCart || product.stock === 0}
            className={`flex-1 rounded-lg py-3 font-semibold transition ${
              alreadyInCart
                ? "cursor-not-allowed bg-amber-500 text-white"
                : product.stock === 0
                ? "cursor-not-allowed bg-gray-400 text-white"
                : "bg-emerald-700 text-white hover:bg-emerald-800"
            }`}
          >
            <FontAwesomeIcon icon={faBagShopping} />{" "}
            {alreadyInCart
              ? "Added"
              : product.stock === 0
              ? "Out of Stock"
              : "Add to Cart"}
          </button>

          <Link
            to={`/products/${product._id}`}
            className="flex items-center justify-center rounded-lg bg-slate-900 px-5 text-white transition hover:bg-slate-700"
          >
            <FontAwesomeIcon icon={faEye} />
          </Link>

        </div>

      </div>

    </div>
  );
}

export default ProductCard;