import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GlobalWatch — Real-Time Global Monitoring",
  description:
    "GlobalWatch is a real-time global monitoring platform for tracking incidents, alerts, and events worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-gray-950 text-gray-100">
        {children}
      </body>
    </html>
  );
}
