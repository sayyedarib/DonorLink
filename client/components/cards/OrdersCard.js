import React from "react";

const OrdersCard = ({ data, handleDecision }) => {
    console.log("orders card ", data);
    return (
        <>
            <div className="relative flex w-96 h-auto flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg shadow-blue-300">
                <div className="p-6">
                    <h5 className="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                        <span className="font-bold">Donated by: </span>    {data?.workDetails?.profile?.name}
                    </h5>
                    <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        <span className="font-bold">Phone: </span>   {data?.workDetails?.profile?.phone}
                    </span>
                    <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        <span className="font-bold">Address: </span>   {data?.workDetails?.profile?.address?.custom}
                    </span>
                    <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        <span className="font-bold">Message: </span>   {data?.workDetails?.profile?.message}
                    </span>
                    <span className="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
                        <span className="font-bold">Distance: </span> {data?.workDetails?.nearestVolunteers[data?.workDetails?.assignedVolunteer]?.distance}km
                    </span>
                </div>
                <div className="flex flex-col p-6 pt-0 gap-3">
                    {!data.accepted && !data.rejected && <div className='flex gap-3 justify-between'>
                        <button onClick={() => handleDecision(data._id, "accept")}
                            className="select-none w-full rounded-full bg-blue-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-full hover:shadow-blue-500/40 hover:bg-blue-900"
                            type="button"
                            data-ripple-light="true"
                        >
                            Accept
                        </button>
                        <button onClick={() => handleDecision(data._id, "reject")}
                            className="select-none w-full rounded-full bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-full hover:shadow-blue-500/40 hover:bg-red-900"
                            type="button"
                            data-ripple-light="true"
                        >
                            Reject
                        </button>
                    </div>
                    }
                    {!data.collected && data.accepted && <button onClick={() => handleDecision(data._id, "collected")}
                        className="select-none w-full rounded-full bg-green-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-full hover:shadow-blue-500/40 hover:bg-green-900"
                        type="button"
                        data-ripple-light="true"
                    >
                        Collect
                    </button>}
                </div>
            </div>
        </>
    )
}

export default OrdersCard