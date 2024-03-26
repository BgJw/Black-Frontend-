'use client'
import { useAppSelector } from '@/components/hooks/store';
import useDaysArrayInMonth from '@/components/hooks/useDaysArrayInMonth';
import { getDayOfWeek } from '@/helpers/isWeekend';
import React from 'react'
import WorkCell from '../workCell/WorkCell';

export const WorkTimeTable = () => {
    const { month, year, personel } = useAppSelector(store => store.scheduleSlice);
    const daysInMonth = useDaysArrayInMonth();

  return (
    <tbody>
    {
        daysInMonth.map(day => (    
            <tr key={day} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 text-left font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {day + '.' + (month.numb ) + ' ' + getDayOfWeek(year, month.numb, day)}
            </th>
            {
                personel.employees.map(emplo => (
                    <WorkCell
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
