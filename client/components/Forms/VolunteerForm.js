import React, { useState } from "react";
import styles from "../../styles/components/forms/commonStyle.module.css";
import axios from "axios";
import useGeoLocation from "hooks/useGeoLocation";

const VolunteerForm = () => {

  const location = useGeoLocation();
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    address: "",
    coordinates:""
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetail({ ...detail, [name]: value,coordinates:`${location.loaded
      ? JSON.stringify(location.coordinates)
      : "Could not access the location"}` });
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
address: "",
coordinates:""})

}catch(err){
  console.log("error while submitting volunteer registration form",err)
}
};

  return (
    <>
      <div className={styles.body}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <h3>Registration Form</h3>
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
