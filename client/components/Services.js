import React from "react";
import Link from "next/link";
import data from "../constants/data";
import ServiceCard from "./cards/ServiceCard";

const Services = () => {
  return (
    <>
      <section className="bg-blue-50 flex flex-col text-white px-5 py-3 gap-20">
        <h1 className="text-center text-4xl sm:text-5xl font-bold text-blue-600">Provide Help</h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {data?.provideHelpService?.map((data1) => {
            return (
              <>
                <div key={data1.id}>
                  <Link href={data1.link}>
                    <ServiceCard service={data1} />
                  </Link>
                </div>
              </>
            );
          })}
        </div>
        <h1 className="text-4xl text-center sm:text-5xl font-bold text-blue-600">Get Help</h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {data?.getHelpService?.map((data2) => {
            return (
              <>
                <div key={data2.id}>
                <Link href={data2.link}>
                  <ServiceCard service={data2} />
                </Link>
                </div>
              </>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Services;
