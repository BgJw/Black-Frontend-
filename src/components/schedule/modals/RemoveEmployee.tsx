import { useAppDispatch, useAppSelector } from '@/components/hooks/store';
import { useState, useRef, Dispatch, SetStateAction } from 'react';
import { IEmployees } from '../../../../slices/types';
import { removeEmployee } from '@/app/api/employee';
import { updateMonth } from '../../../../slices/scheduleSlice';
import { update } from '../../../../slices/notificationSlice';

const EmployeeDeleteModal = ({ changeModal }: { changeModal: Dispatch<SetStateAction<boolean>> }) => {
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployees | null>(null);
  const {personel, month, year} = useAppSelector(store => store.scheduleSlice);
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  

  const handleDelete = async () => {
    if (selectedEmployee) {
      try {
        setSelectedEmployee(null);
        await removeEmployee(personel._id, selectedEmployee._id);
        dispatch(updateMonth({ month: month, year: year }));
        changeModal(false);
        dispatch(update('usunięty z grafiku ' + selectedEmployee.name));
      } catch (error) {
        console.error("Wystąpił problem:", error);
        dispatch(update('Wystąpił problem z usunięciem z grafiku'));
      }
    }
  };
  

  return (
    <div
      onClick={(e) => {
        const target = e.target as Element;
        if (!modalRef.current?.contains(target)) {
          changeModal(false);
        }
      }}
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-10"
    >
      <aside ref={modalRef} className="p-8 border w-106 shadow-lg rounded-md bg-white">
        <center className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Wybierz pracownika do usuniecia z grafiku</h3>
          <ul className='gap-0.5'>
            {personel.employees ?
              personel.employees.map((employee) => (
                <li key={employee._id}>
                  <button
                    className='disabled:bg-red-500 disabled:text-white w-full hover:opacity-75 disabled:opacity-100 border rounded-md'
                    disabled={employee === selectedEmployee}
                    onClick={() => setSelectedEmployee(employee)}>
                    {employee.name}

                  </button>
                </li>
              )) : null}
          </ul>
          <footer className="flex justify-center mt-4">
            <button
              type="button"
              onClick={handleDelete}
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                Usunąć
            </button>
            <button
              type="button"
              onClick={() => changeModal(false)}
              className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">                
              Wrocić
            </button>
          </footer>
        </center>
      </aside>
    </div>
  );
};

export default EmployeeDeleteModal;
