"use client";

import React, { useEffect } from "react";
import { Status } from "../../../slices/types";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/components/hooks/store";
import { fetchMonth } from "../../../slices/scheduleSlice";
import { WorkHeader } from "../workHeader/WorkHeader";
import { WorkTimeTable } from "../workTimeTable/WorkTimeTable";
import Link from "next/link";


const ScheduleList = () => {
  const { month, year, status } = useAppSelector(
    (store) => store.scheduleSlice
  );
  const session = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    session.data?.user &&
      dispatch(
        fetchMonth({
          department: String(session.data.user.name),
          month: month.name,
          year,
        })
      );
  }, [month, year, session.data?.user?.name]);
  
  return (
    <div className="relative p-3">
      {status === Status.idle && (
        <div className="rounded-lg shadow-md overflow-x-auto">
        <table className="w-full text-sm rtl:text-right text-gray-500">
          <WorkHeader />
          <WorkTimeTable />
        </table>
        </div>
      )}
        {status === Status.loading && (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-spin"></div>
          </div>
        )}
        {status === Status.error && (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full">Failed</div>
          </div>
        )}
            {status === Status.notFound && (
        <div className="flex justify-center items-center flex-col gap-2">
          Month with name {month.name} and year {year} not found
          <Link className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" 
            href={'schedule/newMonth'}>Nowy miésiąc</Link>
          

        </div>
      )}
    </div>
  );
};

export default ScheduleList;
