import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import useGeoLocation from "hooks/useGeoLocation";
import userContext from "@/context/auth/userContext";
import { useRouter } from "next/router";
import { BsCheckCircle } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';


const BloodDonationForm = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  console.log("userContextDetail.userStateData.name ", userContextDetail.userStateData);
  if (!userContextDetail.userStateData.name) {
    localStorage.setItem("prevPath", "/")
    router.replace("/auth");
  }
  const location = useGeoLocation();
  const [detail, setDetail] = useState({
    name: userContextDetail.userStateData.name,
    email: userContextDetail.userStateData.email,
    phone: userContextDetail.userStateData?.phone ? userContextDetail.userStateData?.phone : "",
    bloodGroup: "",
    address: userContextDetail.userStateData?.address ? userContextDetail.userStateData?.address : "",
    message: "",
    coordinates: "",
  });

  let name, value;
  const handleInput = (e) => {
    console.log("userContextDetail.userStateData.name 2", userContextDetail.userStateData);
    name = e.target.name;
    value = e.target.value;
    setDetail({
      ...detail,
      [name]: value,
      coordinates: `${location.loaded
        ? JSON.stringify(location.coordinates)
        : "Could not access the location"
        }`,
    });
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    try {
      console.log("start responsing");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bloodDonation`,
        detail,
        {
          withCredentials: true,
        }
      );


      console.log(response);
      setDetail({
        name: "",
        email: "",
        phone: "",
        bloodGroup: "",
        address: "",
        message: "",
        coordinates: "",
      });
      const prevPath = JSON.parse(localStorage.getItem('prevPath')) || { url: '/' };
      toast.success("successfully registered as blood donor")
      router.replace(prevPath.url);
    } catch (err) {
      toast.error("you are already a blood donor.")
      console.log("error while submitting cloth donation data", err);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-5 mt-44">

        <div className="lg:w-[28rem] lg:p-8 p-6 bg-white rounded-xl shadow-xl shadow-blue-200">
          <h1 className="text-center text-blue-800 font-bold text-2xl">Blood Donation</h1>
          <form action="" className="mt-10">
            <div className="flex flex-col space-y-5">
              <label htmlFor="bloodGroup">
                <span className="font-medium text-slate-700 pb-2">Blood Group</span>
                <input
                  onChange={handleInput}
                  value={detail.bloodGroup}
                  id="bloodGroup"
                  name="bloodGroup"
                  type="text"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter your blood group here"
                />
              </label>
              <label htmlFor="message">
                <span className="font-medium text-slate-700 pb-2">Message</span>
                <textarea
                  onChange={handleInput}
                  value={detail.message}
                  id="message"
                  name="message"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="e.g. pickup/contact on weekend after 3pm"
                />

              </label>

            </div>
          </form>
          <button type="button" className="w-full py-3 mt-5 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center">
            <span onClick={handleDonate}>Donate Now</span>
          </button>
        </div>
        <div className="flex flex-col gap-5 justify-center  text-blue-950 mb-10 mx-10">
          <span className="flex items-center gap-3"><BsCheckCircle /> Signup as a donor</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> Go to donate blood section</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> Fill the required details</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> Nearby patient in need can conatact you any time.</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> Visit the mentioned hospital mentioned by patient or his acquintances to save life</span>
        </div>
        <ToastContainer position="top-left" />
      </div>
    </>
  );
};

export default BloodDonationForm;
