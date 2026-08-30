import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-6xl font-bold text-gray-300 dark:text-gray-700">404</h1>
      <p className="mb-6 text-lg text-gray-600 dark:text-gray-400">Page not found</p>
      <Link
        href="/"
        className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700"
      >
        Go home
      </Link>
    </div>
  );
}
