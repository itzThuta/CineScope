import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

/* ========= Logo ========= */
function Logo({ className = "h-7 w-auto" }) {
  return (
    <Link to="/" className="flex items-center gap-2 select-none">
      <svg
        viewBox="0 0 24 24"
        className={className}
        aria-hidden="true"
        fill="currentColor"
      >
        <path d="M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm0-2.5L4.5 2 13 4.5 11.5 7 3 5.5Zm9 2L13.5 5 22 7.5 20.5 10 12 7.5Z" />
      </svg>
      <span className="text-xl sm:text-2xl font-semibold tracking-tight">
        CineScope
      </span>
    </Link>
  );
}

/* ========= Icons ========= */
const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-3.4-3.4" />
  </svg>
);
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="size-6"
  >
    <path
      fill-rule="evenodd"
      d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
      clip-rule="evenodd"
    />
  </svg>
);
// const SunIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <circle cx="12" cy="12" r="5" />
//     <path d="M12 1v2m0 18v2m11-11h-2M3 12H1m18.364-7.364-1.414 1.414M6.05 17.95l-1.414 1.414m0-13.364L6.05 6.05m11.314 11.314 1.414 1.414" />
//   </svg>
// );
// const MoonIcon = () => (
//   <svg
//     viewBox="0 0 24 24"
//     className="w-5 h-5"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//   >
//     <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
//   </svg>
// );

const BellIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="size-6"
  >
    <path d="M5.85 3.5a.75.75 0 0 0-1.117-1 9.719 9.719 0 0 0-2.348 4.876.75.75 0 0 0 1.479.248A8.219 8.219 0 0 1 5.85 3.5ZM19.267 2.5a.75.75 0 1 0-1.118 1 8.22 8.22 0 0 1 1.987 4.124.75.75 0 0 0 1.48-.248A9.72 9.72 0 0 0 19.266 2.5Z" />
    <path
      fill-rule="evenodd"
      d="M12 2.25A6.75 6.75 0 0 0 5.25 9v.75a8.217 8.217 0 0 1-2.119 5.52.75.75 0 0 0 .298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 1 0 7.48 0 24.583 24.583 0 0 0 4.83-1.244.75.75 0 0 0 .298-1.205 8.217 8.217 0 0 1-2.118-5.52V9A6.75 6.75 0 0 0 12 2.25ZM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 0 0 4.496 0l.002.1a2.25 2.25 0 1 1-4.5 0Z"
      clip-rule="evenodd"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);
const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

