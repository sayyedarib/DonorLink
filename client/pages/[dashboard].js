import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import userContext from "@/context/auth/userContext";
import OrdersCard from "@/components/OrdersCard";

const Volunteer = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  const [decision, setDecision] = useState(0);
  const [works, setWorks] = useState(userContextDetail.userStateData.database);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerList?particular=${userContextDetail.userStateData.email}`);
        setWorks(data);
      } catch (error) {
        // Handle any errors that occur during the API request
        console.error(error);
      }
    };

    fetchData();
  }, [decision]);


  const handleDecision = async (id, answer) => {
    console.log("handle decision id and answer ", id, " ", answer);
    setDecision(prev => prev + 1);
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order?response=${answer}`,
      { email: userContextDetail.userStateData.email, workId: id },
      {
        withCredentials: true,
      }
    );
  };

  return (<>
    {/* <div className="flex bg-slate-100 w-auto max-w-[100vw] h-auto antialiased text-blue-100 selection:bg-blue-600 selection:text-white">
      <div className="flex relative w-full">
        <div id="menu" className="bg-blue-900 z-10 min-h-full w-1/3 lg:w-auto left-0 h-[90vh]">
          <div id="logo" className="my-4 px-6">
            <h1 className="text-lg md:text-2xl font-bold">Dashboard</h1>
            <span className="text-sm">Manage your actions and activities</span>
          </div>
          <div id="profile" className="px-6 py-10">
            <span>Welcome back,</span>
            <button className="flex space-x-2 items-center">
              <span>
                <img className="rounded-full w-8 h-8" src={userContextDetail.userStateData.picture ? userContextDetail.userStateData.picture : "/assets/images/fill-gap/boy.svg"} alt="" />
              </span>
              <span className="text-sm md:text-base font-bold">
                {userContextDetail?.userStateData.name ? userContextDetail?.userStateData.name : "Guest"}
              </span>
            </button>
          </div>
          <div id="nav" className="w-full">
            <button className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 bg-blue-950 hover:bg-white/5 transition ease-linear duration-150">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-white">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                </svg>

              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold leading-5 text-white">Dashboard</span>
                <span className="text-sm text-white/50 hidden md:block">Data Overview</span>
              </div>
            </button>
            <button className="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                </svg>
              </div>
              <div className="flex flex-col items-start">
                <span className="text-lg text-slate-300 font-bold leading-5">Profile</span>
                <span className="text-sm text-slate-500 hidden md:block">Edit & view profile</span>
              </div>
            </button>
          </div>
        </div>

      </div>
    </div> */}
    <div
      class="mt-14 my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
      <span
        class="mx-4 mb-0 text-center font-semibold dark:text-blue-950">
        Pending Response
      </span>
    </div>
    <div className="flex flex-wrap justify-center items-center gap-3 m-3">

      {/* <div className="flex flex-wrap xl:flex-nowrap gap-3 justify-center items-center m-5"> */}
      {works?.works?.filter(data => !data.collected&&!data.accepted&&!data.rejected).map(filteredData => (
        <OrdersCard data={filteredData} handleDecision={handleDecision} />
      ))}

      {/* </div> */}
    </div>
    <div
      class="mt-20 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
      <span
        class="mx-4 mb-0 text-center font-semibold dark:text-blue-950">
        Accepted
      </span>
    </div>    <div className="flex flex-wrap justify-center items-center gap-3 m-3">

      {/* <div className="flex flex-wrap xl:flex-nowrap gap-3 justify-center items-center m-5"> */}
      {works?.works?.filter(data => data.accepted&&!data.collected).map(filteredData => (
        <OrdersCard data={filteredData} handleDecision={handleDecision} />
      ))}

      {/* </div> */}
    </div>
    <div
      class="mt-20 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
      <span
        class="mx-4 mb-0 text-center font-semibold dark:text-blue-950">
        Collected
      </span>
    </div>    <div className="flex flex-wrap justify-center items-center gap-3 m-3">

      {/* <div className="flex flex-wrap xl:flex-nowrap gap-3 justify-center items-center m-5"> */}
      {works?.works?.filter(data => data.collected).map(filteredData => (
        <OrdersCard data={filteredData} handleDecision={handleDecision} />
      ))}

      {/* </div> */}
    </div>
    {/* <table className={styles.table}>
      <thead>
        <tr>
          <th>Location</th>
          <th>Quantity</th>
          <th>Accept/Reject</th>
          <th>Collect</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {works?.works?.map((data) => {
          return (
            <tr>
              <td>{data.workDetails.address}</td>
              <td>{data.workDetails.quantity}</td>
              <td>
                {data.accepted ? (
                  <button
                    className={`${styles.button} ${styles.acceptButton}`}
                    disabled={true}
                  >
                    Accepted
                  </button>
                ) : data.rejected?null:(
                  <button
                    className={`${styles.button} ${styles.acceptButton}`}
                    onClick={() => handleDecision(data._id, "accept")}
                  >
                    Accept
                  </button>
                )}
                {data.rejected? (
                  <button
                    className={`${styles.button} ${styles.rejectButton}`}
                    onClick={() => handleDecision(data._id, "reject")}
                    disabled={true}
                  >
                    Rejected
                  </button>
                ):data.accepted?null:data.collected?null:
                <button
                className={`${styles.button} ${styles.rejectButton}`}
                onClick={() => handleDecision(data._id, "reject")}
              >
                Reject
              </button>
                }
              </td>
              <td>
                <button
                  className={`${styles.button} ${styles.collectButton}`}
                  onClick={() => handleDecision(data._id, "collected")}
                >
                  Collect
                </button>
              </td>
              <td>
                {(data.rejected && "rejected") ||
                  (data.collected && "collected") ||
                  (data.accepted && "accepted")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table> */}
  </>
  );
};

export default Volunteer;
