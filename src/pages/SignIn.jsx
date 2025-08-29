// src/pages/SignIn.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

/* inline logo */
function Logo({ className = "h-7 w-auto" }) {
  return (
    <div className="flex items-center gap-2 select-none text-black">
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm0-2.5L4.5 2 13 4.5 11.5 7 3 5.5Zm9 2L13.5 5 22 7.5 20.5 10 12 7.5Z" />
      </svg>
      <span className="text-2xl font-semibold tracking-tight">CineScope</span>
    </div>
  );
}

export default function SignIn() {
  const [showPw, setShowPw] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await axios.post(
        "https://expire-sense.onrender.com/api/auth/login",
        {
          email: form.email,
          password: form.password,
        }
      );

      // ✅ Save token (adjust based on your API response)
      localStorage.setItem("token", res.data.token || "");
      localStorage.setItem("user", JSON.stringify(res.data.user || {}));

      alert("Signed in successfully!");
      navigate("/home"); // redirect to home
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid place-items-center bg-zinc-900 text-zinc-900">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-8">
          {/* brand */}
          <div className="flex justify-center mb-4">
            <Logo />
          </div>

          <p className="text-center text-zinc-500 mt-2">
            Sign in to continue with CineScope.
          </p>

          {/* form */}
          <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Email"
                className="mt-1 w-full rounded-xl border border-zinc-300 bg-white px-4 py-2
                           outline-none focus:border-black focus:ring-2 focus:ring-black/10"
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Password</label>
              <div className="mt-1 relative">
                <input
                  type={showPw ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2 pr-10
                             outline-none focus:border-black focus:ring-2 focus:ring-black/10"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute inset-y-0 right-0 px-3 text-zinc-500 hover:text-zinc-800"
                >
                  {showPw ? (
                    // 👁️ Eyes open
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                      <path
                        fillRule="evenodd"
                        d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    // 🙈 Eyes closed
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                      <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                      <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-black text-white py-2 font-semibold hover:bg-zinc-900 mt-2 flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-zinc-600">
            Don’t have an account?{" "}
            <Link to="/signup" className="font-semibold underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
