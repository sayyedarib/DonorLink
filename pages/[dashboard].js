import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import userContext from "@/context/auth/userContext";
import OrdersCard from "@/components/cards/OrdersCard";
import DashboardProfile from "@/components/DashboardProfile";

const Volunteer = ({volunteersData}) => {
  const [decision, setDecision] = useState(0);
  const [works, setWorks] = useState(volunteersData?.works);

  const handleDecision = async (id, answer) => {

    console.log("handle decision id: ", id, "answer: ", answer, "decision", decision);
    setDecision(prev => prev + 1);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order?response=${answer}`,
      { _id: volunteersData._id, workId: id },
      {
        withCredentials: true,
      }
    );
    setDecision(prev => prev + 1);
  };

  return (
    <>
      <div>
        {volunteersData?.type?<DashboardProfile userData={volunteersData}/>:<DashboardProfile userData={volunteersData?.profile} />}
      </div>
      {!volunteersData?.type && (
        <div>
          <div
            className="mt-14 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <span
              className="mx-4 mb-0 text-center font-semibold dark:text-blue-950">
              Pending Response
            </span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-3 m-3">

            {/* <div className="flex flex-wrap xl:flex-nowrap gap-3 justify-center items-center m-5"> */}
            {works?.filter(data => !data.collected && !data.accepted && !data.rejected).map((filteredData, index) => {
             return <div key={index}><OrdersCard data={filteredData} handleDecision={handleDecision} /></div>
            })}

            {/* </div> */}
          </div>
          <div
            className="mt-20 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <span
              className="mx-4 mb-0 text-center font-semibold dark:text-blue-950">
              Accepted
            </span>
          </div>    <div className="flex flex-wrap justify-center items-center gap-3 m-3">

            {/* <div className="flex flex-wrap xl:flex-nowrap gap-3 justify-center items-center m-5"> */}

            {works?.filter(data => data.accepted && !data.collected).map((filteredData, index) => {
             return <div key={index}><OrdersCard data={filteredData} handleDecision={handleDecision} /></div>
            })}
          </div>
          <div
            className="mt-20 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <span
              className="mx-4 mb-0 text-center font-semibold dark:text-blue-950">
              Collected
            </span>
          </div>    <div className="flex flex-wrap justify-center items-center gap-3 m-3">
            {works?.filter(data => data.accepted && data.collected).map((filteredData, index) => {
              return <div key={index}><OrdersCard data={filteredData} handleDecision={handleDecision} /></div>
            })}
          </div>
        </div>
      )}

    </>
  );
};

export default Volunteer;


export const getServerSideProps = async (context) => {
  const { dashboard } = context.query;
  const _id = dashboard;
  try{
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteer?_id=${_id}`);
    return {
      props: {
        volunteersData: data?.data,
      },
    };
  }catch(error){
    return {
      props: {
        volunteersData: [],
      },
    }
  }
};

