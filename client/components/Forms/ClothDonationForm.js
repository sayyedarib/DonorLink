import React, { useState, useContext, useEffect } from "react";
import styles from "../../styles/components/Forms/commonStyle.module.css";
import axios from "axios";
import useGeoLocation from "hooks/useGeoLocation";
import userContext from "@/context/auth/userContext";
import { useRouter } from "next/router";
const ClothDonationForm = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  console.log("userContextDetail.userStateData.name ", userContextDetail.userStateData);
  if (userContextDetail.userStateData.name === "") {
    router.replace("/auth");
  }
  const location = useGeoLocation();
  const [volunteers, setVolunteers] = useState([]);
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

      // request to mail the form data
      // console.log("sending mail");
      // const emailResponse = await axios.post(
      //   `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/sendMail`,
      //   detail,
      //   {
      //     withCredentials: true,
      //   }
      // );
      // console.log("email response", emailResponse);

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
      const prevPath = JSON.parse(localStorage.getItem('prevPath')) || { url: '/' };
      router.replace(prevPath.url);
    } catch (err) {
      console.log("error while submitting cloth donation data", err);
    }
  };

  return (
    <>
      {/* <div className={styles.body}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <h3>Donate Cloth</h3>
          <form method="post" className={styles.form}>
            <input
              value={detail.name}
              onChange={handleInput}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
            <input
              value={detail.email}
              onChange={handleInput}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
            />
            <input
              value={detail.phone}
              onChange={handleInput}
              type="number"
              name="phone"
              id="phone"
              placeholder="phone number"
              required
            />
            <input
              value={detail.quantity}
              onChange={handleInput}
              type="number"
              name="quantity"
              id="quantity"
              placeholder="pairs of cloth"
              required
            />

            <textarea
              rows="5"
              value={detail.address}
              onChange={handleInput}
              type="text"
              name="address"
              id="address"
              placeholder="address"
            />
            <textarea
              rows="5"
              value={detail.message}
              onChange={handleInput}
              type="text"
              name="message"
              id="message"
              placeholder="any message that you wanna give"
            />
            <input type="submit" value="Donate" onClick={handleDonate} />
            <h6>
              {" "}
              your location is `$
              {location.loaded
                ? JSON.stringify(location)
                : "Please give locaion access"}
              `
            </h6>
          </form>
        </div>
      </div> */}
      <div className="max-w-md mx-auto p-8 my-10 bg-white span-8 rounded-xl shadow shadow-slate-300">
        <h1 className="text-center text-blue-800 font-bold text-2xl">Cloth Donation Form</h1>
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
