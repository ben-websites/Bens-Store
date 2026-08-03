import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    age: "",
    email: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:3000/users")
      .then((res) => {
        const selectedUser = res.data.find(
          (u) => u._id === id
        );

        if (!selectedUser) {
          toast.error("User not found");
          navigate("/users");
          return;
        }

        setForm(selectedUser);
      })
      .catch(() => {
        toast.error("Something went wrong");
        navigate("/users");
      });
  }, [id, navigate]);

  const updateUser = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:3000/updateuser/${id}`,
        form
      );

      toast.success(res.data.message);
      navigate("/users");
    } catch (error) {
      toast.error("Failed to update user");
    }
  };

  return (

    <section className="mx-auto flex min-h-screen max-w-xl items-center px-4">

      <div className="w-full rounded-xl border bg-white p-8 shadow-lg">

        <h1 className="text-3xl font-black text-emerald-800">
          Update User
        </h1>

        <form
          onSubmit={updateUser}
          className="mt-8 space-y-5"
        >

          <input
            type="text"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="number"
            value={form.age}
            onChange={(e) =>
              setForm({
                ...form,
                age: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <input
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            className="w-full rounded-lg border p-3"
          />

          <button className="w-full rounded-lg bg-emerald-800 py-3 text-white hover:bg-emerald-900">
            Update User
          </button>

        </form>

      </div>

    </section>

  );
}

export default EditUser;