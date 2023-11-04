import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import useGeoLocation from "hooks/useGeoLocation";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi";

const SignUp = ({ auth }) => {
  const router = useRouter();
  const location = useGeoLocation();

  //states
  const [step, setStep] = useState(1);
  const [loader, setLoader] = useState(false);
  const [registerUser, setRegisterUser] = useState({
    type: "",
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
    picture: "",
    coordinates: "",
    bio: "",
    address: {
      custom: "",
      city: "",
      zip: "",
    },
  });

  const [emailValid, setEmailValid] = useState(true);
  const [emailErrorMessage, setEmailErrorMessage] = useState("");

  //google sigin callback function
  const handleCallBackResponse = async (res) => {
    if (step == 2) {
      setStep(1);
      return;
    }
    try {
      const userObject = jwt_decode(res.credential);
      setRegisterUser({
        ...registerUser,
        name: userObject.name,
        email: userObject.email,
        picture: userObject.picture,
      });
    } catch (error) {
      console.log("CL: error in if statemenet ", error);
    }
  };

  //google sign in propmt on page load and click on google sign in button
  useEffect(() => {
    window?.google?.accounts?.id?.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCallBackResponse,
    });

    window?.google?.accounts?.id?.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "dark",
        type: "standard",
        shape: "rectangular",
        text: "Sign up with Google",
        maxWidth: 380,
        width: "auto",
      },
    );

    google?.accounts?.id?.prompt();
  }, []);

  //handle image
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setRegisterUser({ ...registerUser, picture: base64 });
  };

  const getLocation = () => {
    // Check if geolocation is available in the browser
    if ("geolocation" in navigator) {
      // Request the user's location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update the coordinates in the registerUser state
          setRegisterUser((prevState) => ({
            ...prevState,
            coordinates: JSON.stringify({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }),
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          toast.error(
            "Failed to get your location. Please give access to location for getting in touch with you when needed.",
          );
        },
      );
    } else {
      toast.error("Geolocation is not available in your browser.");
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //handle registration
  const handleRegisterInput = (e) => {
    const { name, value } = e.target;

    // Check if the input is an email (only if the input is for the email field)
    if (name === "email") {
      const isValidEmail = validateEmail(value);
      setEmailValid(isValidEmail);
      setEmailErrorMessage(isValidEmail ? "" : "Invalid email format");
    }
    if (step === 1) {
      setRegisterUser({
        ...registerUser,
        [name]: value,
        coordinates: `${
          location.loaded ? JSON.stringify(location.coordinates) : ""
        }`,
      });
    } else if (step === 2) {
      if (name == "phone" || name == "bio") {
        setRegisterUser({ ...registerUser, [name]: value });
      } else {
        setRegisterUser((prevUser) => ({
          ...prevUser,
          address: {
            ...prevUser.address,
            [name]: value,
          },
        }));
      }
    }
  };

  const handleRegistration = async () => {
    console.log("register user ", registerUser);
    if (registerUser.password != registerUser.cpassword) {
      toast.error("password and confirm password mismatched");
      return;
    }
    if (
      registerUser.coordinates === "" ||
      registerUser.coordinates === "undefined"
    ) {
      toast.error(
        "please give access to location for getting in touch with you when needed",
      );
      getLocation();
      return;
    }
    try {
      setLoader(true);
      let url;
      if (registerUser?.type == "volunteer") {
        url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerRegistration`;
      } else {
        url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signUp`;
      }
      console.log("sending post request to ", url, " with data ", registerUser);
      const response = await axios.post(url, registerUser, {
        withCredentials: true,
      });
      if (response.status == 200) {
        toast.success("registration successfull");
        {
          registerUser.type == "volunteer" &&
            toast.success("verification link sent to your email");
        }
        
        localStorage.setItem("userData", JSON.stringify(registerUser));
        setRegisterUser({
          type: "",
          name: "",
          email: "",
          password: "",
          cpassword: "",
          phone: "",
          picture: "",
          coordinates: "",
          bio: "",
          address: {
            custom: "",
            city: "",
            zip: "",
          },
        });
        router.replace("/");
        setStep(1);

        setLoader(false);
      }
    } catch (error) {
      console.log("error in signup ", error);
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center mt-10 ">
        <div className="max-w-md lg:w-1/2 mx-auto px-8 py-3 mt-24 mb-16 bg-white span-8 rounded-xl shadow-lg shadow-blue-300">
          <div
            className="cursor-pointer"
            onClick={() => setStep((prevStep) => prevStep - 1)}
          >
            {step > 1 && (
              <BiArrowBack className="text-3xl bg-blue-900 text-white rounded-full p-2" />
            )}
          </div>
          <form action="" className="my-2">
            <div className="flex flex-col space-y-3">
              {step === 1 && (
                <>
                  <div className="flex gap-3 justify-center items-center">
                    <img
                      src={
                        registerUser.picture.length === 0
                          ? "/assets/images/fill-gap/boy.svg"
                          : registerUser.picture
                      }
                      className="w-24 rounded-full"
                    />
                    <div>
                      <label
                        htmlFor="picture"
                        className="p-2 bg-blue-700 rounded-md text-white cursor-pointer"
                      >
                        {registerUser.picture.length > 0
                          ? "Change Image"
                          : "Upload Image"}
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        id="picture"
                        name="picture"
                        className="p-4 bg-blue-700"
                        onChange={(e) => handleFileUpload(e)}
                        hidden
                        required
                      />
                    </div>
                  </div>
                  <ul className="text-sm flex justify-evenly font-medium text-blue-900 bg-white border border-blue-200 rounded-lg">
                    <li className=" border-b border-blue-200 sm:border-b-0">
                      <div className="flex items-center pl-3">
                        <input
                          onChange={handleRegisterInput}
                          id="donor-radio-id"
                          type="radio"
                          value="Donor"
                          name="type"
                          className="w-4 h-4"
                        />
                        <label
                          htmlFor="donor-radio-id"
                          className="w-full py-3 ml-2 text-sm font-medium text-blue-900"
                        >
                          Donor
                        </label>
                      </div>
                    </li>
                    <li className="border-b border-blue-200 sm:border-b-0">
                      <div className="flex items-center">
                        <input
                          onChange={handleRegisterInput}
                          id="volunteer-radio-id"
                          type="radio"
                          value="volunteer"
                          name="type"
                          className="w-4 h-4"
                        />
                        <label
                          htmlFor="volunteer-radio-id"
                          className="w-full py-3 ml-2 text-sm font-medium text-blue-900"
                        >
                          Volunteer
                        </label>
                      </div>
                    </li>
                    <li className=" border-b border-blue-200 sm:border-b-0">
                      <div className="flex items-center pl-3">
                        <input
                          onChange={handleRegisterInput}
                          id="needy-radio-id"
                          type="radio"
                          value="needy"
                          name="type"
                          className="w-4 h-4"
                        />
                        <label
                          htmlFor="needy-radio-id"
                          className="w-full py-3 ml-2 text-sm font-medium text-blue-900"
                        >
                          Needy
                        </label>
                      </div>
                    </li>
                  </ul>

                  <label htmlFor="name">
                    <span className="font-medium text-slate-700 pb-2">
                      Name
                    </span>
                    <input
                      onChange={handleRegisterInput}
                      value={registerUser.name}
                      id="name"
                      name="name"
                      type="text"
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Enter name here"
                    />
                  </label>
                  <label htmlFor="email">
                    <span className="font-medium text-slate-700 pb-2">
                      Email address
                    </span>
                    <input
                      onChange={(e) => {
                        handleRegisterInput(e);
                      }}
                      value={registerUser.email}
                      id="email"
                      name="email"
                      type="email"
                      className={`w-full py-3 border ${
                        !emailValid ? "border-red-500" : "border-slate-200"
                      } rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow`}
                      placeholder="Enter email address"
                      required
                    />
                    {!emailValid && (
                      <div className="text-red-500 text-sm">
                        {emailErrorMessage}
                      </div>
                    )}
                  </label>

                  <label htmlFor="password">
                    <span className="font-medium text-slate-700 pb-2">
                      Password
                    </span>
                    <input
                      onChange={(e) => {
                        handleRegisterInput(e);
                      }}
                      value={registerUser.password}
                      id="password"
                      name="password"
                      type="password"
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Enter your password"
                    />
                  </label>
                  <label htmlFor="cpassword">
                    <span className="font-medium text-slate-700 pb-2">
                      Confirm Password
                    </span>
                    <input
                      onChange={handleRegisterInput}
                      value={registerUser.cpassword}
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Enter your confirm-password"
                    />
                  </label>
                </>
              )}

              {step === 2 && (
                <>
                  <label htmlFor="phone">
                    <span className="font-medium text-slate-700 pb-2">
                      Phone number
                    </span>
                    <input
                      onChange={handleRegisterInput}
                      value={registerUser.phone}
                      id="phone"
                      name="phone"
                      type="number"
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Enter phone number here"
                      required
                    />
                  </label>
                  {registerUser?.type == "volunteer" && (
                    <label htmlFor="bio">
                      <span className="font-medium text-slate-700 pb-2">
                        Bio
                      </span>
                      <textarea
                        onChange={handleRegisterInput}
                        value={registerUser.bio}
                        id="bio"
                        name="bio"
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Write something about yourself"
                      />
                    </label>
                  )}
                  <label htmlFor="address">
                    <span className="font-medium text-slate-700 pb-2">
                      Address
                    </span>
                    <textarea
                      onChange={handleRegisterInput}
                      value={registerUser.address.custom}
                      id="address"
                      name="custom"
                      className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                      placeholder="Enter your address here"
                    />
                  </label>

                  <div className="flex gap-4">
                    <label htmlFor="city">
                      <span className="font-medium text-slate-700 pb-2">
                        City
                      </span>
                      <input
                        onChange={handleRegisterInput}
                        value={registerUser.address.city}
                        id="city"
                        name="city"
                        type="text"
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Enter city name here"
                      />
                    </label>
                    <label htmlFor="zip">
                      <span className="font-medium text-slate-700 pb-2">
                        Pin Code
                      </span>
                      <input
                        onChange={handleRegisterInput}
                        value={registerUser.address.zip}
                        id="zip"
                        name="zip"
                        type="number"
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                        placeholder="Enter pin/zip code here"
                      />
                    </label>
                  </div>
                </>
              )}

              <button
                type="button"
                onClick={(e) => {
                  if (step == 2) {
                    handleRegistration();
                    return;
                  } else if (step == 1) {
                    if (registerUser.type == "") {
                      toast.error(
                        "please select user type: Donor, voulunteer, Needy",
                      );
                      return;
                    } else {
                      setStep(2);
                      setLoader(false);
                      return;
                    }
                  }
                }}
                className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center"
              >
                <span>
                  {step === 2 ? (
                    "Register"
                  ) : loader ? (
                    <img
                      src="/assets/images/fill-gap/loader.gif"
                      alt="loader_img"
                    />
                  ) : (
                    "Next"
                  )}
                </span>
              </button>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <span className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </span>
              </div>
              <div className="my-5 flex items-center justify-center">
                <div id="signInDiv"></div>
              </div>
            </div>
          </form>
        </div>
        <div className="hidden w-1/2 lg:block">
          <img src="/assets/images/fill-gap/auth.webp" alt="auth_vector" />
        </div>
        <ToastContainer position="top-left" />
      </div>
    </>
  );
};

export default SignUp;
