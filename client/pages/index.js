import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
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
import Records from "@/components/Records";

const Services = dynamic(() => import("@/components/Services"));

// const inter = Inter({ subsets: ["latin"] });

export default function Home({ volunteersData }) {

  

  const [recordsData, setRecordsData] = useState({
    donations:"0",
    volunteers:"0",
    distributions:"0"
  });


  const getRecordsData = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recordsData`
    );
    const fetchedRecordData = await res.json();
    console.log("fetchedRecordData ", fetchedRecordData);
    setRecordsData(fetchedRecordData);
  };


  const handleInfiniteScroll = async () => {
    try {
      if (
        (window.innerHeight + document.documentElement.scrollTop) * 1.2 >=
        document.documentElement.scrollHeight
      ) {
        getRecordsData();
      }
    } catch (error) {
      console.log("Error in handleInfiniteScroll function", error);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, []);



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

        <Header />
        {/* <Services /> */}
        {/* <Volunteers volunteerData={volunteersData} /> */}
        {/* {<Records data={recordsData}/>} */}
        {/* <Organizations /> */}
        {/* <Footer /> */}
    </>
  );
};

export const getServerSideProps = async (context) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteers`);
  
  return {
    props: {
      volunteersData: data,
    },
  };
}
;
