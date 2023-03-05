import React from 'react'
import styles from '../styles/components/services.module.css'
import data from '../constants/data'
import ServiceCard from './ServiceCard'

const Services = () => {
  return (
    <>
      <section className={styles.services}>
<h2>Provide Help</h2>
<div className={styles.provideHelp}>
{data.provideHelpService.map(data=>{
    return(<>
<ServiceCard service={data}/>
    </>)
})}
</div>
<h2>Get Help</h2>
<div className={styles.getHelp}>
{data.getHelpService.map(data=>{
    return(<>
<ServiceCard service={data}/>
    </>)
})}
</div>
      </section>
    </>
  )
}

export default Services
