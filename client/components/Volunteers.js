import React, { useEffect, useState } from "react";
import VolunteerCard from "./cards/VolunteerCard";

const Volunteers = ({ volunteerData }) => {
  return (
    <>
      <section className="bg-blue-50 flex flex-col text-white px-5 py-3 gap-20">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-blue-600">Our Volunteers</h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {volunteerData?.map((data) => {
            return (
              <>
                <VolunteerCard
                  key={data._id}
                  name={data?.profile?.name}
                  email={data?.profile?.email}
                  bio={data?.profile?.bio}
                  phone={data?.profile?.phone}
                  picture={
                    data?.profile?.picture == ""
                      ? "/assets/images/fill-gap/boy.svg"
                      : data?.profile?.picture
                  }
                  link="/"
                />
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Volunteers;
