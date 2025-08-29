// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const BackIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    username: "",
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Load user
  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      const u = JSON.parse(stored);
      setUser(u);
      setForm((f) => ({ ...f, username: u.username || "" }));
    } else {
      navigate("/signin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return;
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://expire-sense.onrender.com/api/auth/update_users_byID/${user.id}`,
        {
          username: form.username,
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
          role: 0,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Profile updated successfully!");
      const updated = { ...user, username: form.username };
      localStorage.setItem("user", JSON.stringify(updated));
      setUser(updated);
      setForm({
        username: updated.username,
        currentPassword: "",
        newPassword: "",
      });
      setEditMode(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <main className="min-h-dvh w-full px-2 sm:px-3 lg:px-6 py-6 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Back */}
      <div className="mb-4">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        >
          <BackIcon /> Back
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">My Account</h1>

      {/* Responsive grid: stack on mobile, 2-cols on desktop */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar / summary */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-900">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-zinc-200 dark:bg-zinc-700 flex items-center justify-center text-2xl font-bold text-zinc-600 dark:text-zinc-300">
              {user.username?.[0]?.toUpperCase() || "U"}
            </div>
            <h2 className="mt-3 font-semibold">{user.username}</h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {user.email}
            </p>
          </div>
        </div>

        {/* Main content */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-900">
          {!editMode ? (
            <>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <span className="font-medium">Username:</span> {user.username}
              </p>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                <span className="font-medium">Email:</span> {user.email}
              </p>
              <button
                onClick={() => setEditMode(true)}
                className="mt-4 px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleUpdate} className="space-y-4">
              {/* Username */}
              <div>
                <label className="block text-sm font-medium">Username</label>
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm"
                />
              </div>

              {/* Current Password */}
              <div>
                <label className="block text-sm font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={form.currentPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block text-sm font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={form.newPassword}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 px-4 py-2 text-sm"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 text-sm hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
