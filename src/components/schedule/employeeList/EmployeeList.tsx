import { useAppSelector } from '@/components/hooks/store';
import dynamic from "next/dynamic";
import React from 'react';
import WorkCell from '../workCell/WorkCell';


const DynamicTooltipWithHelperIcon = dynamic(() => import('../tooltip/TooltipForEmployee'), {
    ssr: false,
    loading: () => <p>Loading...</p>,
});

const EmployeeList = ({ day }: { day: number }) => {
    const personel = useAppSelector(store => store.scheduleSlice.personel);

    
    return (
        <>
            {
                personel.employees.map(emplo => (
                    day === 0 ?
                        <div
                            key={emplo._id}
                            className={'cell bg-slate-200 h-[35px] overflow-hidden relative'}>
                            {emplo.name.split(' ').slice(0, 1)}
                            <DynamicTooltipWithHelperIcon employee={emplo} />
                        </div>
                        :
                        <WorkCell
                            key={emplo._id}
                            employeeId={emplo._id}
                            monthId={personel._id}
                            emptyDay={day}
                            workTime={emplo.work_time.find(workDay => workDay.day === day)}
                        />
                ))
            }
        </>
    );
};

export default EmployeeList;