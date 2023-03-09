import Link from "next/link";
import React from "react";
import { BsArrowRightCircle } from "react-icons/bs";
import styles from '../styles/components/services.module.css'
const ServiceCard = ({service}) => {
  return (
    <>
      <div className={styles.serviceCard}>
        <span className={styles.icon}>{service.icon}</span>
        <h4 className={styles.title}>{service.title}</h4>
        <h6 className={styles.text}>{service.text}</h6>
        <Link href="/" className={styles.btn}>
          <BsArrowRightCircle size={30} />
        </Link>
      </div>
    </>
  );
};

export default ServiceCard;
