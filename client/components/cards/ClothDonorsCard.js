import React from "react";

const ClothDonorsCard = ({ data }) => {

    return (
        <>
            <div className="relative flex w-[22rem] md:w-96 p-7 h-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
                <h5 className="mb-2 block font-sans text-black text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                    <span className="font-bold ">Donor: </span>    {data?.donor?.name}
                </h5>
                <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-bold">Phone: </span>   {data?.donor?.phone}
                </span>
                <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-bold">Email: </span>   {data?.donor?.email}
                </span>
                <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-bold">Distance: </span>   {data?.distance / 100000}km
                </span>
                <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                    <span className="font-bold">Address: </span>   {data?.donor?.address?.custom + ", " + data?.donor?.address?.city + ", " + data?.donor?.address?.zip}
                </span>

            </div>
        </>
    )
}

export default ClothDonorsCard