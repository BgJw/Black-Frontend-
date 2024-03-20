'use client'
import React, { useState } from 'react';
import { IEmployees, IPersonel } from '../../../../slices/types';
import Header from '@/components/newMonth/Header';
import MyInput from '@/components/myInput/MyInput';
import { useAppDispatch, useAppSelector } from '@/components/hooks/store';
import MySelect from '@/components/mySelect/MySelect';
import { monthNames } from '../../../../slices/scheduleSlice';
import CreateEmployee from '@/components/newMonth/CreateEmployee';
import ListsNewEmployee from '@/components/newMonth/ListsNewEmployee';
import { Tooltip } from '@material-tailwind/react';
import { useSession } from 'next-auth/react';
import { addNewMonth } from '@/app/api/month';
import { update } from '../../../../slices/notificationSlice';
import Notification from '@/components/notification/Notification';
import useModal from '@/components/hooks/useModal';

const NewMonth = () => {
    const currentYear = useAppSelector(state => state.scheduleSlice.year);
    const { data } = useSession();
    const [year, setYear] = useState<string>(String(currentYear) || '');
    const [month, setMonth] = useState('');
    const [employees, setEmployees] = useState<Partial<IEmployees>[]>([]);
    const {isOpen, openModal, closeModal } = useModal();
    const dispatсh = useAppDispatch();

    const handleYearChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setYear(e.target.value);
    };

    const handleMonthChange = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setMonth(e.target.value);
    };

    const handleAddEmployee = (name: string, position: string) => {
        const employee: Partial<IEmployees> = {
            hours_worked: 0,
            name: name,
            position: position,
            work_time: []
        }
        setEmployees([...employees, employee]);
        dispatсh(update('Dodano do grafiku ' + name));

    };
    const handleRemoveEmployee = (index: number) => {
        const filter = employees.filter((_, i) => i !== index);
        setEmployees(filter);
        dispatсh(update('Usunieto z grafiku ' + employees[index].name));
    }

    const fetchNewMonth = async () => {
        
        const newMonth: Partial<IPersonel> = {
            department: String(data?.user?.name),
            employees: employees as IEmployees[],
            month: month,
            year: Number(year),
        }
            if (newMonth.department && newMonth.month && newMonth.year && newMonth.month !== 'Mięsiąc') {
                const res = await addNewMonth(newMonth);
                console.log(res.message);
                if (res.success) {
                    dispatсh(update('Stworzony nowy grafik, mieśiąc: ' + month));
                    setEmployees([]);
                } else {
                    dispatсh(update(res.message));
                }
            } else {
                dispatсh(update('Wypęlnij wszystkie niezbedne pola'));
            }
            
    }
    return (
        <div className='sm:m-auto md:m-0 flex flex-col items-center relative'>
            <Header />
            <Notification />
            <div className='mb-2 flex items-center justify-center relative'> {/* Разделение на две колонки */}
                <div className='grid gap-4 md:grid-cols-2 justify-items-center'>
                    <MyInput name={'Rok'} onChange={handleYearChange} value={year} />
                    <MySelect name={'Mięsiąc'} options={monthNames} onChange={handleMonthChange} />
                </div>
                <Tooltip placement={"right-start"} content="Dodaj pracownika" className="border rounded-md border-blue-gray-50 bg-white px-2 py-2 shadow-xl shadow-black/10 text-black text-xs">
                    <button
                        type="button"
                        className="absolute right-[-75px] top-[28px] text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 disabled:opacity-50 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => openModal()}
                        disabled={isOpen}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </button>
                </Tooltip>
            </div>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700 w-1/2" />
            {
                isOpen && <CreateEmployee addEmployee={handleAddEmployee} setShow={closeModal} />
            }
            <ListsNewEmployee employee={employees} removeEmployee={handleRemoveEmployee} />

            <button
                type="button"
                className="focus:outline-none w-96 text-white mt-12 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={ fetchNewMonth }
            >
                Stwórz
            </button>

        </div>



    );
};

export default NewMonth;
