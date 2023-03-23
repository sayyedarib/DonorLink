import React, { useEffect, useState } from "react";
import axios from "axios";
import VolunteerCard from "./VolunteerCard";
import styles from "../styles/components/volunteers.module.css";
import { BACKEND_URL } from "next.config";

const Volunteers = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("start checking response");
        const response = await axios.get(`${BACKEND_URL}/volunteers`);
        console.log("response ", response);
        const data = response.data;
        console.log(data);
        setData(data);
        return data;
      } catch (err) {
        console.log("error while fetching volunteers data ", err);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <section className={styles.volunteerSection}>
        <h1>Our Volunteers</h1>
        <div>
          {data.map((data) => {
            console.log("volunteers data ", data);
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
