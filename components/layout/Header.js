import React from "react";
import Link from "next/link";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FaCopy } from "react-icons/fa";

const Header = () => {
  const [qrPopup, setQrPopup] = useState(false);

  const handleCopy = () => {
    const paymentDetails = "sayyedaribhussain4321@okhdfcbank";
    navigator.clipboard.writeText(paymentDetails);
  };

  return (
    <>
      <header className="bg-blue-50 flex flex-wrap-reverse sm:flex-nowrap px-10 lg:px-20 mt-4 text-left justify-center items-center h-[80vh] content-center">
        <div className="w-auto sm:w-1/2 flex flex-col gap-2 sm:gap-6 md:gap-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-blue-700">
            Who we are?
          </h1>
          <h2 className="">
            We are a platform of donation that bridge the gap between willing
            donors and needy people maintaining the trust with 100%
            transparency. Join us as a volunteer, donor, or people in need.
          </h2>
          <div className="flex gap-4 flex-wrap">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
              onClick={() => setQrPopup(true)}
            >
              Support
            </button>
            <Link href="/auth?register=true">
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">
                Join Us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full sm:w-1/2">
          <img src="/assets/images/img/donation_img.webp" alt="donation_img" />
        </div>
      </header>
      {qrPopup && (
        <div className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="relative p-7 bg-white">
            <span
              className="absolute right-2 top-2 cursor-pointer"
              onClick={() => setQrPopup(false)}
            >
              <AiFillCloseCircle className="text-2xl" />
            </span>
            <img
              src="/assets/images/img/QR.png"
              alt="QR"
              className="w-96 h-96"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-white text-black text-center py-3">
              <span className="p-3">
                <b>UPI ID</b>:sayyedaribhussain4321@okhdfcbank
              </span>
              <button
                className="bg-blue-700 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mt-3"
                onClick={handleCopy}
              >
                <div className="flex items-center">
                  <FaCopy className="mr-2" />
                  <span>Copy</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
