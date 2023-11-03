import "@/styles/globals.css";
import States from "@/context/States";
import Navbar from "@/components/layout/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <States>
      <Navbar />
      <Component {...pageProps} />
    </States>
  );
}
