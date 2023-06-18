import React, { useState, useEffect } from "react";
import styles from "../styles/components/records.module.css";

const Records = ({ data }) => {
  const [count, setCount] = useState({
    donations: 0,
    volunteers: 0,
    distributions: 0
  });

  useEffect(() => {
    const { donations, volunteers, distributions } = data;

    const interval = setInterval(() => {
      setCount(prevCount => {
        const newCount = {
          donations: prevCount.donations,
          volunteers: prevCount.volunteers,
          distributions: prevCount.distributions
        };

        if (newCount.donations < donations) {
          newCount.donations += 1;
        }

        if (newCount.volunteers < volunteers) {
          newCount.volunteers += 1;
        }

        if (newCount.distributions < distributions) {
          newCount.distributions += 1;
        }

        return newCount;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [data]);

  return (
    <>
      <section className={styles.recordsBody}>
        <h1>Records</h1>
        <div className={styles.recordsDetail}>
          <div className={styles.type}>
            <div className={styles.data}>{count.donations}+</div>
            <div className={styles.title}>Donations</div>
          </div>
          <div className={styles.type}>
            <div className={styles.data}>{count.volunteers}+</div>
            <div className={styles.title}>Volunteers</div>
          </div>
          <div className={styles.type}>
            <div className={styles.data}>{count.distributions}+</div>
            <div className={styles.title}>Distributed</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Records;
