import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function ProductAdmin() {
  const [products, setProducts] = useState([]);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
  });

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");

      if (res.data.success) {
        setProducts(res.data.data);
      } else {
        setProducts(res.data);
      }
    } catch (error) {
      toast.error("Unable to fetch products");
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("price", form.price);
    formData.append("category", form.category);
    formData.append("brand", form.brand);
    formData.append("stock", form.stock);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/addproduct",
        formData
      );

      toast.success(res.data.message);

      setForm({
        title: "",
        description: "",
        price: "",
        category: "",
        brand: "",
        stock: "",
      });

      setImage(null);

      document.getElementById("image").value = "";

      getProducts();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to add product"
      );
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/deleteproduct/${id}`
      );

      toast.success(res.data.message);

      getProducts();
    } catch (error) {
      toast.error("Unable to delete product");
    }
  };

  // ==========================
  // Categories
  // ==========================

  const categories = useMemo(() => {
    const cats = [...new Set(products.map((p) => p.category))];
    return ["All", ...cats];
  }, [products]);

  // ==========================
  // Filter Products
  // ==========================

const filteredProducts = products.filter((product) => {
  const searchMatch = (product.title || "")
    .toLowerCase()
    .includes(search.toLowerCase());

  const categoryMatch =
    categoryFilter === "All" ||
    product.category === categoryFilter;

  return searchMatch && categoryMatch;
});

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">

      <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-xl">

        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
          Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-black text-slate-900">
          Product Management
        </h1>

        <p className="mt-3 text-slate-600">
          Add products and manage your store inventory.
        </p>

        <form
          onSubmit={addProduct}
          className="mt-8 grid gap-5 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Product Title"
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            type="text"
            placeholder="Brand"
            value={form.brand}
            onChange={(e) =>
              setForm({ ...form, brand: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            type="number"
            placeholder="Stock"
            value={form.stock}
            onChange={(e) =>
              setForm({ ...form, stock: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="rounded-lg border border-stone-300 px-4 py-3"
          />

          <textarea
            placeholder="Product Description"
            rows="4"
            value={form.description}
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
            className="md:col-span-2 rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          {image && (
            <div className="md:col-span-2">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="h-44 rounded-lg object-cover"
              />
            </div>
          )}

          <button
            className="md:col-span-2 rounded-lg bg-emerald-800 py-3 font-semibold text-white transition hover:bg-emerald-900"
          >
            Add Product
          </button>
        </form>

      </div>    

      <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700 md:w-96"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
        >
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>

      </div>

      {/* Products */}

      <div className="mt-12">

        <h2 className="mb-6 text-3xl font-black text-slate-900">
          Products
        </h2>

        {filteredProducts.length === 0 ? (

          <div className="rounded-xl border border-stone-200 bg-white p-12 text-center shadow">

            <h3 className="text-2xl font-bold">
              No Products Found
            </h3>

            <p className="mt-3 text-slate-500">
              Add your first product above.
            </p>

          </div>

        ) : (

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredProducts.map((product) => (

              <div
                key={product._id}
                className="overflow-hidden rounded-xl border border-stone-200 bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >

                <img
                  src={product.image}
                  alt={product.title}
                  className="h-60 w-full object-cover"
                />

                <div className="p-5">

                  <h3 className="line-clamp-1 text-2xl font-bold">
                    {product.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-slate-600">
                    {product.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">
                      {product.category}
                    </span>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700">
                      {product.brand}
                    </span>

                  </div>

                  <div className="mt-5 flex items-center justify-between">

                    <div>

                      <p className="text-2xl font-black text-emerald-700">
                        ${Number(product.price).toLocaleString()}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        Stock : {product.stock}
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 flex gap-3">

                    <Link
                      to={`/admin/products/edit/${product._id}`}
                      className="flex-1 rounded-lg bg-blue-600 py-2 text-center text-white"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 rounded-lg bg-red-600 py-2 font-semibold text-white transition hover:bg-red-700"
                    >
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </section>
  );
}

export default ProductAdmin;