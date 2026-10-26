import type { Metadata } from "next";
import SkipToContent from "@/client/shared/ui/atoms/SkipToContent";
import "./globals.css";

import Footer from "@/client/widgets/Footer";
import Header from "@/client/widgets/Header";
import { Teko } from "next/font/google";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Foodiesaurus, restaurantes sin alergias",
  description:
    "Encuentra restaurantes seguros si tienes alergia o intolerancia a algún alimento.",
};

const teko = Teko({
  subsets: ["latin", "latin-ext"],
  variable: "--teko-font",
  weight: ["600", "700"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const isLoggedIn = Boolean(await auth());

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${teko.variable} min-h-screen flex-col flex`} suppressHydrationWarning>
        <SkipToContent />
        <Header isLoggedIn={isLoggedIn} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
