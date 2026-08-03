import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();

    setError("");

    try {
      const res = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      if (res.data.success) {
        toast.success(res.data.message);

        setEmail("");
        setPassword("");
        setError("");

        const token = await res.data.token;
        localStorage.setItem("token",res.data.token);
        localStorage.setItem("role",res.data.role);
        localStorage.setItem("name",res.data.name);
        localStorage.setItem("email",res.data.email);
        localStorage.setItem("userId", res.data.userId);

        if(res.data.role==="admin"){
          navigate("/admin");
        }
        else{
          navigate("/");
        }
        
      } else {
        setError(res.data.message);
        toast.error(res.data.message);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong. Please try again.");
      toast.error("Something went wrong.");
    }
  };

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl items-center px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-md rounded-lg border border-stone-200 bg-white p-8 shadow-xl shadow-stone-200/70">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-800">
          Welcome Back
        </p>

        <h1 className="mt-2 text-4xl font-black text-slate-950">
          Login
        </h1>

        <p className="mt-3 text-slate-600">
          Login to continue shopping with Ben Store.
        </p>

        <form onSubmit={login} className="mt-8 space-y-5">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-600"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            className="w-full rounded-lg border border-stone-300 px-4 py-3 outline-none transition focus:border-emerald-600"
          />

          {error && (
            <p className="text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-800 py-3 font-semibold text-white transition hover:bg-emerald-900"
          >
            Login
          </button>
        </form>

        <p className="mt-6 text-center text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-semibold text-emerald-800 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Login;