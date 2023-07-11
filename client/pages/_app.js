import "@/styles/globals.css";
import UserState from "@/context/auth/UserState";
import Navigation from "@/components/layout/Navbar";

export default function App({ Component, pageProps }) {
  return (

    <UserState>
      <Navigation/>
      <Component {...pageProps} />
    </UserState>

  );
}
