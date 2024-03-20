import React, { useState, useRef, Dispatch, SetStateAction } from 'react';
import { addNewEmployee } from '@/app/api/employee';
import { useAppDispatch, useAppSelector } from '@/components/hooks/store';
import { updateMonth } from '../../../../slices/scheduleSlice';
import CreateEmployee from '@/components/newMonth/CreateEmployee';
import { update } from '../../../../slices/notificationSlice';

interface IModal {
  changeModal: Dispatch<SetStateAction<boolean>>
}

const AddEmployee = React.memo(({ changeModal }: IModal) => {
  const {personel, month, year} = useAppSelector(store => store.scheduleSlice);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  
  const handleAddEmployee = async (name: string, position: string) => {
    try {
      await addNewEmployee(personel._id, {
        hours_worked: 0,
        name: name,
        position: position,
        work_time: []
      });    
      dispatch(updateMonth({month: month, year: year}));
      changeModal(false);
      dispatch(update('Dodano do grafiku ' + name));
    } catch (error) {
      console.error("Wystąpił problem:", error);
      dispatch(update('Wystąpił problem z dodaniem do grafiku '));
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
      <div ref={modalRef} className="p-8 border w-1/2 shadow-lg rounded-md bg-white">
          <h3 className="text-center text-2xl font-bold text-gray-900 mb-6">Dodaj nowego pracownika</h3>
          <CreateEmployee addEmployee={handleAddEmployee} />
      </div>
    </div>
  );
});

export default AddEmployee;
