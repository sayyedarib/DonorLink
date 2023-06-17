import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerCard from "./VolunteerCard";
import styles from "../styles/components/volunteers.module.css";

const Volunteers = ({volunteerData}) => {

  return (
    <>
      <section className={styles.volunteerSection}>
        <h1>Our Volunteers</h1>
        <div>
          {volunteerData?.map((data) => {
            return (
              <VolunteerCard
                key={data._id}
                name={data.name}
                email={data.email}
                bio={data.bio}
                picture={
                  data.picture == ""
                    ? "/assets/images/fill-gap/boy.svg"
                    : data.picture
                }
                link="/"
              />
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Volunteers;
