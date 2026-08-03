import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [image, setImage] = useState(null);

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });

  // Fetch Users
  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      setUsers(res.data);
    } catch (error) {
      toast.error("Unable to fetch users");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  // Add User
  const addUser = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", form.name);
    formData.append("age", form.age);
    formData.append("email", form.email);

    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:3000/adduser",
        formData
      );

      toast.success(res.data.message);

      setForm({
        name: "",
        age: "",
        email: "",
      });

      setImage(null);

      // Clear file input
      document.getElementById("image").value = "";

      getUsers();
    } catch (error) {
      toast.error(error.response?.data || "Failed to add user");
    }
  };

  // Delete User
  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?"))
      return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/deleteuser/${id}`
      );

      toast.success(res.data.message);

      getUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-5 py-10">

      {/* Add User */}

      <div className="rounded-xl border border-stone-200 bg-white p-8 shadow-xl">

        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
          Dashboard
        </p>

        <h1 className="mt-2 text-4xl font-black text-slate-900">
          User Management
        </h1>

        <p className="mt-3 text-slate-600">
          Add new users and manage existing ones.
        </p>

        <form
          onSubmit={addUser}
          className="mt-8 grid gap-5 md:grid-cols-2"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) =>
              setForm({ ...form, age: e.target.value })
            }
            className="rounded-lg border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
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

          <button
            className="col-span-full rounded-lg bg-emerald-800 py-3 font-semibold text-white hover:bg-emerald-900"
          >
            Add User
          </button>
        </form>
      </div>

      {/* Users */}

      <div className="mt-12">

        <h2 className="mb-6 text-3xl font-black text-slate-900">
          Added Users
        </h2>

        {users.length === 0 ? (
          <div className="rounded-lg border bg-white p-10 text-center shadow">
            <h3 className="text-xl font-semibold">
              No Users Found
            </h3>

            <p className="mt-2 text-slate-500">
              Add your first user above.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {users.map((user) => (

              <div
                key={user._id}
                className="rounded-xl border border-stone-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >

                <img
                  src={user.image}
                  alt={user.name}
                  className="mx-auto h-32 w-32 rounded-full border-4 border-emerald-100 object-cover"
                />

                <h3 className="mt-4 text-center text-2xl font-bold">
                  {user.name}
                </h3>

                <p className="mt-2 text-center text-slate-600">
                  {user.email}
                </p>

                <p className="text-center text-slate-500">
                  Age: {user.age}
                </p>

                <div className="mt-6 flex gap-3">

                  <Link
                    to={`/edituser/${user._id}`}
                    className="flex-1 rounded-lg bg-blue-600 py-2 text-center font-medium text-white hover:bg-blue-700"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => deleteUser(user._id)}
                    className="flex-1 rounded-lg bg-red-600 py-2 font-medium text-white hover:bg-red-700"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}
      </div>
    </section>
  );
}

export default Users;