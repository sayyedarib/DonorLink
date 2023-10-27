import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Volunteers from "@/components/Volunteers";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import Records from "@/components/Records";

const Services = dynamic(() => import("@/components/Services"));

export default function Home({ volunteersData, recordsData }) {
  return (
    <>
      <Head>
        <title>DonorLink</title>
      </Head>
      <div className="flex flex-col gap-10 bg-blue-50">
        <Header/>
        <Services />
        <Volunteers volunteerData={volunteersData} />
        <Records data={recordsData} />
        {/* <Organizations /> */}
        <Footer/>
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  try{
    const volunteeListrData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerList`);
    const recordsData = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recordsData`);
    return {
      props: {
        volunteersData: volunteeListrData.data,
        recordsData: recordsData.data,
      },
    }
  }catch(error){
    return {
      props: {
        volunteersData: [],
      },
    }
  }
};


