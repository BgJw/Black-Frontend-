'use client'

import EmployeeList from "../employeeList/EmployeeList";
import DayCell from "../dayCell/DayCell";
import React, { useEffect } from "react";
import { Status } from "../../../../slices/types";
import { useSession } from 'next-auth/react';
import { useAppDispatch, useAppSelector } from '@/components/hooks/store';
import { fetchMonth } from '../../../../slices/scheduleSlice';


const MemoizedDayCell = React.memo(DayCell);
const MemoizedEmployeeList = React.memo(EmployeeList);

const ScheduleList = () => {
    const { dayList, month, year, status } = useAppSelector(store => store.scheduleSlice);
    const session = useSession();
    const dispatch = useAppDispatch();

    useEffect(() => {
        session.data?.user &&
            dispatch(fetchMonth({ department: String(session.data.user.name), month: month.name, year }));
    }, [month, year, session.data?.user?.name]);


    return (
        <>
            {status === Status.idle && (
                <ul className="flex justify-center flex-col m-6 flex-wrap font-medium text-gray-900 bg-white border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 relative">
                    {
                        dayList.map(day => (
                            <li className='flex sm:justify-center md:justify-start border-gray-200 rounded-t-lg dark:border-gray-600 md:text-base sm:text-xs text-xs '
                                key={day}>
                                <MemoizedDayCell day={day} />
                                <MemoizedEmployeeList day={day} />
                            </li>
                        ))
                    }
                </ul>)}
            {status === Status.loading && (
                <span> Loading ..... </span>
            )}
            {status === Status.error && (
                <span> Month with name {month.name} and year {year} not found </span>
            )}
        </>
    );
};

export default ScheduleList;