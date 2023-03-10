import React from 'react'
import Link from 'next/link'
const OraganizationCard = ({name, email, about, img, link}) => {
  return (
    <>
              <div className={styles.oraganizationCard}>
      <Link href={link}>
          <img src={img} alt="volunteer_image not found" />
          <h2>{name}</h2>
          <h3>{email}</h3>
          <h6>{about}</h6>
      </Link>
        </div>
    </>
  )
}

export default OraganizationCard
