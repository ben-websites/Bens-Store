import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const res = await axios.get("http://localhost:3000/messages");

      if (res.data.success) {
        setMessages(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  const filteredMessages = useMemo(() => {
    return messages.filter(
      (message) =>
        message.name.toLowerCase().includes(search.toLowerCase()) ||
        message.email.toLowerCase().includes(search.toLowerCase())
    );
  }, [messages, search]);

  async function deleteMessage(id) {
    const result = await Swal.fire({
      title: "Delete Message?",
      text: "This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await axios.delete(
        `http://localhost:3000/deletemessage/${id}`
      );

      if (res.data.success) {
        setMessages((prev) =>
          prev.filter((message) => message._id !== id)
        );

        Swal.fire(
          "Deleted!",
          "Message deleted successfully.",
          "success"
        );
      }
    } catch (err) {
      Swal.fire("Error", "Unable to delete message.", "error");
    }
  }

  if (loading) return <Loader />;

  return (
    <section className="space-y-8">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-emerald-700">
            Messages
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Contact Messages
          </h1>
        </div>

        <div className="relative">

          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-lg border pl-11 pr-4 py-3"
          />

        </div>

      </div>

      <div className="overflow-hidden rounded-xl bg-white shadow">

        <table className="min-w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="px-6 py-4 text-left">Name</th>

              <th className="px-6 py-4 text-left">Email</th>

              <th className="px-6 py-4 text-center">Date</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredMessages.map((message) => (

              <tr
                key={message._id}
                className="border-t hover:bg-slate-50"
              >

                <td className="px-6 py-5 font-semibold">
                  {message.name}
                </td>

                <td className="px-6 py-5">
                  {message.email}
                </td>

                <td className="px-6 py-5 text-center">
                  {new Date(message.createdAt).toLocaleDateString()}
                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-3">

                    <Link
                      to={`/admin/messages/${message._id}`}
                      className="rounded bg-emerald-600 px-3 py-2 text-white"
                    >
                      <FontAwesomeIcon icon={faEye} />
                    </Link>

                    <button
                      onClick={() => deleteMessage(message._id)}
                      className="rounded bg-red-600 px-3 py-2 text-white"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

export default Messages;