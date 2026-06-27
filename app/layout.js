import { Geist, Geist_Mono, Outfit, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { NotificationProvider } from "@/lib/contexts/serviceContext";
import LivePopup from "@/components/services/popup";
import { GoogleAnalytics } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ['latin'] })

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
    title: "White Green Decors | Wedding Decor & Wedding Decoration",
    description:
      "Premium wedding decor & wedding decoration services by White Green Decors. Haldi, Mehndi, ring ceremony, car decor & full event styling.",
    url: "https://whitegreendecors.com",
    siteName: "White Green Decors",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${inter.className} ${outfit.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <head><meta name="google-site-verification" content="wlyGMRS0fLKm-JNRVUrIr4NYageS9dldgOMhVLE3sIU" /></head>
      <body className="min-h-full flex flex-col">
        <NotificationProvider>
          <Navbar />
          <div className="min-h-screen border-t-3 border-t-zinc-300">
            {children}
            <LivePopup />
          </div>
          <Footer />
        </NotificationProvider>
        <div className="analysis">
          <SpeedInsights />
          <Analytics />
        </div>
      </body>
      <GoogleAnalytics gaId="G-JX81334QJE" />
    </html>
  );
}
