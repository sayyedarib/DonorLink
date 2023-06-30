import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import userContext from "@/context/auth/userContext";
import useGeoLocation from "hooks/useGeoLocation";
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { BiArrowBack } from "react-icons/bi"

const AuthPopup = ({ auth }) => {
    const router = useRouter();
    const location = useGeoLocation();
    const userContextDetail = useContext(userContext);
    const [step, setStep] = useState(1);
    const [register, setRegister] = useState(false);


    const [loginUser, setLoginUser] = useState({
        email: "",
        password: "",
    });

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

    useEffect(() => {
        console.log("register signUp ", register);
    }, [register]);

    const handleCallBackResponse = async (res) => {
        try {
            console.log("register", register)
            const userObject = jwt_decode(res.credential);
            setRegisterUser({ ...registerUser, name: userObject.name, email: userObject.email, picture: userObject.picture });
            if (!register) {
                try {
                    const response = await axios.post(
                        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login?loginType=google`,
                        userObject,
                        {
                            withCredentials: true,
                        }
                    );
                    console.log("CL: response authpopup check if email is signed up ", response);
                    userContextDetail.updateUserData(response.data.userData);
                    setLoginUser({
                        email: userObject.email,
                        picture: userObject.picture,
                    })
                    localStorage.setItem("userData", JSON.stringify({
                        name: userObject.name,
                        email: userObject.email,
                        picture: userObject.picture,
                    }));
                    toast.success("logged in successfully")
                    const prevPath = JSON.parse(localStorage.getItem('prevPath')) || { url: '/' };
                    router.replace(prevPath.url);
                } catch (error) {
                    if (
                        error.response &&
                        error.response.status >= 400 &&
                        error.response.status <= 500
                    ) {
                        toast.error(error.response.data.message);
                        setRegister(true);
                    }
                }
            }
            else {
                return;
            }
        } catch (error) {
            console.log("CL: error in if statemenet ", error);
        }
    };
    

    //google sign in
    useEffect(() => {
        // global google
        google.accounts.id.initialize({
            client_id:
                "587921623953-23fr6m7muhh45pf3j36rvi0lvmfse4aj.apps.googleusercontent.com",
            callback: handleCallBackResponse,
        });

        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
            theme: "dark",
            type: "standard",
            shape: "rectangular",
            text: "Sign in with Google",
            maxWidth: 380,
            width: "auto"
        });

        google.accounts.id.prompt();
    }, [register]);

    //handle image
    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        console.log(base64);
        setDetail({ ...detail, picture: base64 });
    };

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



    //handle input fields
    let name, value;
    const handleLoginInput = (e) => {
        console.log("CL: login user ", loginUser, "register ", register);
        name = e.target.name;
        value = e.target.value;
        setLoginUser({
            ...loginUser,
            [name]: value,
        });
    };

    const handleRegisterInput = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        console.log("register user ", registerUser);

        if (step === 1) {
            setRegisterUser({
                ...registerUser, [name]: value, coordinates: `${location.loaded
                    ? JSON.stringify(location.coordinates)
                    : "Could not access the location"
                    }`
            });
        } else if (step === 2) {
            if (name == "phone" || name == "bio") {
                setRegisterUser({ ...registerUser, [name]: value });
            }
            else {
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


    const handleLogin = async (e) => {
        console.log("handleLogin");
        e.preventDefault();

        try {
            console.log("start response");
            console.log("CL: loginUser ", loginUser);
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login?loginType=manual`,
                loginUser,
                {
                    withCredentials: true,
                }
            );
            console.log("login response", response);
            // request to mail the form data
            setLoginUser({
                email: "",
                password: "",
            });

            userContextDetail.updateUserData(response.data.userData);
            toast.success("Logged in successfully");
            const prevPath = JSON.parse(localStorage.getItem('prevPath')) || { url: '/' };
            router.replace(prevPath.url);
        }
        catch (error) {
            console.log("CL: error while login data ", error);
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                toast.error(error.response.data.message);
            }
        }
    };

    const handleRegistration = async () => {
        if (registerUser.password != registerUser.cpassword) {
            toast.error("password and confirm password mismatched");
            return;
        }
        try {
            console.log("CL: pages-authPop-handleRegistration-register type ", registerUser.type);
            const url = registerUser.type === "Donor" ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/signUp` : `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/volunteerRegistration`;
            console.log("CL:component-Athpopup-url", url);
            console.log("CL: register user data ", registerUser);
            const response = await axios.post(
                url,
                registerUser,
                {
                    withCredentials: true,
                }
            );

            toast.success("registration successfull");
            { registerUser.type == "Volunteer" && toast.success("verification link sent to your email") }
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
            setRegister(false);
            setStep(1);
            router.replace("/auth")
        } catch (error) {
            console.log("CL: error while login data ", error);
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
            <div className="">
                <div className="max-w-md mx-auto px-8 py-3 mt-32 mb-16 bg-white span-8 rounded-xl shadow shadow-slate-300">
                    {/* <div className="flex justify-center items-center text-blue-700 font-bold text-3xl">
                            {register?:"Login"}
                    </div> */}
                    <div className="cursor-pointer" onClick={() => setStep(prevStep => prevStep - 1)}>
                        {step > 1 && <BiArrowBack className="text-3xl bg-blue-900 text-white rounded-full p-2" />}
                    </div>
                    <form action="" className="my-10">
                        <div className="flex flex-col space-y-5">
                            {step === 1 && (
                                <>
                                    {register && (<>
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
                                                    <label htmlFor="donor-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-blue-900">
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
                                                        value="Volunteer"
                                                        name="type"
                                                        className="w-4 h-4"
                                                    />
                                                    <label htmlFor="volunteer-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-blue-900">
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
                                                    <label htmlFor="needy-radio-id" className="w-full py-3 ml-2 text-sm font-medium text-blue-900">
                                                        Needy
                                                    </label>
                                                </div>
                                            </li>
                                        </ul>


                                        <label htmlFor="name">
                                            <span className="font-medium text-slate-700 pb-2">Name</span>
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
                                    </>
                                    )}

                                    <label htmlFor="email">
                                        <span className="font-medium text-slate-700 pb-2">Email address</span>
                                        <input
                                            onChange={(e) => { if (register) { handleRegisterInput(e) } else { handleLoginInput(e) } }}
                                            value={register ? registerUser.email : loginUser.email}
                                            id="email"
                                            name="email"
                                            type="email"
                                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                            placeholder="Enter email address"
                                        />
                                    </label>

                                    <label htmlFor="password">
                                        <span className="font-medium text-slate-700 pb-2">Password</span>
                                        <input
                                            onChange={(e) => { if (register) { handleRegisterInput(e) } else { handleLoginInput(e) } }}
                                            value={register ? registerUser.password : loginUser.password}
                                            id="password"
                                            name="password"
                                            type="password"
                                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                            placeholder="Enter your password"
                                        />
                                    </label>

                                    {register && (
                                        <label htmlFor="cpassword">
                                            <span className="font-medium text-slate-700 pb-2">Confirm Password</span>
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
                                    )}


                                    {!register && <div className="flex flex-row justify-between">
                                        <div>
                                            {/* <label for="remember" className="">
                                        <input onChange={handleLoginInput} value={loginUser.email} type="checkbox" id="remember" className="w-4 h-4 border-slate-200 focus:bg-indigo-600" />
                                        Remember me
                                    </label> */}
                                        </div>
                                        <div>
                                            <a href="#" className="font-semibold text-indigo-600">Forgot Password?</a>
                                        </div>
                                    </div>}
                                    <button type="button" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center">
                                        <span onClick={(e) => { if (register && step == 2) { handleRegistration(); console.log("1nm"); } else if (register && step == 1) { if (registerUser.type == "") { toast.error("please select user type: Donor, voulunteer, Needy"); console.log("next clicked ", registerUser.type) } else { setStep(2) }; console.log("next clicked 2", registerUser.type) } else { handleLogin(e); console.log("next clicked 3", registerUser.type) } }}>{register ? (step === 2 ? "Register" : "Next") : "Login"}</span>
                                    </button>
                                    <div
                                        className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <span
                                            className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                            OR
                                        </span>
                                    </div>
                                    <div className="my-5 flex items-center justify-center">
                                        <div id="signInDiv"></div>
                                    </div>
{register?                                    <span className="text-center"> Already a user ! <span className="text-indigo-600 font-medium inline-flex space-x-1 items-center hover:cursor-pointer" onClick={() => { setRegister(false)}}>Login</span></span>:
                                    <span className="text-center"> Don't have an account ! <span className="text-indigo-600 font-medium inline-flex space-x-1 items-center hover:cursor-pointer" onClick={() => { setRegister(true)}}>SignUp</span></span>}
                                </>)}
                            {step === 2 && register && (
                                <>
                                    <label htmlFor="phone">
                                        <span className="font-medium text-slate-700 pb-2">Phone number</span>
                                        <input
                                            onChange={handleRegisterInput}
                                            value={registerUser.phone}
                                            id="phone"
                                            name="phone"
                                            type="number"

                                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                            placeholder="Enter phone number here"
                                        />
                                    </label>
                                    {registerUser?.type == "Volunteer" && <label htmlFor="bio">
                                        <span className="font-medium text-slate-700 pb-2">Bio</span>
                                        <textarea
                                            onChange={handleRegisterInput}
                                            value={registerUser.bio}
                                            id="bio"
                                            name="bio"
                                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                            placeholder="Write something about yourself"
                                        />
                                    </label>}
                                    <label htmlFor="address">
                                        <span className="font-medium text-slate-700 pb-2">Address</span>
                                        <textarea
                                            onChange={handleRegisterInput}
                                            value={registerUser.address.custom}
                                            id="address"
                                            name="custom" // Update the name attribute
                                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                            placeholder="Enter your address here"
                                        />

                                    </label>

                                    <div className="flex gap-4">
                                        <label htmlFor="city">
                                            <span className="font-medium text-slate-700 pb-2">City</span>
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
                                            <span className="font-medium text-slate-700 pb-2">Pin Code</span>
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
                                    <button type="button" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center">
                                        <span onClick={(e) => { if (register && step == 2) { handleRegistration(); console.log("1nm"); } else if (register && step == 1) { if (registerUser.type == "") { toast.error("please select user type: Donor, voulunteer, Needy"); console.log("next clicked ", registerUser.type) } else { setStep(2) }; console.log("next clicked 2", registerUser.type) } else { handleLogin(e); console.log("next clicked 3", registerUser.type) } }}>{register ? (step === 2 ? "Register" : "Next") : "Login"}</span>
                                    </button>

                                </>
                            )
                            }

                        </div>
                    </form>
                </div>
                <ToastContainer position="top-left" />
            </div>
        </>
    );
}

export default AuthPopup