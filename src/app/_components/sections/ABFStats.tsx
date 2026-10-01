"use client";

import { abfStats } from "@/constants/home";
import CountUp from "react-countup";

const ABFStats = () => {
  return (
    <div className="md:w-[75%] mx-auto flex flex-col md:flex-row justify-between items-center gap-6 px-4 py-12 font-heading">
      {abfStats.map(({ number, desc, prefix, suffix }, i) => (
        <div
          key={i}
          className="w-full md:flex flex-wrap text-center items-center justify-center gap-2 border-primary border-2 md:border-0 rounded-lg px-5 py-1 md:p-0"
        >
          <h2 className="text-3xl md:text-5xl font-semibold md:font-bold text-text">
            <CountUp
              end={number}
              duration={3}
              enableScrollSpy
              scrollSpyOnce
              prefix={prefix}
              suffix={suffix}
            />
          </h2>
          <span className="font-medium text-xl md:text-2xl text-primary text-nowrap">
            {desc}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ABFStats;
