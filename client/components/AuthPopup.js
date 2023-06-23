import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import userContext from "@/context/auth/userContext";
import { GrClose } from "react-icons/gr";

const AuthPopup = ({ signUp }) => {
    const userContextDetail = useContext(userContext);
    const [step, setStep] = useState(1);
    const [register, setRegister] = useState(signUp);
    const [userDetail, setUserDetail] = useState({
        name: "",
        email: "",
        picture: "",
    });

    console.log("inside popup");
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
        picture: "",
        address: {
            custom: "",
            city: "",
            zip: "",
        },
    });


    const handleCallBackResponse = (response) => {
        const userObject = jwt_decode(response.credential);
        setRegisterUser({ ...registerUser, name: userObject.name, email: userObject.email, picture: userObject.picture });
        // handleInput({name: userObject.name, email: userObject.email, picture: userObject.picture})
        userContextDetail.updateUserData(userObject);
        // router.push("/");
    };

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
    }, []);

    let name, value;
    const handleInput = (e) => {
        name = e.target.name;
        value = e.target.value;
        setLoginUser({
            [name]: value,
        });
    };

    const handleRegisterInput = (e) => {
        const { name, value } = e.target;
        console.log(name, value);
        {
            step == 1 &&
            setRegisterUser({ [name]: value })
        }
        {
            step == 2 &&
            setRegisterUser((prevUser) => ({
                ...prevUser,
                address: {
                    ...prevUser.address,
                    [name]: value,
                },
            }));
        }

    };

    const handleClick = async (e) => {
        e.preventDefault();

        try {
            console.log("start response");
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/login`,
                userDetail,
                {
                    withCredentials: true,
                }
            );

            // request to mail the form data
            setLoginUser({
                email: "",
                password: "",
            });
        } catch (err) {
            console.log("error while login data ", err);
        }
    };

    const handleSignUp = () => {

    }

    return (
        <>
            <div className="">
                <div className="max-w-md mx-auto px-8 py-3 my-10 bg-white span-8 rounded-xl shadow shadow-slate-300">
                    {/* <div className="flex justify-center items-center text-blue-700 font-bold text-3xl">
                            {register?
:"Login"}
                    </div> */}

                    <form action="" className="my-10">
                        <div className="flex flex-col space-y-5">
                            {step === 1 && (
                                <>
                                    {register && (
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
                                    )}

                                    <label htmlFor="email">
                                        <span className="font-medium text-slate-700 pb-2">Email address</span>
                                        <input
                                            onChange={(e) => { if (register) { handleRegisterInput(e) } else { handleInput(e) } }}
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
                                            onChange={(e) => { if (register) { handleRegisterInput(e) } else { handleInput(e) } }}
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
                                        <input onChange={handleInput} value={loginUser.email} type="checkbox" id="remember" className="w-4 h-4 border-slate-200 focus:bg-indigo-600" />
                                        Remember me
                                    </label> */}
                                        </div>
                                        <div>
                                            <a href="#" className="font-semibold text-indigo-600">Forgot Password?</a>
                                        </div>
                                    </div>}
                                    <button type="button" className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center">
                                    <span onClick={() => {if(step==1){setStep(2)}else{handleClick}}}>{register ? (step === 2 ? "Register" : "Next") : "Login"}</span>
                                    </button>
                                    <div
                                        class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                                        <span
                                            class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                                            OR
                                        </span>
                                    </div>
                                    <div className="my-5 flex items-center justify-center">
                                        <div id="signInDiv"></div>
                                    </div>
                                    <span className="text-center">{register ? "already a user !" : "Not registered yet !"} <span className="text-indigo-600 font-medium inline-flex space-x-1 items-center hover:cursor-pointer" onClick={() => setRegister(!register)}>{register ? "Login" : "SignUp"}</span></span>
                                </>)}
                            {step === 2 && (
                                <>
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
                                        <span onClick={() => {if(step==1){setStep(2)}else{handleClick}}}>{register ? (step === 2 ? "Register" : "Next") : "Login"}</span>
                                    </button>

                                </>
                            )
                            }

                        </div>
                    </form>
                </div>

            </div>
        </>
    )
}

export default AuthPopup