import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import UserState from "@/context/auth/UserState";
// import Navbar from "@/components/Navigation";
import Navigation from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (

    <UserState>
      <Navigation/>
      <Component {...pageProps} />
      {/* <Footer /> */}
    </UserState>

  );
}
