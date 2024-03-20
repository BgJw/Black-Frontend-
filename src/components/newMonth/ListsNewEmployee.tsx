import React from 'react';
import { IEmployees } from '../../../slices/types';

const ListsNewEmployee = ({ employee, removeEmployee }: { employee: Partial<IEmployees>[], removeEmployee: (index: number) => void }) => {
    return (
        <>
            <h2 className="mb-2 mt-2 text-lg font-semibold text-gray-900">Pracownicy:</h2>
            <ol className="max-w-md space-y-1 text-gray-500 list-decimal list-inside">
                {
                    employee.length  ? employee.map(({ name, _id }, i) => (
                        <li key={_id} className='flex justify-between items-baseline text-center text-lg w-min-[200px]'>
                            <span className="font-semibold text-gray-900 mr-2">{name}</span>
                            <button
                                onClick={ () => removeEmployee(i)}
                                type="button" 
                                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-small rounded-md text-xs px-2 me-2 mb-2">
                                    X
                            </button>

                        </li>

                    ))
                    :
                        <span className='text-xs opacity-50'>Jeszcze nikogo nie dodano</span>
                }

            </ol>

        </>
    );
};

export default ListsNewEmployee;