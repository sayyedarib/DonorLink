import React from 'react';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { BiLogoGmail } from 'react-icons/bi';

const Footer = () => {
  return (
    <>
      <footer className="static bottom-0 w-full bg-blue-50 span-8 px-9 mb-0 pb-0">
        <hr className="border-blue-gray-50" />
        <div className="flex flex-row flex-wrap items-center justify-center my-3 gap-y-6 gap-x-12 bg-blue-50 text-center md:justify-between">
          <div className='flex gap-3 items-center'>
            <img src="/assets/images/icon/logo.svg" alt="logo" className="w-10" /><span className='font-bold text-4xl mx-4 text-blue-950'>DonorLink</span>
          </div>

          <div className='flex gap-5'>
            <Link href="https://www.github.com/sayyedarib/donorlink">
              <AiFillGithub className='text-3xl text-blue-900' />
            </Link>
            <Link href="malilto:sayyedaribhussain4321@gmail.com">
              <BiLogoGmail className='text-3xl text-blue-900' />
            </Link>
          </div>

          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 text-blue-500">
            <li>
              <Link
                href="/about"
                className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-blue-800"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-blue-800"
              >
                License
              </Link>
            </li>
            <li>
              <Link
                href="https://www.github.com/sayyedarib/donorlink"
                className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-blue-800"
              >
                Contribute
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased transition-colors hover:text-blue-800"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <hr className="my-2 border-blue-gray-50" />
        <span className="block text-center font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
          © 2023 DonorLink all rights reserved
        </span>
      </footer>
    </>
  )
}

export default Footer
