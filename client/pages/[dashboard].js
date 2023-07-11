import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import userContext from "@/context/auth/userContext";
import OrdersCard from "@/components/cards/OrdersCard";
import DashboardProfile from "@/components/DashboardProfile";

const Volunteer = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  const [userData, setUserData] = useState(userContextDetail.userStateData);
  const [decision, setDecision] = useState(0);
  const [works, setWorks] = useState(userContextDetail.userStateData.works);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("CL: dasboard userContextDetial.userStateData ", userContextDetail.userStateData)
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerList?particular=${userContextDetail.userStateData._id}`);
        console.log("userData ", userData);
        console.log("CL:data dashboard ", data);
        setWorks(data.data);
      } catch (error) {
        console.error("CL: dashboard ", error);
      }
    };

    fetchData();
  }, [decision]);

  useEffect(() => {
    const fetchDataOnMount = async () => {
      setDecision(prev => prev + 1);
    };

    fetchDataOnMount();
  }, []);

  useEffect(() => {
    const handleRouteChange = () => {
      setDecision(prevCount => prevCount + 1);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, []);


  const handleDecision = async (id, answer) => {

    console.log("handle decision id: ", id, "answer: ", answer, "decision", decision);
    setDecision(prev => prev + 1);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order?response=${answer}`,
      { email: userContextDetail.userStateData.email, workId: id },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <>
      <div>
        <DashboardProfile userData={userData} />
      </div>
      {userContextDetail.userStateData.type == "Volunteer" && (
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
            {works?.filter(data => !data.collected && !data.accepted && !data.rejected).map(filteredData => (
              <OrdersCard data={filteredData} handleDecision={handleDecision} />
            ))}

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
            {works?.filter(data => data.accepted && !data.collected).map(filteredData => (
              <OrdersCard data={filteredData} handleDecision={handleDecision} />
            ))}

            {/* </div> */}
          </div>
          <div
            className="mt-20 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <span
              className="mx-4 mb-0 text-center font-semibold dark:text-blue-950">
              Collected
            </span>
          </div>    <div className="flex flex-wrap justify-center items-center gap-3 m-3">

            {/* <div className="flex flex-wrap xl:flex-nowrap gap-3 justify-center items-center m-5"> */}
            {works?.filter(data => data.accepted && data.collected).map(filteredData => (
              <OrdersCard data={filteredData} handleDecision={handleDecision} />
            ))}
            {/* </div> */}
          </div>
        </div>
      )}

    </>
  );
};

export default Volunteer;
