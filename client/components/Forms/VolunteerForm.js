import React, { useState } from "react";
import styles from "../../styles/components/Forms/volunteer.module.css";
import axios from "axios";


const VolunteerForm = () => {
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetail({ ...detail, [name]: value });
  };

const handleClick=async (e)=>{
e.preventDefault();
try{
const response = await axios.post('http://localhost:3001/volunteerRegistration', detail, {
  withCredentials:true,
});
setDetail({    name: "",
email: "",
phone: "",
bio: "",
address: ""})

}catch(err){
  console.log("error while submitting volunteer registration form",err)
}
};

  return (
    <>
      <div className={styles.body}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <h1>Registration Form</h1>
          <form method="post" className={styles.form}>
            <input
              value={detail.name}
              onChange={handleInput}
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
            <input
              value={detail.email}
              onChange={handleInput}
              type="email"
              name="email"
              id="email"
              placeholder="email"
              required
            />
            <input
              value={detail.phone}
              onChange={handleInput}
              type="number"
              name="phone"
              id="phone"
              placeholder="phone number"
              required
            />
            <textarea
            rows="5"
              value={detail.bio}
              onChange={handleInput}
              type="text"
              name="bio"
              id="bio"
              placeholder="write something about your self"
            />
            <textarea
            rows="5"
              value={detail.address}
              onChange={handleInput}
              type="text"
              name="address"
              id="address"
              placeholder="address"
            />
            <input type="submit" onClick={handleClick} />
          </form>
        </div>
      </div>
    </>
  );
};

export default VolunteerForm;
