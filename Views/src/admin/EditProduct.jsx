import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    stock: "",
    image: "",
  });


  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    try {

      const res = await axios.get(
        "http://localhost:3000/products"
      );

      const product = res.data.success
        ? res.data.data.find((p) => p._id === id)
        : res.data.find((p) => p._id === id);

      if (!product) {
        toast.error("Product not found");
        navigate("/admin/products");
        return;
      }

      setForm({
        title: product.title,
        description: product.description,
        price: product.price,
        category: product.category,
        brand: product.brand,
        stock: product.stock,
        image: product.image,
      });

    } catch (error) {
      toast.error("Unable to load product");
      navigate("/productadmin");
    }
  };


  const updateProduct = async (e) => {

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

      const res = await axios.put(
        `http://localhost:3000/updateproduct/${id}`,
        formData
      );

      toast.success(res.data.message);

      navigate("/admin/products");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Failed to update product"
      );

    }

  };  return (
    <section className="mx-auto flex min-h-screen max-w-3xl items-center px-4 py-10">

      <div className="w-full rounded-xl border border-stone-200 bg-white p-8 shadow-xl">

        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
          Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-black text-slate-900">
          Update Product
        </h1>

        <p className="mt-3 text-slate-600">
          Edit product information below.
        </p>

        <form
          onSubmit={updateProduct}
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
            placeholder="Price"
            value={form.price}
            onChange={(e) =>
              setForm({ ...form, price: e.target.value })
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
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="rounded-lg border border-stone-300 px-4 py-3"
          />

          <textarea
            rows="5"
            placeholder="Description"
            value={form.description}
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
            className="col-span-full rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <div className="col-span-full">

            <p className="mb-3 font-semibold">
              Current Image
            </p>

            <img
              src={
                image
                  ? URL.createObjectURL(image)
                  : form.image
              }
              alt={form.title}
              className="h-52 w-52 rounded-lg border object-cover"
            />

          </div>

          <div className="col-span-full flex gap-4">

            <button
              type="submit"
              className="flex-1 rounded-lg bg-emerald-800 py-3 font-semibold text-white transition hover:bg-emerald-900"
            >
              Update Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/admin/products")}
              className="flex-1 rounded-lg bg-stone-300 py-3 font-semibold transition hover:bg-stone-400"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </section>
  );
}

export default EditProduct;