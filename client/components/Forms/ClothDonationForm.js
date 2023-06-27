import React, { useState, useContext} from "react";
import axios from "axios";
import useGeoLocation from "hooks/useGeoLocation";
import userContext from "@/context/auth/userContext";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const ClothDonationForm = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  console.log("userContextDetail.userStateData.name ", userContextDetail.userStateData);
  if (!userContextDetail.userStateData.name) {
    router.replace("/auth");
  };
  
  const location = useGeoLocation();
  const [detail, setDetail] = useState({
    name: userContextDetail.userStateData.name,
    email: userContextDetail.userStateData.email,
    phone: userContextDetail.userStateData?.phone ? userContextDetail.userStateData?.phone : "",
    quantity: "",
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clothDonation`,
        detail,
        {
          withCredentials: true,
        }
      );

      toast.success("Thank you for donation");
      toast.success("Nearby volunteer has been notified");
      console.log(response);
      setDetail({
        name: "",
        email: "",
        phone: "",
        quantity: "",
        address: "",
        message: "",
        coordinates: "",
      });

      router.replace("/");
    } catch (err) {
      console.log("error while submitting cloth donation data", err);
    }
  };

  return (
    <>
      <div className="lg:w-[28rem] p-8 my-10 bg-white rounded-xl shadow-xl shadow-blue-900">
        <h1 className="text-center text-blue-800 font-bold text-2xl">Cloth Donation</h1>
        <form action="" className="mt-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="quantity">
              <span className="font-medium text-slate-700 pb-2">Pairs of cloth</span>
              <input
                onChange={handleInput}
                value={detail.quantity}
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
    </>
  );
};

export default ClothDonationForm;
