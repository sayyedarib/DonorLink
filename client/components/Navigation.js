import Link from 'next/link'
import styles from '../styles/components/navigation.module.css'
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Navbar = () => {
  return (
    <nav className={styles.nav}>
    <input type="checkbox" className={styles.check} />
    <label htmlFor="check" className={styles.checkbtn}>
    <FontAwesomeIcon icon={faBars}/>
    </label>
    <label className={styles.logo}>DonorLink</label>
    <ul>
      <li><Link className={styles.active} href="/">Home</Link></li>
      <li><Link className={styles.link} href="/">About</Link></li>
      <li><Link className={styles.link} href="/">Services</Link></li>
      <li><Link className={styles.link} href="/">Contact</Link></li>
    </ul>
  </nav>
  )
}

export default Navbar
