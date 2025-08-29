// src/pages/MovieDetail.jsx
import { useEffect, useState, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

// localStorage helpers (same key as Watchlist.jsx)
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
  window.dispatchEvent(new CustomEvent(EVT)); // let Watchlist.jsx know
}
function toggleWatchlist(item) {
  const items = loadWatchlist();
  const exists = items.some(
    (x) => x.id === item.id && x.media_type === item.media_type
  );
  const next = exists
    ? items.filter(
        (x) => !(x.id === item.id && x.media_type === item.media_type)
      )
    : [...items, item];
  saveWatchlist(next);
  return !exists; // true if added, false if removed
}

/* --- Icons --- */
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
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

/* --- API --- */
const TMDB = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxODhkMzllMTJjNWI0MjhmYmIxODY4ODEyNTY3NTBkMCIsIm5iZiI6MTcyMTU2ODI4OC4yOTMsInN1YiI6IjY2OWQwYzIwNTlhMTAwNjM1MTQ2NjdiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xaSixkx-PDpbauAQUnyuu7xdFSO1pr1bWLfnMlf7RWg",
  },
});

/* --- Helpers --- */
function formatRuntime(mins) {
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return `${h}h ${m}m`;
}

function Chip({ children }) {
  return (
    <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs">
      {children}
    </span>
  );
}

