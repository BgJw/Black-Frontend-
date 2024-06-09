import { createSlice } from "@reduxjs/toolkit";

const listDays = ["Niedziela", "Poniedzialek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota"];

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

interface IListSlice {
    day: {
        name: string;
        numb: number;
    };
    month: number;
    year: number;
}

const initialState: IListSlice = {
    day: {
        name: listDays[currentDate.getDay()],
        numb: currentDate.getDate()
    },
    month: currentMonth,
    year: currentYear
};

const ListSlice = createSlice({
    name: 'listSlice',
    initialState,
    reducers: {
        nextDay: (state) => {
            const { day, month, year } = state;
            const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();

            if (day.numb < daysInCurrentMonth) {
                state.day.numb += 1;
            } else {
                state.day.numb = 1;
                state.month = (month + 1) % 12;
                state.year = month === 11 ? year + 1 : year;
            }
            state.day.name = listDays[new Date(state.year, state.month, state.day.numb).getDay()];
        },
        prevDay: (state) => {
            const { day, month, year } = state;

            if (day.numb > 1) {
                state.day.numb -= 1;
            } else {
                const prevMonth = month === 0 ? 11 : month - 1;
                const prevYear = month === 0 ? year - 1 : year;
                state.day.numb = new Date(prevYear, prevMonth + 1, 0).getDate();
                state.month = prevMonth;
                state.year = prevYear;
            }
            state.day.name = listDays[new Date(state.year, state.month, state.day.numb).getDay()];
        },
        resetDay: (state) => {
            state.day.numb = currentDate.getDate();
            state.month = currentMonth;
            state.year = currentYear;
            state.day.name = listDays[currentDate.getDay()];
        }
    }
});

export const { nextDay, prevDay, resetDay } = ListSlice.actions;

export default ListSlice.reducer;
