import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { NotificationProvider } from "@/lib/contexts/serviceContext";
import LivePopup from "@/components/services/popup";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "White Green Decors | Wedding & Event Decoration Services",
  description:
    "White Green Decors offers premium flower decoration services in Delhi NCR including Delhi, Rohini, Gurugram & Noida. Expert in Haldi, Mehndi, wedding décor, mandap, reception, engagement, birthday, pooja & festival decorations.",
  alternates: {
    canonical: "https://whitegreendecors.com",
  },
  openGraph: {
    title: "White Green Decors",
    description:
      "Premium wedding and event decoration services for Haldi, Mehndi, ring ceremony, and more.",
    url: "https://whitegreendecors.com",
    siteName: "White Green Decors",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${outfit.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col">
        <NotificationProvider>
          <Navbar />
          <div className="min-h-screen border-t-3 border-t-zinc-300">
            {children}
            <LivePopup />
          </div>
          <Footer />
        </NotificationProvider>
      </body>
    </html>
  );
}
