import React, { useState } from "react";
import styles from "../../styles/components/forms/commonStyle.module.css";
import axios from "axios";
import useGeoLocation from "hooks/useGeoLocation";
import BasicSelect from "../Select";
const ClothDonationForm = () => {
  const location = useGeoLocation();
  const [volunteers, setVolunteers] = useState([]);
  const [detail, setDetail] = useState({
    name: "",
    email: "",
    phone: "",
    quantity: "",
    address: "",
    message: "",
    coordinates: "",
  });

  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setDetail({
      ...detail,
      [name]: value,
      coordinates: `${
        location.loaded
          ? JSON.stringify(location.coordinates)
          : "Could not access the location"
      }`,
    });
  };

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         console.log("start checking response");
  //         const response = await axios.get(
  //           "http://localhost:3001/volunteers"
  //         );
  //         console.log("response ", response)
  //         const data = response.data;
  //         console.log(data);
  //         setVolunteers(data);
  //         return data;
  //       } catch (err) {
  //         console.log("error while fetching volunteers data ", err);
  //       }
  //     };
  //     fetchData();
  //   }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      console.log("start responsing");
      const response = await axios.post(
        "http://localhost:3001/clothDonation",
        detail,
        {
          withCredentials: true,
        }
      );

      // request to mail the form data
      console.log("sending mail");
      const emailResponse = await axios.post(
        "http://localhost:3001/sendMail",
        detail,
        {
          withCredentials: true,
        }
      );
      console.log("email response", emailResponse);

      console.log(response);
      setDetail({
        name: "",
        email: "",
        phone: "",
        quantity: "",
        address: "",
        message: "",
        coordinates: "",
      });
    } catch (err) {
      console.log("error while submitting cloth donation data", err);
    }
  };

  return (
    <>
      <div className={styles.body}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <h3>Donate Blood</h3>
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
              placeholder="Email"
              required
            />
            <input
              value={detail.phone}
              onChange={handleInput}
              type="number"
              name="phone"
              id="phone"
              placeholder="Phone number"
              required
            />


            <input
              value={detail.quantity}
              onChange={handleInput}
              type="number"
              name="quantity"
              id="quantity"
              placeholder="Quantity"
              required
            />
            <BasicSelect/>
            <textarea
              rows="5"
              value={detail.address}
              onChange={handleInput}
              type="text"
              name="address"
              id="address"
              placeholder="address"
            />
            <textarea
              rows="5"
              value={detail.message}
              onChange={handleInput}
              type="text"
              name="message"
              id="message"
              placeholder="Any message that you wanna give"
            />
            <input type="submit" value="Donate" onClick={handleClick} />
            <h6>
              {" "}
              your location is `$
              {location.loaded
                ? JSON.stringify(location)
                : "Please give locaion access"}
              `
            </h6>
          </form>
        </div>
      </div>
    </>
  );
};

export default ClothDonationForm;
