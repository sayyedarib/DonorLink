import React, { useState, useContext, useEffect } from "react";
import Link from "next/link";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import userContext from "@/context/auth/userContext";
import router from "next/router";



const navItemsInfo = [
  { name: "HOME",link:"/" },
  { name: "ABOUT", link:"AboutUs" },
  { name: "CONTACT US", link:"ContactUs" },
  { name: "FAQ", link:"/faq" },
];

const NavItem = ({ item }) => {
  return (
    <li className="relative group">

      <>
        <Link href={item.link} className="px-4 py-2 lg:group-hover:text-blue-700 group-hover:text-blue-950">
          {item.name}
        </Link>
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
    router.replace(`/${userContextDetail.userStateData.name}`);
  }

  useEffect(() => {
    const countPath = parseInt(localStorage.getItem('countPath')) || 0;
  
    const handleRouteChange = (url) => {
      const currPath = { url, count: countPath };
      let prevPath = JSON.parse(localStorage.getItem('currPath'));
  
      if (countPath === 0) {
        prevPath = { url: '/' };
        localStorage.setItem('prevPath', JSON.stringify(prevPath));
      } else {
        localStorage.setItem('prevPath', JSON.stringify(prevPath));
      }
  
      localStorage.setItem('currPath', JSON.stringify(currPath));
      localStorage.setItem('countPath', countPath + 1);
    };
  
    router.events.on('routeChangeComplete', handleRouteChange);
  
    // Trigger the effect manually on initial render
    handleRouteChange(router.asPath);
  
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, []);
  
  
  
  return (
    <>
      <section>
        <header className="container min-w-full bg-blue-50 px-5 flex justify-between py-4 items-center">
          <div className="flex">
            <img className="w-10" src="/assets/images/icon/logo.svg" alt="logo" /><span className='font-bold text-4xl mx-4 text-blue-950'>DonorLink</span>  
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
              }  transition-all duration-300 mt-[70px] bg-blue-600 lg:mt-0 bg-dark-hard lg:bg-transparent z-[49] flex flex-col w-full lg:w-auto justify-center lg:justify-end lg:flex-row fixed top-0 bottom-0 lg:static gap-x-9 items-center`}
          >
            <ul className="items-center text-white gap-5 lg:text-blue-500 lg:text-dark-soft flex flex-col lg:flex-row gap-x-2 font-semibold">
              {navItemsInfo.map((item) => (
                <NavItem key={item.name} item={item} />
              ))}
            </ul>
            {
              (userContextDetail?.userStateData?.name ? (
                <span
                  className="rounded-full relative flex flex-col group"
                  onClick={() => {
                    handleProfile();
                  }}
                >
                  <img src={userContextDetail?.userStateData?.picture?userContextDetail.userStateData.picture:"/assets/images/fill-gap/boy.svg"} style={{ width: "2rem", height: "auto", borderRadius: "100%" }} />
                  <div className="hidden transition-all duration-500 pt-4 absolute bottom-0 right-0 transform translate-y-full group-hover:block w-max">
                    <ul className="flex flex-col shadow-lg rounded-lg overflow-hidden ">
              
                        <Link
                          href={`/${userContextDetail.userStateData.name}`}
                          className="hover:bg-dark-hard bg-blue-50 hover:text-white hover:bg-blue-700 px-4 py-2 text-black lg:text-dark-soft"
                        >
                          Dashboard
                        </Link>
                        <span onClick={()=>{userContextDetail.signOut();router.replace("/")}} className="hover:bg-dark-hard bg-blue-50 hover:text-white hover:bg-blue-700 px-4 py-2 text-black lg:text-dark-soft hover:cursor-pointer">
                          Logout
                        </span>
                    
                    </ul>
                  </div>
                </span>
              ) : (
                <button className="mt-5 lg:mt-0 border-2 border-blue-500 px-6 py-2 rounded-full text-blue-500 font-semibold bg-blue-50 hover:bg-blue-700 hover:text-blue-50 transition-all duration-300">
                <Link href="/auth">
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
