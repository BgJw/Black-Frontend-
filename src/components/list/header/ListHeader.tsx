'use client'

import { useAppDispatch, useAppSelector } from "@/components/hooks/store";
import { nextDay, prevDay } from "../../../../slices/listSlice";


const ListHeader = () => {
    const {day, month} = useAppSelector( state => state.listSlice);
    const dispatch = useAppDispatch();

    return (
        <header className='flex w-1/2 justify-between items-center '>
                <button
                    className="hover:opacity-70"
                    onClick={ () => dispatch(prevDay()) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" h-10 w-20">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <h1 className='font-bold uppercase' >{day.name} {day.numb}.{month + 1}</h1>
                <button
                    className="hover:opacity-70"
                    onClick={() => dispatch(nextDay()) }
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className=" h-10 w-20">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z" clipRule="evenodd" />
                    </svg>
                </button>
            </header>
    );
};

export default ListHeader;