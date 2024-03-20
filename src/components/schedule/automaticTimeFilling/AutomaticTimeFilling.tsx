import { useAppDispatch, useAppSelector } from "@/components/hooks/store";
import { forwardRef, useState } from "react";
import { IEmployees, IWorkTime } from "../../../../slices/types";
import { getDayOfWeek } from "@/helpers/isWeekend";
import { changeMonthWorkTime } from "@/app/api/employee";
import { updateMonth } from "../../../../slices/scheduleSlice";
import useModal from "@/components/hooks/useModal";
import { update } from "../../../../slices/notificationSlice";

const AutomaticTimeFilling = forwardRef<HTMLButtonElement>((props, ref) => {
    const { dayList, month, year } = useAppSelector(state => state.scheduleSlice);
    const { employees: listWorkTime, _id } = useAppSelector(state => state.scheduleSlice.personel);
    const [reservedEmployee, setReservedEmployee] = useState<IEmployees[]>([]);
    const { closeModal, isOpen, openModal } = useModal();
    const dispatch = useAppDispatch();

    const fillMissingDays = (workDays: Partial<IWorkTime>[]) => {
        const result: Partial<IWorkTime>[] = [];
        for (let day of dayList) {
            const isDayPresent = workDays.some(workDay => workDay.day === day);
            if (!isDayPresent) {
                result.push({ day, time: 'BRAK' });
            }
        }
        return result;
    };

    const autoGeneration = () => {
        const updatedEmployees: IEmployees[] = [];
        for (let employee of listWorkTime) {
            const workDays = employee.work_time.filter(workDay => workDay.day);
            const missingDays = fillMissingDays(workDays);
            const updatedWorkTime = [...workDays, ...missingDays];
            updatedEmployees.push({ ...employee, work_time: updatedWorkTime as IWorkTime[] });
        }
        updateList(updatedEmployees);

    };


    const updateList = async (employees: IEmployees[]) => {
        const newEmployees = employees.map((employee, index) => ({
            ...employee,
            work_time: employee.work_time.map((time, i) => {
                const isWeek = getDayOfWeek(year, month.numb, time.day) === 'Sobota' || getDayOfWeek(year, month.numb, time.day) === 'Niedziela';
                const isSaturday = getDayOfWeek(year, month.numb, time.day) === 'Sobota'
                if (isSaturday) {
                    return { ...time, time: employee.work_time[index].time !== '-' ? '9-21' : '-' };
                }
                if (isWeek) {
                    return { ...time, time: '-' };
                }
                if (time.time === 'BRAK') {
                    return { ...time, time: index % 2 === 0 ? '9-17' : '13-21' };
                }
                return time;
            })
        }));
        setReservedEmployee(listWorkTime);
        await changeMonthWorkTime(_id, newEmployees);
        dispatch(updateMonth({ month, year }));
        openModal()
    };

    return (
        <>
            {
                isOpen && (
                    <svg
                        onClick={() => {
                            changeMonthWorkTime(_id, reservedEmployee);
                            closeModal();
                            dispatch(updateMonth({ month, year }));
                            dispatch(update('Przywrócone poprzednie ustawienia grafiku'));
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute bottom-[-5px] right-4 bg-red-600 text-white rounded cursor-pointer hover:opacity-80">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                )
            }


            <button ref={ref} onClick={() => autoGeneration()} disabled={isOpen}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  hover:opacity-70">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                </svg>
            </button>
            {
                isOpen && (
                    <svg 
                        onClick={ () => {
                            closeModal();
                            dispatch(update('Zostały zmieniony godziny pracy '));
                        }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 absolute bottom-[-5px] right-[-7px] bg-green-600  text-white rounded cursor-pointer hover:opacity-80">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                )
            }


        </>
    );
});

export default AutomaticTimeFilling;