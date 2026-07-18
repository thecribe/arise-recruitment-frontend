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

import Providers from "./providers";

/**
 * Root application component.
 */
export default function App() {
  return <Providers />;
}