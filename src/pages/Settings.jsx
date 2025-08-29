// src/pages/Settings.jsx
import { Link } from "react-router-dom";

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

export default function Settings() {
  return (
    <main className="min-h-dvh w-full px-2 sm:px-3 lg:px-4 py-6 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Back */}
      <div className="mb-4">
        <Link
          to="/home"
          className="inline-flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        >
          <BackIcon /> Back
        </Link>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Settings</h1>

      <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 p-6 bg-white dark:bg-zinc-900">
        <h2 className="text-lg font-semibold mb-2">Preferences</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Settings feature will be available soon.
        </p>
        <button
          onClick={() => alert("Settings feature will be available soon.")}
          className="mt-4 px-4 py-2 rounded-lg bg-black text-white text-sm hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
        >
          Try Settings
        </button>
      </div>
    </main>
  );
}
