import React from 'react';
import Link from 'next/link';
import Accordion from '../components/Accordion';

function faq() {
    const faqList = [
        {
            title: "What is DonorLink?",
            content: " DonorLink is a web application that connects donors with people in need. It serves as a platform bridging the gap between willing donors and those who require assistance. Our goal is to facilitate donations while maintaining trust and ensuring 100% transparency."
        },
        {
            title: "How does DonorLink work?",
            content: "DonorLink allows donors to fill out a form and provide their location, enabling us to match them with nearby volunteers through geolocation. We also offer a secure online donation option through a payment gateway, ensuring the safety of transactions. Please be aware that the payment gateway's KYC is currently under test mode, so UPI QR codes are displayed temporarily."
        },
        {
            title: "Who created DonorLink?",
            content: "DonorLink was created by Aarib, Rafey, and Areeb, three passionate individuals who joined forces during a 48-hour hackathon project in February 2023. Driven by their shared commitment to address social challenges, they envisioned a platform that could make a tangible difference in people's lives. Through their expertise, skills, and unwavering determination, they brought DonorLink to life."
        },
        {
            title: "How can I get involved with DonorLink?",
            content: "We welcome individuals to join us as volunteers, donors, or people in need. Whether you want to contribute your time, make a donation, or seek assistance, you can become part of our community. Together, we can create positive social impact and bridge the gap between those who have resources and those who need them."
        },
        {
            title: "Why is donating clothes important?",
            content: "Donating clothes is not just about getting rid of items you no longer need. It's an opportunity to make a difference in someone's life and show them that someone cares about their needs. By donating clothes, you give the needy a chance to feel supported and valued."
        },
        {
            title: "Why is blood donation crucial?",
            content: "A single act of giving, a drop of life, can bridge the gap between despair and hope. Donating blood is a compassionate act that saves lives and ignites the flame of compassion. By submitting your blood request detailing your specific needs, our dedicated community of donors can come to your aid and be your lifeline in critical times."
        },
        {
            title: "How can I trust the transparency of DonorLink?",
            content: " At DonorLink, we prioritize maintaining trust and ensuring transparency in all donation processes. We strive to provide a platform where donors and people in need can have confidence in the integrity of their contributions. We have implemented measures such as 100% transparency in our operations, ensuring that every donation is tracked and accounted for. Additionally, we maintain open communication channels, regularly update our users on the impact of their donations, and provide financial reports to demonstrate our commitment to transparency. Your trust and satisfaction are of utmost importance to us."
        },
    ]
    return (
        <div>
            <header className="bg-blue-50 flex flex-wrap-reverse sm:flex-nowrap px-10 lg:px-20 mt-4 text-left justify-center items-center h-[80vh] content-center">
                <div className="w-auto sm:w-1/2 flex flex-col gap-2 sm:gap-6 md:gap-8">
                    <h1 className="text-4xl sm:text-5xl font-bold text-blue-700">
                        Questions? Look Here.
                    </h1>
                    <h2 className="">
                        If you can't find the answer you're looking for,
                        don't hesitate to reach out to us through our
                        <Link className="text-blue-700" href={"/ContactUs"}> contact page</Link>. We're here to assist you and provide
                        the support you need. Our dedicated team is ready
                        to help you with any questions or concerns you may have.
                    </h2>
                    <div className="flex gap-4 flex-wrap">
                    </div>
                </div>
                <div className="w-full  sm:w-1/2">
                    <img className='w-full sm:w-3/4' src="/assets/images/img/faq.webp" alt="donation_img" />
                </div>
            </header>
            <section className="bg-blue-50 flex flex-col px-5 py-3 gap-20 pb-20">
                <h1 className="text-center text-4xl sm:text-5xl font-bold text-blue-600">Frequently Asked Questions</h1>
                <section className="max-w-6xl mx-auto text-center">
                    {
                        faqList.map(faq => {
                            return (
                                <Accordion key={faq.title} title={faq.title} content={faq.content} />
                            )
                        })
                    }
                </section>
            </section>
        </div>
    )
}

export default faq;