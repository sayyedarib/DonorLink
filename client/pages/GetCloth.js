import { ToastContainer, toast } from "react-toastify";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import userContext from "@/context/auth/userContext";
import { useRouter } from "next/router";
import { BsCheckCircle } from "react-icons/bs"
import ClothDonorsCard from "@/components/cards/ClothDonorsCard";


const GetCloth = () => {
    const router = useRouter();
    const userContextDetail = useContext(userContext);
    const [list, setList] = useState(false);
    useEffect(() => {
        if (!userContextDetail.userStateData.name) {
            router.replace("/auth?prevPath=/GetCloth");
        }

    }, []);


    const [quantity, setQuantity] = useState("");
    const [nearbyDonor, setNearbyDonor] = useState([]);

    useEffect(() => { console.log("nearby cloth donor  ", nearbyDonor?.filter((data) => data)), [nearbyDonor] });
    const handleClick = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clothDonorsList?coordinates=${userContextDetail.userStateData.coordinates}`);
            console.log("CL:getblood data.data ", data.data);
            setNearbyDonor(data.data);
            toast.success("we have recieved your request");
            setList(true);
        } catch (error) {
            console.log("Error while finding nearest donor:", error);
        }
    };

    return (
        <div>
            <div className="flex flex-wrap justify-center items-center gap-14 mt-48">
                <div className="lg:w-[28rem] p-8 my-10 rounded-xl shadow-xl shadow-blue-900">

                    <h1 className="text-center text-blue-800 font-bold text-2xl">Cloth Donation</h1>
                    <form action="" className="mt-10">
                        <div className="flex flex-col space-y-5">
                            <label htmlFor="quantity">
                                <span className="font-medium text-slate-700 pb-2">Pairs of cloth needed</span>
                                <input
                                    onChange={(e) => setQuantity(e.target.value)}
                                    value={quantity}
                                    id="quantity"
                                    name="quantity"
                                    type="number"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Enter number of pairs of cloth here"
                                />
                            </label>

                        </div>
                        <button type="submit" onClick={handleClick} className="w-full py-3 mt-5 font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg border-indigo-700 hover:shadow inline-flex space-x-2 items-center justify-center">
                            <span >Get Cloth</span>
                        </button>
                    </form>
                </div>
                <div>

                    {!list ? <div className="flex flex-col gap-5 justify-center  text-blue-950 mb-10 mx-10">
                        <span className="flex items-center gap-3"><BsCheckCircle /> Signup</span>
                        <span className="flex items-center gap-3"><BsCheckCircle /> Go to get cloth section</span>
                        <span className="flex items-center gap-3"><BsCheckCircle /> Fill the required details</span>
                        <span className="flex items-center gap-3"><BsCheckCircle /> Get in touch with donors in the range of 10km</span>
                        <span className="flex items-center gap-3"><BsCheckCircle /> No donors's availabele, No worry! If available in our collection stock , we will provide you.</span>
                    </div>
                        :
                        <div className="flex gap-5 flex-wrap justify-center items-center mt-10">

                            {nearbyDonor.map(data => <ClothDonorsCard key={data._id} data={data} />)}
                        </div>}
                </div>
            </div>
            <ToastContainer position="top-left" />
        </div>
    )
}

export default GetCloth