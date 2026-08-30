import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: {
    default: "Claude CMD — Package Manager for Claude Code",
    template: "%s | claudecmd.com",
  },
  description:
    "Discover, install, and manage Claude Code skills and plugins. The open-source package manager for the Claude Code ecosystem.",
  keywords: [
    "claude code",
    "claude code package manager",
    "claude code skills",
    "install claude commands",
    "claude code plugins",
  ],
  metadataBase: new URL("https://claudecmd.com"),
  openGraph: {
    siteName: "Claude CMD",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased min-h-screen bg-gray-50 dark:bg-gray-950`}>
        <nav className="border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold text-gray-900 dark:text-white">
              claude-cmd
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/skills" className="text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400">
                Skills
              </Link>
              <Link href="/stats" className="text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400">
                Stats
              </Link>
              <a
                href="https://github.com/kiliczsh/claude-cmd"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-violet-600 dark:text-gray-400 dark:hover:text-violet-400"
              >
                GitHub
              </a>
            </div>
          </div>
        </nav>
        <main>{children}</main>
        <footer className="border-t border-gray-200 bg-white py-8 text-center text-sm text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-500">
          <p>
            Claude CMD — The package manager for Claude Code.{" "}
            <a
              href="https://github.com/kiliczsh/claude-cmd"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-violet-600"
            >
              Open source on GitHub
            </a>
            .
          </p>
        </footer>
      </body>
    </html>
  );
}
