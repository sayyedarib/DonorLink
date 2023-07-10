import React from 'react'

const DashboardProfile = ({userData}) => {

    console.log("userData dashboard profile component ", userData);
  
    return (
    <div className="w-full px-4 mx-auto mt-60">
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
      <div className="px-6">
        <div className="flex flex-wrap justify-center">
          <div className="w-full px-4 flex justify-center">
            <div className="relative">
              <img alt="..." src="/assets/images/fill-gap/boy.svg" className="shadow-xl rounded-full w-40 h-40" />
            </div>
          </div>
          <div className="w-full px-4 text-center mt-20">
            <div className="flex flex-col justify-center py-4 lg:pt-4 pt-8">
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  {userData?.email}
                </span>
              </div>
              <div className="mr-4 p-3 text-center">
                <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">
                  +91 {userData?.phone}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
            {userData?.name}
          </h3>
          <div className="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
            <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
            {userData?.address?.city}, India
          </div>
          <div className="mb-2 text-blueGray-600 mt-10">
            <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
            {userData?.type}
          </div>
        </div>
        <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
          <div className="flex flex-wrap justify-center">
            <div className="w-full lg:w-9/12 px-4">
              <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                {userData?.bio}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}

export default DashboardProfile