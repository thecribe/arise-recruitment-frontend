/**
 * -----------------------------------------------------------------------------
 * File: App.tsx
 * Description:
 * Root application component.
 *
 * Responsibilities:
 * - Render all global providers.
 * - Keep business logic out of this file.
 * - Act as the single entry point of the application.
 * -----------------------------------------------------------------------------
 */

import { RouterProvider } from "react-router-dom";
import Providers from "./providers";
import { router } from "./router";

/**
 * Root application component.
 */
export default function App() {
  return (
    <Providers>
      {/* <Router /> */}
      <RouterProvider router={router} />
    </Providers>
  );
}
