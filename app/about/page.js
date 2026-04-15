import AboutPage from "./components/structure";

export const metadata = {
  title: "About White Green Decors | Premium Event Decoration Services",
  description:
    "Learn about White Green Decors – experts in wedding decoration, event styling, floral decor, and luxury setups. Transforming events into unforgettable experiences.",
  keywords: [
    "White Green Decors",
    "event decoration",
    "wedding decorator",
    "floral decoration",
    "event styling",
    "luxury event decor",
    "wedding setup India",
  ],
  openGraph: {
    title: "White Green Decors | About Us",
    description:
      "Discover White Green Decors – professional event decorators specializing in weddings, floral setups, and luxury event styling.",
    url: "https://whitegreendecors.com/about",
    siteName: "White Green Decors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "White Green Decors | About",
    description:
      "Professional wedding & event decorators creating unforgettable experiences.",
  },
};

const About = () => {
  return <AboutPage />;
};

export default About;
