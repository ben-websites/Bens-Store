import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faEnvelope,
  faUser,
  faCalendar,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

function MessageDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessage();
  }, []);

  async function fetchMessage() {
    try {
      const res = await axios.get(
        `http://localhost:3000/messages/${id}`
      );

      if (res.data.success) {
        setMessage(res.data.data);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteMessage() {
    const result = await Swal.fire({
      title: "Delete Message?",
      text: "This action cannot be undone.",
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
        Swal.fire(
          "Deleted!",
          "Message deleted successfully.",
          "success"
        );

        navigate("/admin/messages");
      }
    } catch (err) {
      Swal.fire("Error", "Unable to delete message.", "error");
    }
  }

  if (loading) return <Loader />;

  if (!message)
    return (
      <div className="text-center text-xl font-bold">
        Message not found
      </div>
    );

  return (
    <section className="space-y-8">

      <Link
        to="/admin/messages"
        className="inline-flex items-center gap-2 text-emerald-700"
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        Back to Messages
      </Link>

      <div className="rounded-xl bg-white p-8 shadow">

        <div className="mb-8 flex items-center justify-between">

          <h1 className="text-3xl font-black">
            Message Details
          </h1>

          <button
            onClick={deleteMessage}
            className="rounded-lg bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
          >
            <FontAwesomeIcon icon={faTrash} className="mr-2" />
            Delete
          </button>

        </div>

        <div className="space-y-6">

          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faUser}
              className="text-emerald-700"
            />
            <div>
              <p className="text-sm text-slate-500">Name</p>
              <p className="font-bold">{message.name}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-emerald-700"
            />
            <div>
              <p className="text-sm text-slate-500">Email</p>
              <p className="font-bold">{message.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <FontAwesomeIcon
              icon={faCalendar}
              className="text-emerald-700"
            />
            <div>
              <p className="text-sm text-slate-500">Received</p>
              <p className="font-bold">
                {new Date(message.createdAt).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-sm text-slate-500">
              Message
            </p>

            <div className="rounded-lg border bg-slate-50 p-5 leading-7">
              {message.message}
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}

export default MessageDetails;