"use client";

import { memo, useEffect } from "react";
import { Status } from "../../../slices/types";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { fetchMonth } from "../../../slices/scheduleSlice";
import { WorkHeader } from "../workHeader";
import { WorkTimeTable } from "../workTimeTable";
import { update } from "@/slices/notificationSlice";
import { useSession } from "next-auth/react";
import { StatusMessage } from "../statusMesage/StatusMessage";

const ScheduleList = () => {
  const { month, year, status } = useAppSelector((store) => store.scheduleSlice);
  const dispatch = useAppDispatch();
  const { data: session, status: sessionStatus } = useSession();

    
useEffect(() => {
  if (sessionStatus === "authenticated") {
    const username = session?.user?.name;
    if (username) {
      dispatch(
        fetchMonth({
          department: username,
          month: month.name,
          year,
        })
      );
    } else {
      console.error("Error retrieving profile data");
      dispatch(update("Error retrieving profile data, please restart your application"));
    }
  }
}, [dispatch, month, year, session?.user?.name, sessionStatus]);

  
  return (
    <div className="relative ">
      {status === Status.idle && (
        <div className="rounded-lg shadow-md overflow-x-auto flex justify-center">
            <table className="sm:w-[60%] text-sm rtl:text-right text-gray-500">
              <WorkHeader />
              <WorkTimeTable />
            </table>
        </div>
        
      )}
      <StatusMessage status={status} month={month.name} year={year}/>
    </div>
  );
};

export default ScheduleList;
