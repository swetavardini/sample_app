import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Product Provider } from "@/context/ProductContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My First Next.js App",
  description: "Learning Next.js step by step",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ProductProvider> 
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ProductProvider>
      </body>
    </html>
  );
}