/* ========= Card (Modern Netflix-inspired) ========= */
function PosterCard({ item }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-zinc-900/5 dark:bg-white/5">
      <div className="relative w-full aspect-[2/3] sm:aspect-[9/14] md:aspect-[2/3]">
        {item.img ? (
          <img
            src={item.img}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center text-zinc-500 bg-zinc-200 dark:bg-zinc-800">
            Poster
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3">
        <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-1">
          {item.title}
        </h3>

        <div className="flex items-center justify-between mt-1 text-xs text-zinc-200">
          {/* Modern rating pill */}
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-sm text-[11px] font-medium text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-3 h-3 text-yellow-400"
            >
              <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            {item.rating}
          </span>

          {/* small overview preview */}
          <span className="line-clamp-1 opacity-80 ml-2">
            {item.overview.slice(0, 40)}...
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [q, setQ] = useState("");
  const [type, setType] = useState("movie");
  const [sort, setSort] = useState("trending");
  const [dark, setDark] = useState(true);
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false); // 👈 dropdown state
  const dropdownRef = useRef(null);
  const [loggingOut, setLoggingOut] = useState(false); // 👈 new state
  const navigate = useNavigate(); // 👈 navigation hook

  // pagination states
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  //   const [hasMore, setHasMore] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Theme init on first load
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initial = stored ? stored === "dark" : prefersDark;
    setDark(initial);
    document.documentElement.setAttribute(
      "data-theme",
      initial ? "dark" : "light"
    );
  }, []);

  // Apply when toggled
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  /* ========= TMDB integration ========= */
  const TMDB = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODhkMzllMTJjNWI0MjhmYmIxODY4ODEyNTY3NTBkMCIsIm5iZiI6MTcyMTU2ODI4OC4yOTMsInN1YiI6IjY2OWQwYzIwNTlhMTAwNjM1MTQ2NjdiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xaSixkx-PDpbauAQUnyuu7xdFSO1pr1bWLfnMlf7RWg",
    },
  });

  const mapItems = (arr = []) =>
    arr.map((r) => ({
      id: r.id,
      media: r.media_type || type, // 👈 important for trending endpoints
      title: r.title || r.name || "Untitled",
      rating: r.vote_average ? r.vote_average.toFixed(1) : "0.0",
      overview: r.overview || "",
      img: r.poster_path
        ? `https://image.tmdb.org/t/p/w500${r.poster_path}`
        : "",
    }));

  // fetch discover list when not searching
  useEffect(() => {
    if (isSearch) return; // skip if in search mode

    let cancel;
    (async () => {
      try {
        let endpoint =
          sort === "trending"
            ? `/trending/${type}/week`
            : sort === "popular"
            ? `/${type}/popular`
            : `/${type}/top_rated`;

        const res = await TMDB.get(endpoint, {
          params: { language: "en-US", page },
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        const mapped = mapItems(res.data?.results);
        setItems((prev) => (page === 1 ? mapped : [...prev, ...mapped]));
        // setHasMore(page < res.data.total_pages);
      } catch (err) {
        if (!axios.isCancel(err)) console.error(err);
      }
    })();
    return () => cancel && cancel();
  }, [type, sort, page, isSearch]);

  // reset page when type/sort changes
  useEffect(() => {
    if (!isSearch) setPage(1);
  }, [type, sort, isSearch]);

  // search (debounced)
  useEffect(() => {
    if (!q.trim()) {
      setIsSearch(false);
      setPage(1);
      return;
    }
    setIsSearch(true);
    const t = setTimeout(async () => {
      try {
        const res = await TMDB.get(`/search/${type}`, {
          params: { query: q, language: "en-US", page: 1 },
        });
        setItems(mapItems(res.data?.results));
        // setHasMore(false);
      } catch (err) {
        console.error(err);
      }
    }, 400);
    return () => clearTimeout(t);
  }, [q, type]);

  /* ====== UI (unchanged) BELOW ====== */

  return (
    <div className="min-h-dvh bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      {/* ============ NAVBAR ============ */}
      <header className="sticky top-0 z-20 bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur border-b border-zinc-200 dark:border-zinc-800">
        {/* full-bleed with small edge padding */}
        <div className="w-full px-2 sm:px-3 lg:px-4 py-3 flex items-center">
          {/* Left (flush to edge) */}
          <div className="flex items-center gap-2">
            <button
              className="md:hidden mr-2 rounded-lg border border-zinc-300 dark:border-zinc-700 p-2"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
            <Logo />
          </div>

          {/* Center (perfectly centered search) */}
          <div className="flex-1 hidden md:flex justify-center">
            <form
              className="w-full max-w-xl relative"
              onSubmit={(e) => e.preventDefault()} // unchanged
            >
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search movies or TV…"
                className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 pl-10 pr-12 py-2 outline-none focus:border-black dark:focus:border-white focus:ring-2 focus:ring-black/10 dark:focus:ring-white/10"
              />
              <span className="absolute inset-y-0 left-0 pl-3 grid place-items-center text-zinc-500">
                <SearchIcon />
              </span>
            </form>
          </div>

          {/* Right (tight to edge on wide screens) */}
          {/* Right side icons */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Only show Discover + Watchlist on md+ screens */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/home" className="text-sm font-medium">
                Discover
              </Link>
              <Link
                to="/watchlist"
                className="text-sm text-zinc-600 hover:text-zinc-900"
              >
                Watchlist
              </Link>
            </div>

            {/* 🔔 Notifications (always visible) */}
            <button
              onClick={() => alert("Notifications feature coming soon!")}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-zinc-300 hover:bg-zinc-500"
              aria-label="Notifications"
            >
              <BellIcon />
            </button>

            {/* 👤 User Dropdown (always visible) */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdown((d) => !d)}
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 w-9 h-9 hover:bg-zinc-500"
                aria-label="User"
              >
                <UserIcon />
              </button>

              {dropdown && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl border border-zinc-200 bg-white shadow-lg z-50 text-sm">
                  <div className="px-3 py-2 border-b border-zinc-200 font-medium text-zinc-700">
                    Profile
                  </div>
                  <Link
                    to="/profile"
                    className="block px-3 py-2 rounded-xl hover:bg-zinc-100 text-zinc-700"
                  >
                    My Account
                  </Link>
                  <Link
                    to="/settings"
                    className="block px-3 py-2 rounded-xl hover:bg-zinc-100 text-zinc-700"
                  >
                    Settings
                  </Link>

                  {/* LOGOUT FIX */}
                  <button
                    onClick={() => {
                      setLoggingOut(true); // show spinner
                      // clear auth (adjust if your tokens are in localStorage)
                      localStorage.removeItem("token");
                      setTimeout(() => {
                        setLoggingOut(false);
                        navigate("/"); // redirect
                      }, 3000);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl hover:bg-zinc-100 text-red-600"
                  >
                    {loggingOut ? (
                      <>
                        <svg
                          className="animate-spin h-4 w-4 text-red-600"
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
                            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                          ></path>
                        </svg>
                        Logging out…
                      </>
                    ) : (
                      "Logout"
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile: search & links */}
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800">
          <div className="px-2 py-3">
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search movies or TV…"
                className="w-full rounded-xl bg-white dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 pl-10 pr-3 py-2 outline-none focus:border-black dark:focus:border-white"
              />
              <span className="absolute inset-y-0 left-0 pl-3 grid place-items-center text-zinc-500">
                <SearchIcon />
              </span>
            </form>
          </div>
          {open && (
            <nav className="px-2 pb-3 flex flex-col gap-2 text-sm">
              <Link
                to="/home"
                className="px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Discover
              </Link>
              <Link
                to="/watchlist"
                className="px-3 py-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                Watchlist
              </Link>
            </nav>
          )}
        </div>
      </header>
      {/* ============ CONTENT ============ */}
      <main className="w-full px-2 sm:px-3 lg:px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl sm:text-3xl font-bold">
            {isSearch ? "Search Results" : "Discover"}
          </h1>
        </div>
        {/* Controls (only visible if not searching) */}
        {!isSearch && (
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <div className="inline-flex rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-1">
              <button
                onClick={() => setType("movie")}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  type === "movie"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                Movies
              </button>
              <button
                onClick={() => setType("tv")}
                className={`px-3 py-1.5 rounded-full text-sm ${
                  type === "tv"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                TV
              </button>
            </div>
            <div className="inline-flex rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 p-1">
              {["trending", "popular", "top"].map((key) => (
                <button
                  key={key}
                  onClick={() => setSort(key)}
                  className={`px-3 py-1.5 rounded-full text-sm capitalize ${
                    sort === key
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  {key === "top" ? "Top Rated" : key}
                </button>
              ))}
            </div>
          </div>
        )}
        {/* Grid */}
        <div className="mt-6 grid gap-4 sm:gap-5 grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((it) => (
            <Link key={it.id} to={`/${it.media || type}/${it.id}`}>
              <PosterCard item={it} />
            </Link>
          ))}
        </div>
        {/* Load More (only if discover mode) */}
        {/* {!isSearch && hasMore && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg bg-black text-white text-sm font-medium hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Load More
            </button>
          </div>
        )} */}
      </main>
      {/* ============ FOOTER ============ */}
      return (
      <footer className="bg-zinc-100 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 mt-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row items-center justify-between text-center md:text-left">
          {/* Left Section - Copyright */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            © 2025 <span className="font-semibold">Cinescope</span>. All rights
            reserved.
          </p>

          {/* Middle Section - Developer Credit */}
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-3 md:mt-0">
            Developed by <span className="font-semibold">Thu Ta Zaw</span>
          </p>

          {/* Right Section - Social Links */}
          <div className="flex items-center gap-4 mt-3 md:mt-0">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/share/1DaMiLXuoH/?mibextid=wwXIfr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors"
            >
              <FaFacebook className="w-5 h-5" />
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/itz_not_thuta?igsh=bDl6YWRhYnp0cnRr&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-zinc-600 dark:text-zinc-400 hover:text-pink-500 transition-colors"
            >
              <FaInstagram className="w-5 h-5" />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/thu-ta-zaw"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-zinc-600 dark:text-zinc-400 hover:text-blue-700 transition-colors"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
