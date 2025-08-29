import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import SignIn from "./pages/SignIn.jsx";
import SignUp from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import MovieDetail from "./pages/MovieDetail.jsx";
import Watchlist from "./pages/WatchList.jsx";
import Profile from "./pages/Profile.jsx";
import Settings from "./pages/Settings.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  { path: "/", element: <SignIn /> },     // start at Sign In (UI-only for now)
  { path: "/signup", element: <SignUp /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/watchlist", element: <Watchlist />},
  { path: "/home" , element: <Home /> },
  { path: "/:media/:id", element: <MovieDetail /> },
  { path: '/profile', element: <Profile /> },
  { path: 'settings', element: <Settings /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
