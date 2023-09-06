import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/Header/Header";

interface IRootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Weather App",
  description: "To get today's weather",
};

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang="en">
      <body className="p-4 sm:p-5 font min-h-screen">
        <Header underline>Today's Weather</Header>
        <main>{children}</main>
      </body>
    </html>
  );
}
