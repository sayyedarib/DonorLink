import React from "react";
import styles from "../styles/pages/volunteer.module.css";
import { useRouter } from "next/router";
import axios from "axios";
const Volunteer = () => {
  const router = useRouter();
  const query = router.query.volunteer;

  const handleAccept = async () => {
      const respose = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_UR}/api/order?respose=accept`)
  };

  const handleReject = async () => {};

  const handleCollect = async () => {};

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Location</th>
          <th>Date/Time</th>
          <th>Accept/Reject</th>
          <th>Collect</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>New York</td>
          <td>June 20, 2023 - 10:00 AM</td>
          <td>
            <button
              className={`${styles.button} ${styles.acceptButton}`}
              onClick={handleAccept}
            >
              Accept
            </button>
            <button
              className={`${styles.button} ${styles.rejectButton}`}
              onClick={handleReject}
            >
              Reject
            </button>
          </td>
          <td>
            <button
              className={`${styles.button} ${styles.collectButton}`}
              onClick={handleCollect}
            >
              Collect
            </button>
          </td>
          <td>Pending</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Volunteer;
