import React, { useContext } from "react";
// import styles from "../styles/components/header.module.css";
import Link from "next/link";
import axios from "axios";
import jwt_decode from "jwt-decode";
import userContext from "@/context/auth/userContext";


const Header = () => {
  const userContextDetail = useContext(userContext);

  return (
    <>
      <header className="bg-blue-50 flex flex-wrap-reverse sm:flex-nowrap px-10 lg:px-20 text-left justify-center items-center h-[85vh] content-center">
        <div className="w-auto sm:w-1/2 flex flex-col gap-2 sm:gap-6 md:gap-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700">Who we are?</h1>
          <h2 className="">
            We are a platform of donation that bridge the gap between willing donors and needy people maintining the trust with 100% transparency. Join us as volunteer, donor
            or peoole of need.
          </h2>
          <div className="flex gap-4 flex-wrap">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Support</button>
            <Link href="/auth?register=true">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Join Us</button>
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <img src="/assets/images/img/donation_img.webp" alt="donation_img" />
        </div>
      </header>
    </>
  );
};

export default Header;
