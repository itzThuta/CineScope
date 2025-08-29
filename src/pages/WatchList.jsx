// src/pages/Watchlist.jsx
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* LocalStorage helpers */
const KEY = "cinescope_watchlist";
const EVT = "cinescope:watchlist";

function loadWatchlist() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function saveWatchlist(items) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent(EVT));
}
function removeFromWatchlist(id, media_type) {
  const items = loadWatchlist().filter(
    (x) => !(x.id === Number(id) && x.media_type === media_type)
  );
  saveWatchlist(items);
}

/* Icons */
const TrashIcon = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18M8 6v12m8-12v12M10 6l1-2h2l1 2m-7 0h8M7 6h10l-1 14a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2L7 6Z" />
  </svg>
);
const BackIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

/* Card */
function PosterCard({ item, onRemove }) {
  const img = item.poster_path
    ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
    : "";

  return (
    <div className="group relative overflow-hidden rounded-lg bg-zinc-900/5 dark:bg-white/5">
      <Link to={`/${item.media_type}/${item.id}`} className="block">
        <div className="relative w-full aspect-[2/3]">
          {img ? (
            <img
              src={img}
              alt={item.title || item.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center text-zinc-500 bg-zinc-200 dark:bg-zinc-800">
              Poster
            </div>
          )}
        </div>
      </Link>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent 
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1">
            {item.title || item.name}
          </h3>
          {typeof item.vote_average === "number" && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full 
              bg-white/20 backdrop-blur-sm text-[11px] font-medium text-white">
              ⭐ {item.vote_average.toFixed(1)}
            </span>
          )}
        </div>
        <div className="mt-2 flex justify-end">
          <button
            onClick={() => onRemove(item.id, item.media_type)}
            className="inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-md 
              border border-white/30 text-white/90 hover:bg-white/10"
          >
            <TrashIcon /> Remove
          </button>
        </div>
      </div>
    </div>
  );
}

/* Page */
export default function Watchlist() {
  const [items, setItems] = useState(() => loadWatchlist());
  const [filter, setFilter] = useState("all");
  const [q, setQ] = useState("");

  useEffect(() => {
    const handler = () => setItems(loadWatchlist());
    window.addEventListener(EVT, handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener(EVT, handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const filtered = useMemo(() => {
    return items
      .filter((x) => (filter === "all" ? true : x.media_type === filter))
      .filter((x) => {
        const t = (x.title || x.name || "").toLowerCase();
        return q ? t.includes(q.toLowerCase()) : true;
      });
  }, [items, filter, q]);

  const handleRemove = (id, media_type) => {
    removeFromWatchlist(id, media_type);
    setItems((prev) =>
      prev.filter((x) => !(x.id === id && x.media_type === media_type))
    );
  };

  const clearAll = () => {
    if (!items.length) return;
    if (confirm("Clear your entire watchlist?")) {
      saveWatchlist([]);
      setItems([]);
    }
  };

  return (
    <div className="min-h-dvh bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      <main className="w-full px-3 sm:px-6 lg:px-8 py-6">
        {/* Back */}
        <div className="mb-4">
          <Link
            to="/home"
            className="inline-flex items-center gap-2 text-sm text-zinc-600 
              dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          >
            <BackIcon /> Back
          </Link>
        </div>

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Your Watchlist</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {filtered.length} item{filtered.length !== 1 ? "s" : ""}
              {filter !== "all" ? ` · ${filter.toUpperCase()}` : ""}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Filters */}
            <div className="inline-flex rounded-full bg-zinc-100 dark:bg-zinc-900 border 
              border-zinc-300 dark:border-zinc-700 p-1">
              {["all", "movie", "tv"].map((k) => (
                <button
                  key={k}
                  onClick={() => setFilter(k)}
                  className={`px-3 py-1.5 rounded-full text-sm capitalize ${
                    filter === k
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>
            {/* Search */}
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search in watchlist…"
              className="w-44 sm:w-64 rounded-xl bg-white dark:bg-zinc-900 border 
                border-zinc-300 dark:border-zinc-700 pl-3 pr-3 py-2 text-sm outline-none 
                focus:border-black dark:focus:border-white"
            />
            {/* Clear */}
            <button
              onClick={clearAll}
              className="hidden sm:inline-flex items-center px-3 py-2 text-sm rounded-lg 
                border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Clear all
            </button>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="mt-20 grid place-items-center text-center text-zinc-500 dark:text-zinc-400">
            <p>No items yet. Add some from Discover or any movie detail.</p>
            <Link
              to="/home"
              className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg 
                border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-sm"
            >
              Browse Discover
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7">
            {filtered.map((it) => (
              <PosterCard key={`${it.media_type}-${it.id}`} item={it} onRemove={handleRemove} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
