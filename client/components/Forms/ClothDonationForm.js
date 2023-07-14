import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import useGeoLocation from "hooks/useGeoLocation";
import userContext from "@/context/auth/userContext";
import { useRouter } from "next/router";
import { BsCheckCircle } from "react-icons/bs"
import { ToastContainer, toast } from 'react-toastify';

const ClothDonationForm = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  const location = useGeoLocation();

  console.log("userContextDetail?.userStateData?.name ", userContextDetail?.userStateData);
  if (!userContextDetail?.userStateData?.name) {
    router.replace("/auth?prevPath=/forms/clothDonation");
  }

  //states
  const [loader, setLoader]=useState(false);
  const [donationDetail, setDonationDetail] = useState({
    id:userContextDetail?.userStateData?._id,
    quantity: "",
    message: "",
  });

  let name, value;
  const handleInput = (e) => {
    console.log("userContextDetail.userStateData.name 2", userContextDetail?.userStateData);
    name = e.target.name;
    value = e.target.value;
    setDonationDetail({
      ...donationDetail,
      [name]: value,
    });
  };

  const handleDonate = async (e) => {
    e.preventDefault();
    try {
      console.log("start responsing");
      setLoader(true);
      toast.success("Thank you for donation");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clothDonation`,
        donationDetail,
        {
          withCredentials: true,
        }
      );
      toast.success("Nearby volunteer has been notified");
      setLoader(false);
      setDonationDetail({
        id:"",
        quantity: "",
        message: "",
      });

      router.replace("/");
    } catch (error) {
      setLoader(false);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center items-center gap-14 mt-60 lg:mt-auto">
        <div className="lg:w-[28rem] p-8 my-10 rounded-xl shadow-xl shadow-blue-900">

          <h1 className="text-center text-blue-800 font-bold text-2xl">Cloth Donation</h1>
          <form action="" className="mt-10">
            <div className="flex flex-col space-y-5">
              <label htmlFor="quantity">
                <span className="font-medium text-slate-700 pb-2">Pairs of cloth</span>
                <input
                  onChange={handleInput}
                  value={donationDetail.quantity}
                  id="quantity"
                  name="quantity"
                  type="number"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="Enter number of pairs of cloth here"
                />
              </label>
              <label htmlFor="message">
                <span className="font-medium text-slate-700 pb-2">Message</span>
                <textarea
                  onChange={handleInput}
                  value={donationDetail.message}
                  id="message"
                  name="message"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="e.g. pickup/contact on weekend after 3pm"
                />

              </label>

            </div>
          </form>
          <button type="button" onClick={handleDonate} className="w-full py-3 mt-5 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center">
            <span >{loader?<img src="/assets/images/fill-gap/loader.gif" alt="loader_img"/>:"Donate Now"}</span>
          </button>
        </div>
        <div className="flex flex-col gap-5 justify-center  text-blue-950 mb-10 mx-10">
          <span className="flex items-center gap-3"><BsCheckCircle /> Signup as a donor</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> go to donate cloth section</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> fill the required details</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> nearest volunteer will be informed through email</span>
          <span className="flex items-center gap-3"><BsCheckCircle /> volunteer will contact you at address provided or through phone number</span>

        </div>
        <ToastContainer position="top-left" />
      </div>
    </>
  );
};

export default ClothDonationForm;
