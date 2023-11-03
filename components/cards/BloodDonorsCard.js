import React, { useState } from "react";

const BloodDonorsCard = ({ data }) => {
  return (
    <>
      <div className="relative flex w-[22rem] md:w-96 p-7 h-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
        <h5 className="mb-2 block font-sans text-black text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {data?.donor?.profile?.name}
        </h5>
        <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          <span className="font-bold">Phone: </span>{" "}
          {data?.donor?.profile?.phone}
        </span>
        <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          <span className="font-bold">Email: </span>{" "}
          {data?.donor?.profile?.email}
        </span>
        <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          <span className="font-bold">Distance: </span> {data?.distance}km
        </span>
        <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
          <span className="font-bold">Address: </span>{" "}
          {data?.donor?.profile?.address?.custom +
            ", " +
            data?.donor?.profile?.address?.city +
            ", " +
            data?.donor?.profile?.address?.zip}
        </span>
      </div>
    </>
  );
};

export default BloodDonorsCard;
