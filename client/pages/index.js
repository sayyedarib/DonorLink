import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Volunteers from "@/components/Volunteers";
import Footer from "@/components/layout/Footer";
import dynamic from "next/dynamic";
import Records from "@/components/Records";

const Services = dynamic(() => import("@/components/Services"));

export default function Home({ volunteersData }) {
  const [recordsData, setRecordsData] = useState({
    donations: "0",
    volunteers: "0",
    distributions: "0"
  });

  const [dataFetched, setDataFetched] = useState(false);

  const getRecordsData = async () => {
    if (!dataFetched) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/recordsData`
      );
      setDataFetched(true);
      const fetchedRecordData = await res.json();
      console.log("fetchedRecordData ", fetchedRecordData);
      setRecordsData(fetchedRecordData);
    }
    else {
      return;
    }
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
    if (!dataFetched) {
      getRecordsData();
    }

    window.addEventListener("scroll", handleInfiniteScroll);
    return () => window.removeEventListener("scroll", handleInfiniteScroll);
  }, [dataFetched]);

  return (
    <>
      <Head>
      </Head>
      <div className="flex flex-col gap-10 bg-blue-50">
        <Header />
        <Services />
        <Volunteers volunteerData={volunteersData} />
        <Records data={recordsData} />
        {/* <Organizations /> */}
        <Footer />
      </div>
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerList`);

  return {
    props: {
      volunteersData: data,
    },
  };
}
  ;
