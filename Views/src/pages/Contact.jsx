import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons'
import toast from 'react-hot-toast'
import axios from "axios";
import { useState } from "react";

function Contact() {

 const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/contact", {
        name,
        email,
        message,
      });

      if (res.data.success) {
        toast.success("Message sent successfully");

        setName("");
        setEmail("");
        setMessage("");
      }

    } catch (err) {
      toast.error("Unable to send message");
      console.log(err);
    }
  }


  return (
    <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="mb-8 text-left">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">Contact</p>
        <h1 className="mt-2 text-4xl font-black text-slate-950">Talk to Ben Store</h1>
      </div>

      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4 text-left">
          <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm shadow-stone-200/60">
            <p className="flex items-center gap-3 font-bold text-slate-950">
              <FontAwesomeIcon icon={faEnvelope} className="text-emerald-700" /> Email
            </p>
            <p className="mt-2 text-slate-600">hello@benstore.com</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm shadow-stone-200/60">
            <p className="flex items-center gap-3 font-bold text-slate-950">
              <FontAwesomeIcon icon={faPhone} className="text-emerald-700" /> Phone
            </p>
            <p className="mt-2 text-slate-600">+92 300 0000000</p>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm shadow-stone-200/60">
            <p className="flex items-center gap-3 font-bold text-slate-950">
              <FontAwesomeIcon icon={faLocationDot} className="text-emerald-700" /> Location
            </p>
            <p className="mt-2 text-slate-600">Karachi, Pakistan</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="rounded-lg border border-stone-200 bg-white p-6 text-left shadow-xl shadow-stone-200/70">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="font-bold text-slate-950">Name</span>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 w-full rounded border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700" required />
            </label>
            <label className="block">
              <span className="font-bold text-slate-950">Email</span>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 w-full rounded border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700" required />
            </label>
          </div>
          <label className="mt-5 block">
            <span className="font-bold text-slate-950">Message</span>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 min-h-40 w-full rounded border border-stone-300 px-4 py-3 outline-none focus:border-emerald-700" required />
          </label>
          <button type="submit" className="mt-5 rounded bg-emerald-700 px-6 py-3 font-bold text-white transition hover:bg-slate-950">
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

export default Contact
