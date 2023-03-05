import React from 'react'

const OraganizationCard = ({name, email, about, img, link}) => {
  return (
    <>
              <div className={styles.oraganizationCard}>
      <Link href={link}>
          <img src={img} alt="volunteer_image not found" />
          <h2>{name}</h2>
          <h3>{email}</h3>
          <p>{about}</p>
      </Link>
        </div>
    </>
  )
}

export default OraganizationCard
