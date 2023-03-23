import Head from "next/head";
import Image from "next/image";
// import { Inter } from "@next/font/google";

import Header from "@/components/Header";
import Services from "@/components/Services";
import Volunteers from "@/components/Volunteers";
import Organizations from "@/components/Organizations";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";

// const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
      </Head>


{/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
<Navbar/>
      <Header />
      {/* <Services /> */}
      {/* <Volunteers /> */}
      {/* <Organizations /> */}
      {/* <Footer /> */}
    </>
  );
}
