import Head from "next/head";
import Image from "next/image";
// import { Inter } from "@next/font/google";
import styles from "@/styles/components/Home.module.css";
import Header from "@/components/Header";
import Services from "@/components/Services";
import Volunteers from "@/components/Volunteers";
import Organizations from "@/components/Organizations";
import Footer from "@/components/Footer";


// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return <><Header/>
  <Services/>
<Volunteers/>
<Organizations/>
<Footer/>
  </>;
}
