import React, { useContext } from "react";
import styles from "../styles/pages/volunteer.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import userContext from "@/context/auth/userContext";

const Volunteer = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);
  const works = userContextDetail.userStateData.database;

  const handleDecision = async (id, answer) => {
    console.log("works ", works);

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order?response=${answer}`,
      { email: userContextDetail.userStateData.email, workId: id },
      {
        withCredentials: true,
      }
    );
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Location</th>
          <th>Quantity</th>
          <th>Accept/Reject</th>
          <th>Collect</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {works.works.map((data) => {
          return (
            <tr>
              <td>{data.workDetails.address}</td>
              <td>{data.workDetails.quantity}</td>
              <td>
                {data.accepted ? (
                  <button
                    className={`${styles.button} ${styles.acceptButton}`}
                    disabled={true}
                  >
                    Accepted
                  </button>
                ) : data.rejected?null:(
                  <button
                    className={`${styles.button} ${styles.acceptButton}`}
                    onClick={() => handleDecision(data._id, "accept")}
                  >
                    Accept
                  </button>
                )}
                {data.rejected? (
                  <button
                    className={`${styles.button} ${styles.rejectButton}`}
                    onClick={() => handleDecision(data._id, "reject")}
                    disabled={true}
                  >
                    Rejected
                  </button>
                ):data.accepted?null:data.collected?null:
                <button
                className={`${styles.button} ${styles.rejectButton}`}
                onClick={() => handleDecision(data._id, "reject")}
              >
                Reject
              </button>
                }
              </td>
              <td>
                <button
                  className={`${styles.button} ${styles.collectButton}`}
                  onClick={() => handleDecision(data._id, "collected")}
                >
                  Collect
                </button>
              </td>
              <td>
                {(data.rejected && "rejected") ||
                  (data.collected && "collected") ||
                  (data.accepted && "accepted")}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Volunteer;
