"use client"
import { Tooltip } from "@material-tailwind/react";
import { resetMonth } from "../../../slices/scheduleSlice";
import { useAppDispatch } from "@/components/hooks/store";
import dynamic from "next/dynamic";
import useModal from "@/components/hooks/useModal";
import AutomaticTimeFilling from "../automaticTimeFilling/AutomaticTimeFilling";

const DynamicModalAddEmployee = dynamic(() => import('../modals/AddEmployee'), {
    loading: () => <p>Loading...</p>,
});

const DynamicModalRemoveEmployee = dynamic(() => import('../modals/RemoveEmployee'), {
    loading: () => <p>Loading...</p>,
});


const IconControls = () => {
    const dispatch = useAppDispatch();
    const addEmployeeModal = useModal();
    const removeEmployeeModal = useModal();


    const styleTooltip = "border rounded-md border-blue-gray-50 bg-white px-2 py-2 shadow-xl shadow-black/10 text-black text-xs";

    return (
        <>
            {
                addEmployeeModal.isOpen && <DynamicModalAddEmployee changeModal={addEmployeeModal.closeModal} />
            }
            {
            removeEmployeeModal.isOpen && <DynamicModalRemoveEmployee changeModal={removeEmployeeModal.closeModal} />
            }
            <center className="flex justify-end items-center h-10 gap-3 relative">
                <Tooltip content="Wrocić do aktualnego mięsiąca" className={styleTooltip}>
                    <button
                        onClick={() => dispatch(resetMonth())}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6  hover:opacity-70">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                        </svg>
                    </button>
                </Tooltip>
                <Tooltip content="Dodaj nowego pracownika" className={styleTooltip}>
                    <button
                        onClick={() => addEmployeeModal.toggleModal() }>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 cursor-pointer  hover:opacity-70">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </button>
                </Tooltip>
                <Tooltip content="Usuń pracownika" className={styleTooltip}>
                    <button
                        onClick={() =>
                            removeEmployeeModal.toggleModal()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 hover:opacity-70">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
                        </svg>
                    </button>
                </Tooltip>
                <Tooltip content="Zgeneruj grafik" className={styleTooltip}>
                    <AutomaticTimeFilling /> 
                </Tooltip>
            </center>
        </>
    );
};

export default IconControls;