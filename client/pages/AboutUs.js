import React from 'react'
import { TbBuildingEstate } from "react-icons/tb"
import { BsFillPersonCheckFill } from "react-icons/bs"
import { BiDonateHeart } from "react-icons/bi"
import { FcCollect } from "react-icons/fc";

const AboutUs = () => {
    return (
        <>
            <section className="py-10 lg:py-20 bg-blue-50 font-poppin mt-4">
                <div className="max-w-6xl py-4 mx-auto lg:py-6 md:px-6">
                    <div className="flex flex-wrap-reverse">
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0 ">
                            <div className="lg:max-w-md">
                                <div className="px-4 pl-4 mb-6 border-l-4 border-blue-500">
                                    <span className="text-sm text-blue-800 uppercase dark:text-gray-400">Who we are?</span>
                                    <h1 className="mt-2 text-3xl font-black text-blue-700 md:text-5x">
                                        About Us
                                    </h1>
                                </div>
                                <p className="px-4 mb-10 text-base leading-7 text-gray-500 dark:text-gray-400">
                                    DonorLink was created by Aarib, Rafey, and Areeb, three passionate individuals who came together during a 48-hour hackathon project in February 2023. Fueled by their shared drive to address social challenges, they recognized the need for a platform that could make a tangible difference in people's lives. With their combined skills, expertise, and unwavering determination, they brought DonorLink to life. Today, DonorLink stands as a testament to their vision and commitment to creating positive social impact. Together, they continue to inspire change and empower communities through the power of giving and solidarity.
                                </p>
                                <div className="flex flex-wrap items-center">
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                        <div className="p-6 bg-white shadow-lg shadow-blue-300">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <BiDonateHeart className='text-4xl' />
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">50+
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Donations</h2>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                        <div className="p-6 bg-white shadow-lg shadow-blue-300">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <FcCollect className='text-4xl' />
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">30+
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Distributions</h2>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6 ">
                                        <div className="p-6 bg-white shadow-lg shadow-blue-300">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <BsFillPersonCheckFill className='text-4xl' />
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">5+
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Volunteer</h2>
                                        </div>
                                    </div>
                                    <div className="w-full px-4 mb-6 sm:w-1/2 md:w-1/2 lg:mb-6">
                                        <div className="p-6 bg-white shadow-lg shadow-blue-300">
                                            <span className="text-blue-500 dark:text-blue-400">
                                                <TbBuildingEstate className='text-4xl' />
                                            </span>
                                            <p className="mt-4 mb-2 text-3xl font-bold text-gray-700 dark:text-gray-400">2+
                                            </p>
                                            <h2 className="text-sm text-gray-700 dark:text-gray-400">Regions</h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full px-4 mb-10 lg:w-1/2 lg:mb-0">
                            <div className='flex flex-wrap gap-2 lg:gap-5 justify-center items-center'>
                                <span className='flex flex-col text-center gap-3 font-semibold text-2xl '>
                                    <img src="/assets/images/img/me.webp" alt="member_1" className="w-48 h-48 rounded-full" />
                                    Aarib</span>
                                <span className='flex flex-col text-center gap-3 font-semibold text-2xl '>

                                    <img src="/assets/images/img/AREEB.webp" alt="member_2" className="w-48 h-48  rounded-full" />
                                    Areeb</span>
                                <span className='flex flex-col text-center gap-3 font-semibold text-2xl '>

                                    <img src="/assets/images/img/rafey.webp" alt="member_3" className="w-48 h-48 rounded-full" />
                                    Rafey</span>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default AboutUs