import { useState, useEffect } from 'react';
import { useAppSelector } from './store';

function useDaysArrayInMonth() {
    const [daysArray, setDaysArray] = useState<number[]>([]);
    const month = useAppSelector( state => state.scheduleSlice.month.numb);
    const year = useAppSelector( state => state.scheduleSlice.year);


    useEffect(() => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);
        setDaysArray(days);
    }, [month, year]);

    return daysArray;
}

export default useDaysArrayInMonth;
