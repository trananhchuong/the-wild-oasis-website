import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_style/globals.css";
import type { Metadata } from "next";

import { Josefin_Sans } from "next/font/google";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
  },
  description:
    "Luxurious cabin hotel, located in the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${josefin.className} antialiased`}
      >
        <header>
          <Logo />
          <Navigation />
        </header>
        <main className="container mx-auto px-4 py-8">{children}</main>
        <footer className="text-center py-4">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} The Wild Oasis. All rights reserved.
          </p>
        </footer>
      </body>
    </html>
  );
}
