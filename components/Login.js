import contexts from "@/context/contexts";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter();
  const context = useContext(contexts);

  //states
  const [loader, setLoader] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginInput = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCallBackResponse = async (response) => {
    const userObject = jwt_decode(response.credential);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login?loginType=google`,
        userObject,
        {
          withCredentials: true,
        },
      );
      context.updateUserData(response.data.profileData);
      setUserData({
        email: userObject.email,
        picture: userObject.picture,
      });
      localStorage.setItem("userData", JSON.stringify(userData));
      toast.success("logged in successfully");
      router.replace(router?.query?.prevPath ? router?.query?.prevPath : "/");
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        toast.error(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    window?.google?.accounts?.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      callback: handleCallBackResponse,
    });

    window?.google?.accounts?.id?.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "dark",
        type: "standard",
        shape: "rectangular",
        text: "Sign in with Google",
        maxWidth: 380,
        width: "auto",
      },
    );

    google?.accounts?.id?.prompt();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const isValidEmail = validateEmail(userData.email);
      setEmailValid(isValidEmail);
      console.log("handle login called");
      // setEmailErrorMessage(isValidEmail ? "" : "Invalid email format");
      if (!isValidEmail) {
        return;
      }
      console.log("handle login called 2");
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login?loginType=manual`,
        userData,
        {
          withCredentials: true,
        },
      );
      console.log("handle login called 3");
      setLoader(false);
      toast.success("Logged in successfully");
      localStorage.setItem(
        "userData",
        JSON.stringify(response.data.profileData),
      );
      context.updateUserData(response.data.profileData);
      setUserData({
        email: "",
        password: "",
      });
      contexts.updatePopupState();
      router.replace(router?.query?.prevPath ? router?.query?.prevPath : "/");
    } catch (error) {
      setLoader(false);
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
    <div className="flex flex-col max-w-md lg:w-1/2 mx-auto px-8 py-6 mt-24 mb-16 bg-white span-8 rounded-xl shadow-lg shadow-blue-300">
      <div
        onClick={context.updatePopupState}
        className="flex flex-col items-end justify-end w-full cursor-pointer"
      >
        X
      </div>
      <form action="" className="my-2">
        <div className="flex flex-col space-y-3">
          <label htmlFor="email">
            <span className="font-medium text-slate-700 pb-2">
              Email address
            </span>
            <input
              onChange={(e) => {
                handleLoginInput(e);
              }}
              value={userData.email}
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
              <div className="text-red-500 text-sm">invalid email</div>
            )}
          </label>

          <label htmlFor="password">
            <span className="font-medium text-slate-700 pb-2">Password</span>
            <input
              onChange={(e) => {
                handleLoginInput(e);
              }}
              value={userData.password}
              id="password"
              name="password"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter your password"
            />
          </label>

          <button
            type="button"
            onClick={handleLogin}
            className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <span>
              {loader ? (
                <img
                  src="/assets/images/fill-gap/loader.gif"
                  alt="loader_img"
                />
              ) : (
                "Login"
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
          <div className="flex flex-col items-end justify-end">
            <span className="font-normal text-sm">
              Don't have an account!{" "}
              <a href="/auth" className="font-medium text-base text-indigo-600">
                SignUp
              </a>
            </span>
            <a href="#" className="font-normal text-md text-indigo-600">
              Forgot Password?
            </a>
          </div>
        </div>
      </form>
      <ToastContainer position="top-left" />
    </div>
  );
};

export default Login;
