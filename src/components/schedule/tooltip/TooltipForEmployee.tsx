import { Tooltip } from "@material-tailwind/react";
import { IEmployees } from "../../../slices/types";
import React, { useState } from "react";
import useDaysArrayInMonth from "@/components/hooks/useDaysArrayInMonth";


const TooltipWithHelperIcon = React.memo(({ employee }: { employee: IEmployees }) => {

    const days = useDaysArrayInMonth();

    const [information, setInformation] = useState({
        name: employee.name || 'NaN',
        position: employee.position || 'NaN',
        work_Hours: 0,
        vacation: 0,
        holidays: 0,
        sickLeave: 0,
        salary: 0,
        notRegistred: 0
    });
    const TIME_COST = 32;    

    const resetInformation = () => {
        setInformation({
            name: employee.name || 'NaN',
            position: employee.position ||'NaN',
            work_Hours: 0,
            vacation: 0,
            holidays: 0,
            sickLeave: 0,
            salary: 0,
            notRegistred: 0
        })
    }
    const isValid = (str: string) => /^(\d{1,2})-(\d{1,2})$/.test(str);
    
    const calculateWorkHours = (emplo: IEmployees) => {

        let hours = 0;
    
        emplo.work_time.forEach((day) => {
            if (isValid(day.time)) {
                const [start, end] = day.time.split('-').map(Number);
    
                const adjustedEndTime = end < start ? end + 24 : end;
    
                hours += adjustedEndTime - start;
            }
        });    
    
        setInformation((prev) => ({ ...prev, work_Hours: hours, salary: hours * TIME_COST }));
    };
    
 
    const calculateEmployeeInformation = (emplo: IEmployees) => {
        const newInformation = { ...information };
        
        days.forEach((day) => {
            const emploDay = emplo.work_time.find( eDay => eDay.day === day);
    
            if (emploDay) {
                if (emploDay.time === '-') {
                    newInformation.holidays++;
                } else if (emploDay.time.toUpperCase() === 'U') {
                    newInformation.vacation++;
                }
                else if (emploDay.time.toUpperCase() === 'L4') {
                    newInformation.sickLeave++;
                }
            } else if (day !== 0) {
                newInformation.notRegistred++;
            }
        });
        setInformation(newInformation);
        calculateWorkHours(emplo)
    };


    const { name, position, holidays, salary, sickLeave, vacation, work_Hours, notRegistred } = information;


    return (
        <Tooltip
            content={
                <div className="overflow-auto max-w-96 bg-white drop-shadow p-3 shadow-lg rounded-md">
                    <span className="font-bold text-black">
                        {name}
                    </span>
                    <div
                        className="font-medium opacity-80 text-black mt-1 flex flex-col gap-y-2"
                    >
                        <span>
                            Pozycja: <strong>{position}</strong> 
                        </span>
                        <span>
                            Przepracowano w tym ms: <strong>{work_Hours} godz</strong> 
                        </span>
                        <span>
                            Wykorzystano urlopow: <strong>{vacation}</strong> 
                        </span>
                        <span>
                            Dni wolne od pracy: <strong>{holidays}</strong> 
                        </span>
                        <span>
                            Chorobowe: <strong>{sickLeave}</strong> 
                        </span>
                        <span>
                            Wyplata w tym ms: <strong>{salary} zł</strong> 
                        </span>
                        <span>
                            Nie uwzgednionych dni: <strong>{notRegistred}</strong> 
                        </span>
                    </div>
                </div>
            }
        >
            <svg
                onMouseEnter={() => calculateEmployeeInformation(employee)}
                onMouseLeave={() => resetInformation()}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="absolute inset-y-1 right-2 h-5 w-5 cursor-pointer text-blue-gray-500"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                />
            </svg>
        </Tooltip>
    );
})

export default TooltipWithHelperIcon;