/**
 * -----------------------------------------------------------------------------
 * File: AppBackground.tsx
 * Description:
 * Shared background for authenticated dashboard pages.
 *
 * Responsibilities:
 * - Render a subtle mesh gradient.
 * - Add a soft grid overlay.
 * - Keep the focus on content.
 * -----------------------------------------------------------------------------
 */

export default function AppBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      {/* Base Background */}
      <div className="absolute inset-0 bg-background" />

      {/* Mesh Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(
              900px circle at 0% 0%,
              rgba(37,99,235,0.16),
              transparent 55%
            ),
            radial-gradient(
              700px circle at 100% 0%,
              rgba(96,165,250,0.14),
              transparent 50%
            ),
            radial-gradient(
              800px circle at 50% 100%,
              rgba(191,219,254,0.18),
              transparent 55%
            )
          `,
        }}
      />

      {/* Subtle Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(rgba(15,23,42,0.035) 1px, transparent 1px),
            linear-gradient(90deg, rgba(15,23,42,0.035) 1px, transparent 1px)
          `,
          backgroundSize: "32px 32px",
        }}
      />
    </div>
  );
}
