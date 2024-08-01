'use client'
import { lazy, Suspense, useState } from 'react';
import { IEmployees, IPersonel } from '../../../slices/types';
import Header from '@/components/newMonth/Header';
import MyInput from '@/components/myInput';
import { useAppDispatch, useAppSelector } from '@/hooks/store';
import MySelect from '@/components/mySelect';
import { monthNames } from '../../../slices/scheduleSlice';
import { addNewMonth } from '@/app/api/month';
import { update } from '../../../slices/notificationSlice';
import Notification from '@/components/notification';
import useModal from '@/hooks/useModal';
import { useSession } from 'next-auth/react';
import AddEmployeeButton from '@/components/newMonth/AddEmployeeButton';

const CreateEmployee = lazy(() => import('@/components/newMonth/CreateEmployee'));
const ListsNewEmployee = lazy(() => import('@/components/newMonth/ListsNewEmployee'));



const NewMonth = () => {
    const currentYear = useAppSelector(state => state.scheduleSlice.year);
    const [year, setYear] = useState<string>(String(currentYear) || '');
    const [month, setMonth] = useState('');
    const [employees, setEmployees] = useState<Partial<IEmployees>[]>([]);
    const {isOpen, openModal, closeModal } = useModal();
    const {data} = useSession();
    const dispatch = useAppDispatch();
    


    const handleAddEmployee = (name: string, position: string) => {
        const employee: Partial<IEmployees> = {
            hours_worked: 0,
            name: name,
            position: position,
            work_time: []
        }
        setEmployees([...employees, employee]);
        dispatch(update('Dodano do grafiku ' + name));

    };
    const handleRemoveEmployee = (index: number) => {
        const filter = employees.filter((_, i) => i !== index);
        setEmployees(filter);
        dispatch(update('Usunieto z grafiku ' + employees[index].name));
    }

    const fetchNewMonth = async () => {
        if (!data?.user?.name) {
            dispatch(update('Nie znaleziono sesji'));
            return;
        }
        const newMonth: Partial<IPersonel> = {
            department: data.user.name,
            employees: employees as IEmployees[],
            month: month,
            year: Number(year),
        }
            if (newMonth.department && newMonth.month && newMonth.year && newMonth.month !== 'Mięsiąc') {
                const res = await addNewMonth(newMonth);
                if (res.success) {
                    dispatch(update('Stworzony nowy grafik, mieśiąc: ' + month));
                    setEmployees([]);
                } else {
                    dispatch(update(res.message));
                }
            } else {
                dispatch(update('Wypęlnij wszystkie niezbedne pola'));
            }
            
            
    }
    return (
        <div className='sm:m-auto md:m-0 flex flex-col items-center relative'>
            <Header />
            <Notification />
            <div className='mb-2 flex items-center justify-center relative' >
                <div className='grid gap-4 md:grid-cols-2 justify-items-center'>
                    <MyInput name={'Rok'} setValue={setYear} value={year} />
                    <MySelect name={'Mięsiąc'} options={monthNames} setValue={setMonth} />
                </div>
                <AddEmployeeButton isOpen={isOpen} openModal={openModal} />
            </div>
            <hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700 w-1/2" />
            <Suspense>
                <CreateEmployee addEmployee={handleAddEmployee} setShow={closeModal} isOpen={isOpen}/>
                <ListsNewEmployee employee={employees} removeEmployee={handleRemoveEmployee} />
            </Suspense>    
            <button
                type="button"
                className="focus:outline-none w-96 text-white mt-12 bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                onClick={ fetchNewMonth }
            >
                Stwórz
            </button>

        </div>



    );
};

export default NewMonth;

