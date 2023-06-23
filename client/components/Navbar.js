import React, { useState, useContext } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import userContext from "@/context/auth/userContext";
import router from "next/router";
import AuthPopup from "./AuthPopup";


const navItemsInfo = [
  { name: "HOME" },
  { name: "ABOUT" },
  { name: "CONTACT US" },
  { name: "FAQ" },
];

const NavItem = ({ item }) => {
  return (
    <li className="relative group">

      <>
        <a href="/" className="px-4 py-2 group-hover:text-blue-700">
          {item.name}
        </a>
        <span className="text-blue-500 absolute transition-all duration-500 font-bold right-0 top-0 group-hover:right-[90%] opacity-0 group-hover:opacity-100">
          /
        </span>
      </>

    </li>
  );
};

const Navigation = () => {
  const userContextDetail = useContext(userContext);
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  const handleProfile = () => {
    console.log("userContextDetail in handle profile ", userContextDetail);
    router.push(`/${userContextDetail.userStateData.name}`);
  }

  return (
    <>
      <section>
        <header className="container min-w-full bg-blue-50 px-5 flex justify-between py-4 items-center">
          <div>
            <img className="w-10" src="/assets/images/icon/logo.svg" alt="logo" />
          </div>
          <div className="z-50 lg:hidden">
            {navIsVisible ? (
              <AiOutlineClose
                className="w-6 h-6"
                onClick={navVisibilityHandler}
              />
            ) : (
              <AiOutlineMenu className="w-6 h-6" onClick={navVisibilityHandler} />
            )}
          </div>
          <div
            className={`${navIsVisible ? "right-0" : "-right-full"
              }  transition-all duration-300 mt-[90px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
          >
            <ul className="items-center gap-5 text-blue-500 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
              {navItemsInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </ul>
            {
              (userContextDetail?.userStateData.name != "" ? (
                <span
                  className="rounded-full relative flex flex-col group"
                  onClick={() => {
                    handleProfile();
                  }}
                >
                  <img src={userContextDetail?.userStateData.picture} style={{ width: "2rem", height: "auto", borderRadius: "100%" }} />
                  <div className="hidden transition-all duration-500 pt-4 absolute bottom-0 right-0 transform translate-y-full group-hover:block w-max">
                    <ul className="flex flex-col shadow-lg rounded-lg overflow-hidden ">
              
                        <Link
                          href="/"
                          className="hover:bg-dark-hard bg-blue-50 hover:text-white hover:bg-blue-700 px-4 py-2 text-black lg:text-dark-soft"
                        >
                          Dashboard
                        </Link>
                        <span className="hover:bg-dark-hard bg-blue-50 hover:text-white hover:bg-blue-700 px-4 py-2 text-black lg:text-dark-soft">
                          Logout
                        </span>
                    
                    </ul>
                  </div>
                </span>
              ) : (

                <button className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-700 hover:text-blue-50 transition-all duration-300">
                  <Link href="/signUpAndLogin">
                    Sign In
                  </Link>
                </button>
              ))}
          </div>
        </header>
      </section>
      {/* {userContextDetail.loginPopupVisibility && (
      <div className="fixed top-1/2 left-1/2 z-10">
  <div className="-translate-x-1/2 -translate-y-1/2 z-20">
    <AuthPopup />
  </div>
</div>

      )} */}
    </>
  );
};

export default Navigation;
