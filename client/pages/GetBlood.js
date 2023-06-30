import React, { useState, useContext, useEffect } from 'react';
import BloodDonorsCard from '@/components/BloodDonorsCard';
import userContext from '@/context/auth/userContext';
import { useRouter } from 'next/router';
import axios from 'axios';

const GetBlood = () => {
  const router = useRouter();
  const userContextDetail = useContext(userContext);

  if (!userContextDetail.userStateData.name) {
    localStorage.setItem("prevItem", "/GetBlood")
    router.replace("/auth");
  }

  const [blood, setBlood] = useState("");
  const [nearbyDonor, setNearbyDonor] = useState([]);

  useEffect(() => { console.log(nearbyDonor?.filter((data) => data.donor.bloodGroup == blood)), [nearbyDonor] })
  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bloodDonorsList?coordinates=${userContextDetail.userStateData.coordinates}`);
      console.log("CL:getblood data.data ", data.data);
      setNearbyDonor(data.data);
    } catch (error) {
      console.log("Error while finding nearest donor:", error);
    }
  };


  return (
    <div className='flex flex-col h-[74vh] justify-center items-center mx-auto lg:my-12 my-24 gap-20'>
      <form>
        <label htmlFor="bloodType" className="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="search"
            id="bloodType"
            onChange={(e) => setBlood(e.target.value)}
            value={blood}
            className="block w-[28rem] p-4 pl-10 text-sm text-gray-900 rounded-lg bg-gray-50 focus:ring-blue-300 focus:outline-none focus:shadow-xl focus:shadow-blue-200"
            placeholder="Search blood group e.g. A+"
            required
          />
          <button
            onClick={handleClick}
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>
      <div className='flex flex-wrap gap-3 items-center justify-center'>
        {
          nearbyDonor?.filter((data) => data.donor.bloodGroup === blood)
            .map(filteredData => {
              // console.log("filteredData ", filteredData);
              return <BloodDonorsCard key={filteredData.donor._id} data={filteredData} />;
            })
        }

      </div>
    </div>
  );
};

export default GetBlood;


