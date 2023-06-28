import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import UserState from "@/context/auth/UserState";
// import Navbar from "@/components/Navigation";
import Navigation from "@/components/Navbar";
import Footer from "@/components/Footer";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (

    <UserState>
      <Navigation/>
      <Component {...pageProps} />
      <Footer />
    </UserState>

  );
}
