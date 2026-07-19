/**
 * -----------------------------------------------------------------------------
 * File: page-loader.tsx
 * Description:
 * Global loading screen displayed while lazy-loaded pages are being downloaded.
 * -----------------------------------------------------------------------------
 */

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
    </div>
  );
}
