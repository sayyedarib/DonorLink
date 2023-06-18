import Head from "next/head";
import axios from "axios";
// import { Inter } from "@next/font/google";

import Header from "@/components/Header";
// import Services from "@/components/Services";
import Volunteers from "@/components/Volunteers";
import Organizations from "@/components/Organizations";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navigation";
import Script from "next/script";
import dynamic from "next/dynamic";
import UserState from "@/context/auth/UserState";

const Services = dynamic(() => import("@/components/Services"));

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ data }) {
  return (
    <>

        <Head>
          <script src="https://accounts.google.com/gsi/client" async defer></script>
        </Head>
        <Script
          src="https://accounts.google.com/gsi/client"
          async
          defer
        ></Script>

        {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
        <Header />
        <Services />
        <Volunteers volunteerData={data} />
        {/* <Organizations /> */}
        {/* <Footer /> */}
    </>
  );
}

export const getServerSideProps = async (context) => {
  console.log(process.env.NEXT_PUBLIC_BACKEND_URL);
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteers`;
  const { data } = await axios.get(url);
  return {
    props: {
      data: data,
    },
  };
};
