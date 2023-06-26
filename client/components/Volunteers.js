import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerCard from "./VolunteerCard";
import styles from "../styles/components/volunteers.module.css";
import ServiceCard from "./ServiceCard";

const Volunteers = ({ volunteerData }) => {
  return (
    <>
      <section className="bg-blue-50 flex flex-col text-white px-5 py-3 gap-20">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-blue-600">Star Volunteers</h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {volunteerData?.map((data) => {
            return (
              <>
                <VolunteerCard
                  key={data._id}
                  name={data?.name}
                  email={data?.email}
                  bio={data?.bio}
                  picture={
                    data.picture == ""
                      ? "/assets/images/fill-gap/boy.svg"
                      : data.picture
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
