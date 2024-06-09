'use client'
import { useAppSelector } from '@/hooks/store';
import useDaysArrayInMonth from '@/hooks/useDaysArrayInMonth';
import { getDayOfWeek } from '@/helpers/isWeekend';
import React from 'react'
import dynamic from 'next/dynamic';


const DynamicWorkCell = dynamic( () => import('../workCell'), {
  loading: () => <td>Loading...</td>,
})
export const WorkTimeTable = () => {
    const { month, year, personel } = useAppSelector(store => store.scheduleSlice);
    const daysInMonth = useDaysArrayInMonth();
    
  return (
    <tbody>
    {
        daysInMonth.map(day => (    
            <tr key={day} className="hover:bg-gray-700 bg-gray-800">
                <th scope="row" className="md:px-6 px-3 md:py-3 py-2 text-left font-medium text-white whitespace-nowrap ">
                        {`${day}.${month.numb} ${getDayOfWeek(year, month.numb, day)}`}
                </th>
                {
                    personel.employees && personel.employees.map(emplo => (
                        <DynamicWorkCell
                            key={emplo._id}
                            employeeId={emplo._id}
                            monthId={personel._id}
                            emptyDay={day}
                            workTime={emplo.work_time.find(workDay => workDay.day === day)}
                    />
                    ))
                }
            </tr>
          ))
    }
    </tbody>
  )
}
