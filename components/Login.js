import userContext from "@/context/auth/userContext";
import axios from "axios";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import "react-toastify/dist/ReactToastify.css";

export const SignUp = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);

  //states
  const [loader, setLoader] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLoginInput = (e) => {
    setUser({
      ...user,
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
        }
      );
      userContextDetail.updateUserData(response.data.profileData);
      setUser({
        email: userObject.email,
        picture: userObject.picture,
      });
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

    window?.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "dark",
        type: "standard",
        shape: "rectangular",
        text: "Sign in with Google",
        maxWidth: 380,
        width: "auto",
      }
    );

    google.accounts.id.prompt();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);

      const isValidEmail = validateEmail(user.email);
      setEmailValid(isValidEmail);
      setEmailErrorMessage(isValidEmail ? "" : "Invalid email format");
      if (!isValidEmail) {
        return;
      }

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login?loginType=manual`,
        loginUser,
        {
          withCredentials: true,
        }
      );
      setLoader(false);
      toast.success("Logged in successfully");
      userContextDetail.updateUserData(response.data.profileData);
      setUser({
        email: "",
        password: "",
      });
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
    <div>
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
              value={user.email}
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
              <div className="text-red-500 text-sm">{emailErrorMessage}</div>
            )}
          </label>

          <label htmlFor="password">
            <span className="font-medium text-slate-700 pb-2">Password</span>
            <input
              onChange={(e) => {
                handleLoginInput(e);
              }}
              value={user.password}
              id="password"
              name="password"
              type="password"
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter your password"
            />
          </label>

          <div className="flex flex-row justify-end">
            <div>
              <a href="#" className="font-semibold text-indigo-600">
                Forgot Password?
              </a>
            </div>
          </div>

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
        </div>
      </form>
    </div>
  );
};
