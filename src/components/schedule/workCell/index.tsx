'use client'
import { Tooltip } from "@material-tailwind/react";
import { IWorkTime } from "../../../slices/types";
import React, { useState } from "react";
import { addWorkDay, changeTime } from "@/app/api/employee";
import { updateMonth } from "../../../slices/scheduleSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { update } from "../../../slices/notificationSlice";



import s from './WorkCell.module.scss';


interface IWorkCell {
    workTime: IWorkTime | undefined,
    employeeId: string,
    monthId: string,
    emptyDay: number,
}


const WorkCell = React.memo(({ workTime, employeeId, monthId, emptyDay }: IWorkCell) => {
    const { month, year } = useAppSelector(state => state.scheduleSlice);
    const [disabled, setDisabled] = useState(true);
    const [value, setValue] = useState(workTime !== undefined ? workTime.time : 'Brak');
    const dispatch = useAppDispatch();

    const isValid = (str: string): boolean => /^(L4|U|-|(\d{1,2})-(\d{1,2}))$/i.test(str);
    

    const fetchTime = async (value: string) => {
        try {
            if (workTime === undefined) {
                await addWorkDay(monthId, employeeId, emptyDay, value);
                dispatch(update('Dodane godziny pracy'))
                
            } else {
                await changeTime(monthId, employeeId, String(workTime?._id), { time: value });
                dispatch(update('Zmienione godziny pracy'));
            }

            dispatch(updateMonth({ month: month, year: year }));
        } catch (error) {
            console.error('Error, pls change work time later', error);
            dispatch(update('Coś poszło nie tak, sprobuj pózniej'));
        }
    };


    const handleKeyUp = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        e.preventDefault();
        const target = e.target as HTMLInputElement;

        if (e.key === 'Enter' && !disabled) {
            if (isValid(target.value)) {
                await fetchTime(target.value);
                disabled && setValue('');
                value && setDisabled(!disabled);
            }
        }
    };
    const handleTooltipClick = async () => {
        if (value && !disabled) {
            if (isValid(value)) {
                await fetchTime(value);
                disabled && setValue('');
                value && setDisabled(!disabled);
            }
        } else {
            disabled && setValue('');
            value && setDisabled(!disabled);
        }
    };

    const errorBorder = !disabled ? ' border border-red-300 rounded-lg ': ' rounded-none ';

    return (
        <td
            className={s.hover + ' md:px-6 px-3 md:py-3 py-2 relative ' + errorBorder}>
            <input
                type="text"
                value={value.toUpperCase()}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
                className={s.input + ' bg-transparent text-center border-transparent text-white w-full'}
                onKeyUp={e => handleKeyUp(e)}
            />
            <Tooltip content="Zminenić czas" className="border rounded-md border-blue-gray-50 bg-white px-2 py-2 shadow-xl shadow-black/10 text-black text-xs">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                    className="w-4 h-4 absolute md:inset-y-6 inset-y-2 md:right-10 right-2 cursor-pointer opacity-25 "
                    onClick={handleTooltipClick}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
            </Tooltip>
        </td>
    )
});

export default WorkCell;