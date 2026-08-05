import type { Metadata } from "next";
import SkipToContent from "@/client/shared/ui/atoms/SkipToContent";
import "./globals.css";

import Footer from "@/client/widgets/Footer";
import Header from "@/client/widgets/Header";
import { Teko } from "next/font/google";
import { auth } from "@/auth";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isLoggedIn = Boolean(await auth());

  return (
    <html lang="es">
      <body className={`${teko.variable} min-h-screen flex-col flex`}>
        <SkipToContent />
        <Header isLoggedIn={isLoggedIn} />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
