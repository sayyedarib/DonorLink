import React from 'react'
import styles from "../styles/components/signuppage.module.css";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
const Signuppage = () => {
  return (
<>
<div className={styles.container}>
    <div>
<img src="signup.png" alt="Image" style={{borderRadius:"110px"}}></img>
</div>
<div className={styles.formcontainer}>
    <h1>Sign up</h1>
<TextField id="outlined-basic" label="Email" variant="outlined" />
<br></br>
<TextField id="outlined-basic" label="Password" variant="outlined" />
<br></br>
<TextField id="outlined-basic" label="Confirm Password" variant="outlined" />
<br></br>
<Button variant="contained" color="success" href="#contained-buttons">
        Submit
      </Button>
</div>
</div>

</> 
  )
}

export default Signuppage
