import React, { useState } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// import { images } from "../constants/index.js";
import { MdKeyboardArrowDown } from "react-icons/md";

const navItemsInfo = [
  { name: "HOME"},
  { name: "ABOUT"},
  {name:"CONTACT US"},
  { name: "FAQ"},
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
  const [navIsVisible, setNavIsVisible] = useState(false);

  const navVisibilityHandler = () => {
    setNavIsVisible((curState) => {
      return !curState;
    });
  };

  return (
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
          className={`${
            navIsVisible ? "right-0" : "-right-full"
          } transition-all duration-300 mt-[90px] lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
        >
          <ul className="items-center gap-5 text-blue-500 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
            {navItemsInfo.map((item) => (
              <NavItem key={item.name} item={item} />
            ))}
          </ul>
          <button className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold hover:bg-blue-700 hover:text-blue-50 transition-all duration-300">
            Sign In
          </button>
        </div>
      </header>
    </section>
  );
};

export default Navigation;