/* --- Component --- */
export default function MovieDetail() {
  const { media = "movie", id } = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);
  const [cert, setCert] = useState("NR");
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState([]);
  const [saved, setSaved] = useState({ watchlist: false, favorite: false });

  useEffect(() => {
    let cancel;
    setLoading(true);

    (async () => {
      try {
        const [dRes, credRes, vidRes, rateRes] = await Promise.all([
          TMDB.get(`/${media}/${id}`, {
            params: { language: "en-US" },
            cancelToken: new axios.CancelToken((c) => (cancel = c)),
          }),
          TMDB.get(`/${media}/${id}/credits`, {
            params: { language: "en-US" },
          }),
          TMDB.get(`/${media}/${id}/videos`, { params: { language: "en-US" } }),
          media === "movie"
            ? TMDB.get(`/movie/${id}/release_dates`)
            : TMDB.get(`/tv/${id}/content_ratings`),
        ]);

        setDetail(dRes.data);

        // cert
        if (media === "movie") {
          const US = rateRes.data?.results?.find((r) => r.iso_3166_1 === "US");
          setCert(
            US?.release_dates?.find((x) => x.certification)?.certification ||
              "NR"
          );
        } else {
          const US = rateRes.data?.results?.find((r) => r.iso_3166_1 === "US");
          setCert(US?.rating || "NR");
        }

        // trailer
        const key = vidRes.data?.results?.find(
          (v) => v.type === "Trailer" && v.site === "YouTube"
        )?.key;
        setTrailerKey(key || null);

        // cast
        setCast((credRes.data?.cast || []).slice(0, 12));
      } catch (err) {
        if (!axios.isCancel(err)) console.error("detail fetch error:", err);
      } finally {
        setLoading(false);
      }
    })();

    return () => cancel && cancel();
  }, [media, id]);

  const poster = useMemo(
    () =>
      detail?.poster_path
        ? `https://image.tmdb.org/t/p/w500${detail.poster_path}`
        : "",
    [detail]
  );

  const year = useMemo(() => {
    const date = detail?.release_date || detail?.first_air_date;
    return date ? new Date(date).getFullYear() : "";
  }, [detail]);

  const runtimeText = useMemo(() => {
    if (!detail) return null;
    if (media === "movie") return formatRuntime(detail.runtime);
    const ep = Array.isArray(detail.episode_run_time)
      ? detail.episode_run_time[0]
      : null;
    const seasons = detail.number_of_seasons;
    return seasons
      ? `${seasons} season${seasons > 1 ? "s" : ""}${ep ? ` • ~${ep}m/ep` : ""}`
      : null;
  }, [detail, media]);

  if (loading) return <div className="px-4 py-6">Loading…</div>;
  if (!detail) return null;

  return (
    // Same vibe as Home.jsx — sits under global nav
    <main className="w-full px-2 sm:px-3 lg:px-4 py-6 bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50">
      {/* Back */}
      <div className="mb-4">
        <Link
          to="/home"
          className="inline-flex items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
        >
          <BackIcon /> Back
        </Link>
      </div>

      {/* Grid */}
      <div className="grid gap-4 lg:grid-cols-[220px_1fr]">
        {/* Poster */}
        <div className="flex justify-center lg:block">
    {poster ? (
      <img
        src={poster}
        alt={detail.title || detail.name}
        className="rounded-xl w-40 sm:w-52 md:w-60 lg:w-full object-cover border border-zinc-200 dark:border-zinc-700"
      />
    ) : (
      <div className="w-40 sm:w-52 md:w-60 lg:w-full aspect-[2/3] grid place-items-center text-zinc-500 bg-zinc-200 dark:bg-zinc-800 rounded-xl">
        Poster
      </div>
    )}
        </div>

        {/* Info */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">
            {detail.title || detail.name}
          </h1>

          <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            {year && <span>{year}</span>}
            {cert && <span>• {cert}</span>}
            {runtimeText && <span>• {runtimeText}</span>}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {(detail.genres || []).map((g) => (
              <Chip key={g.id}>{g.name}</Chip>
            ))}
          </div>

          {/* Trailer — smaller */}
          <button
            disabled={!trailerKey}
            onClick={() =>
              trailerKey &&
              window.open(
                `https://www.youtube.com/watch?v=${trailerKey}`,
                "_blank"
              )
            }
            className={`mt-4 w-44 rounded-lg border px-3 py-2 flex items-center justify-center gap-2 text-sm ${
              trailerKey
                ? "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                : "border-zinc-200 dark:border-zinc-800 opacity-60 cursor-not-allowed"
            }`}
          >
            <PlayIcon />
            <span>{trailerKey ? "Play Trailer" : "No Trailer"}</span>
          </button>

          {/* Actions — compact */}
          <div className="mt-4 flex gap-2">
            <button
              onClick={() => {
                const added = toggleWatchlist({
                  id: Number(id),
                  media_type: media,
                  title: detail.title || detail.name,
                  name: detail.name || detail.title,
                  overview: detail.overview || "",
                  poster_path: detail.poster_path || "",
                  vote_average: detail.vote_average || 0,
                });
                setSaved((s) => ({ ...s, watchlist: added }));
              }}
              className={`px-3 py-1.5 text-sm rounded-lg border ${
                saved.watchlist
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              {saved.watchlist ? "In Watchlist" : "Add Watchlist"}
            </button>

            <button
              onClick={() => setSaved((s) => ({ ...s, favorite: !s.favorite }))}
              className={`px-3 py-1.5 text-sm rounded-lg border ${
                saved.favorite
                  ? "bg-black text-white dark:bg-white dark:text-black"
                  : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
            >
              Favorite
            </button>
          </div>

          {/* Overview */}
          <div className="mt-6">
            <h2 className="text-lg sm:text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              {detail.overview || "No overview available."}
            </p>
          </div>
        </div>
      </div>

      {/* Cast — compact, fixed heights so they never look “too high” */}
      <div className="mt-8">
        <h3 className="text-lg sm:text-xl font-semibold">Top Billed Cast</h3>
        <div className="mt-3 grid gap-3 grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
          {cast.map((c) => {
            const head = c.profile_path
              ? `https://image.tmdb.org/t/p/w185${c.profile_path}`
              : null;
            return (
              <div
                key={c.id}
                className="group rounded-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden bg-white dark:bg-zinc-900 hover:shadow-sm transition"
              >
                <div className="relative bg-zinc-200 dark:bg-zinc-800">
                  {/* fixed height so the card never looks tall */}
                  <div className="h-36 sm:h-40 md:h-44 w-full overflow-hidden">
                    {head ? (
                      <img
                        src={head}
                        alt={c.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full grid place-items-center text-zinc-500">
                        Photo
                      </div>
                    )}
                  </div>
                </div>
                <div className="p-2 text-center">
                  <p className="text-xs font-medium line-clamp-1">{c.name}</p>
                  {c.character && (
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1">
                      {c.character}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
