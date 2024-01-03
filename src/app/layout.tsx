import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lighthouse statistics",
  description: "Lighthouse statistics analysis tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-4">{children}</body>
    </html>
  );
}
