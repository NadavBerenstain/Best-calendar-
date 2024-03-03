import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";

const supabase = createClient(
  "https://cqfhdxngmyzdflxeeubj.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxZmhkeG5nbXl6ZGZseGVldWJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk0ODQ5NTgsImV4cCI6MjAyNTA2MDk1OH0.h87t5p-MAfX2Evu4vQL4cVlXO1dGrk_4gCqNqUPa0bo"
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
      <App />
    </SessionContextProvider>
  </React.StrictMode>
);
