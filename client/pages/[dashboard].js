import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import userContext from "@/context/auth/userContext";
import OrdersCard from "@/components/OrdersCard";
import Link from "next/link";

const Volunteer = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  const [userData, setUserData] = useState(userContextDetail.userStateData);
  const [decision, setDecision] = useState(0);
  const [works, setWorks] = useState(userContextDetail.userStateData.works);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerList?particular=${userContextDetail.userStateData.email}`);
        console.log("userData ", userData)
        console.log("CL:data dashboard ", data);
        setWorks(data.works);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
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
  <div className="w-full px-4 mx-auto mt-60">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
    <div className="px-6">
      <div className="flex flex-wrap justify-center">
        <div className="w-full px-4 flex justify-center">
          <div className="relative">
            <img alt="..." src="/assets/images/fill-gap/boy.svg" className="shadow-xl rounded-full w-40 h-40" />
          </div>
        </div>
        <div className="w-full px-4 text-center mt-20">
          <div className="flex justify-center py-4 lg:pt-4 pt-8">
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                22
              </span>
              <span className="text-sm text-blueGray-400">Friends</span>
            </div>
            <div className="mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                10
              </span>
              <span className="text-sm text-blueGray-400">Photos</span>
            </div>
            <div className="lg:mr-4 p-3 text-center">
              <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                89
              </span>
              <span className="text-sm text-blueGray-400">Comments</span>
            </div>
          </div>
        </div>
      </div>
      <div className="text-center mt-12">
        <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
          {userData.name}
        </h3>
        <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
          <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
          {userData?.address?.city}, California
        </div>
        <div className="mb-2 text-blueGray-600 mt-10">
          <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
          {userData?.type}
        </div>
      </div>
      <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center">
          <div className="w-full lg:w-9/12 px-4">
            <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
{userData?.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>
    {userContextDetail.userStateData.type == "Volunteer" && (<div> <div
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
    </div>)}

  </>
  );
};

export default Volunteer;
