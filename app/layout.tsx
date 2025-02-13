import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Poppins } from "next/font/google";
import Header from "./components/Header";
import Footer from "./components/Footer";
import type React from "react"; // Added import for React
import SocialShareBar from "./components/social-sharebar";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "PRASK & Associates - Chartered Accountants",
  description: "Prestigious Chartered Accountants firm in New Delhi, India",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Header />
        <SocialShareBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
