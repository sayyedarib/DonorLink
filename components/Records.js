import React, { useState, useEffect } from "react";
import styles from "../styles/components/records.module.css";

const Records = ({ data }) => {
  return (
    <>
      <section className="bg-blue-50 flex flex-col text-blue-400 font-bold px-5 py-3 gap-16 mb-16">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-blue-600">Records</h1>
        <div className="flex flex-wrap gap-8 justify-evenly text-3xl">
          <div className={styles.type}>
            <div className={styles.data}>{data?.donations}+</div>
            <div className={styles.title}>Donations</div>
          </div>
          <div className={styles.type}>
            <div className={styles.data}>{data?.volunteers}+</div>
            <div className={styles.title}>Volunteers</div>
          </div>
          <div className={styles.type}>
            <div className={styles.data}>{data?.distributions}+</div>
            <div className={styles.title}>Distributed</div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Records;
