import React from 'react'
import styles from '../styles/components/services.module.css'
import Link from 'next/link'
import data from '../constants/data'
import ServiceCard from './ServiceCard'


const Services = () => {
  return (
    <>
      <section className={styles.services}>
<h3>Provide Help</h3>
<div className={styles.provideHelp}>
{data.provideHelpService.map(data=>{
    return(<>
<Link href={data.link}>

<ServiceCard service={data}/>
</Link>
    
    </>)
})}
</div>
<h3>Get Help</h3>
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
