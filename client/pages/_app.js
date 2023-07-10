import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import UserState from "@/context/auth/UserState";
import Navigation from "@/components/layout/Navbar";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  return (

    <UserState>
      <Navigation/>
      <Component {...pageProps} />
    </UserState>

  );
}
