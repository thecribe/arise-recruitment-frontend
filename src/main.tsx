/**
 * -----------------------------------------------------------------------------
 * File: main.tsx
 * Description:
 * Entry point for the Airse Recruitment application.
 *
 * Responsibilities:
 * - Import global styles
 * - Mount the root React application
 * - Render the root App component
 *
 * NOTE:
 * Keep this file as small as possible. All providers should be registered
 * inside app/providers.tsx rather than directly here.
 * -----------------------------------------------------------------------------
 */

import React from "react";
import ReactDOM from "react-dom/client";

// Import global Tailwind styles.
import "./index.css";

// Import the root application component.
import App from "@/app/App";

// Locate the root DOM element and mount the React application.
ReactDOM.createRoot(document.getElementById("root")!).render(
  // React Strict Mode helps detect unsafe lifecycle usage
  // and other development-time issues.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);