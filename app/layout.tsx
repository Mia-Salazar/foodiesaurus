import type { Metadata } from "next";
import SkipToContent from "@/client/shared/ui/atoms/SkipToContent";
import "./globals.css";

import Footer from "@/client/shared/ui/organisms/Footer";
import Header from "@/client/shared/ui/organisms/Header";
import { Teko } from "next/font/google";

export const metadata: Metadata = {
  title: "Foodiesaurus, restaurantes sin alergias",
  description: "Encuenta restaurantes seguros para personas con alergias e intolerancias",
};

const teko = Teko({
  subsets: ["latin", "latin-ext"],
  variable: "--teko-font",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={`${teko.variable} min-h-screen flex-col flex`}>
        <SkipToContent />
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
