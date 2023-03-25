import "@/styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import  store  from "../store";
import { Provider } from "react-redux";

config.autoAddCss = false;

export default function App({ Component, pageProps }) {
  // console.log("store ", store);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
