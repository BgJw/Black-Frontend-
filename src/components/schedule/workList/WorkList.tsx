"use client";

import React, { useEffect } from "react";
import { Status } from "../../../slices/types";
import { useSession } from "next-auth/react";
import { useAppDispatch, useAppSelector } from "@/components/hooks/store";
import { fetchMonth } from "../../../slices/scheduleSlice";
import { WorkHeader } from "../workHeader/WorkHeader";
import { WorkTimeTable } from "../workTimeTable/WorkTimeTable";


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
    <div className="relative overflow-x-auto shadow-md rounded-lg w-[90%]">
      {status === Status.idle && (
        <table className="w-full text-sm rtl:text-right text-gray-500 dark:text-gray-400">
          <WorkHeader />
          <WorkTimeTable />
        </table>
      )}
      {status === Status.loading && <span> Loading ..... </span>}
      {status === Status.error && (
        <span>
          Month with name {month.name} and year {year} not found
        </span>
      )}
    </div>
  );
};

export default ScheduleList;
