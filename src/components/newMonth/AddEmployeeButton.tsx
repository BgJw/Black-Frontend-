import { Tooltip } from "@material-tailwind/react";
import { FC, memo } from "react";

interface IAddEmployeeButton {
    openModal: () => void,
    isOpen: boolean,

}
const AddEmployeeButton: FC<IAddEmployeeButton> = memo(({isOpen, openModal}) => {
    return (
        <Tooltip placement={"right-start"} content="Dodaj pracownika" className="border rounded-md border-blue-gray-50 bg-white px-2 py-2 shadow-xl shadow-black/10 text-black text-xs">
        <button
            type="button"
            className="absolute right-[-75px] top-[28px] flex items-center text-white bg-blue-700 h-8 md:h-auto hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 disabled:opacity-50 me-2 mb-2 focus:outline-none dark:focus:ring-blue-800"
            onClick={openModal}
            disabled={isOpen}
        >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z" />
            </svg>
        </button>
    </Tooltip>
    );
});

export default AddEmployeeButton;