"use client";

import React, { useEffect } from "react";
import { Status } from "../../../slices/types";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchMonth } from "../../../slices/scheduleSlice";
import { WorkHeader } from "../workHeader";
import { WorkTimeTable } from "../workTimeTable";
import Link from "next/link";
import { fetchActiveSession } from "@/app/api/session";
import { update } from "@/slices/notificationSlice";
import { Spinner } from "@material-tailwind/react";

const ScheduleList = () => {
  const { month, year, status } = useAppSelector((store) => store.scheduleSlice);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getSessionAndFetchMonth = async () => {
      try {
        const session = await fetchActiveSession();
        if (session && session.username) {
          dispatch(
            fetchMonth({
              department: session.username,
              month: month.name,
              year,
            })
          );
        } else {
          console.error("Error retrieving profile data");
          dispatch(update("Error retrieving profile data please restart your application"))
        }
      } catch (error) {
        console.error("Error retrieving profile data", error);
      }
    };

    getSessionAndFetchMonth();
  }, [dispatch, month, year]);
  
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
              <Spinner  />
          </div>
        )}
        {status === Status.error && (
          <div className="flex justify-center items-center">
            <div className="w-12 h-12 bg-gray-200 rounded-full">Failed</div>
          </div>
        )}
            {status === Status.notFound && (
        <div className="flex justify-center items-center flex-col gap-6">
          Month with name {month.name} and year {year} not found
          <Link 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none" 
            href={'schedule/newMonth'}>
              Nowy miésiąc
          </Link>
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
