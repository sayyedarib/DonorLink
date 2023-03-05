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
    <label className={styles.logo}>Navbar</label>
    <ul>
      <li><Link className={styles.active} href="/">Home</Link></li>
      <li><Link href="/">About</Link></li>
      <li><Link href="/">Services</Link></li>
      <li><Link href="/">ContactUs</Link></li>
    </ul>
  </nav>
  )
}

export default Navbar
