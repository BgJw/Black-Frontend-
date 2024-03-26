import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPersonel, ScheduleSlice, Status } from "./types";

interface Ifetch {
    department: string,
    month: string, 
    year: number
}


export const fetchMonth = createAsyncThunk(
    'schedule/fetchMonth',
    async ({department, month, year}: Ifetch ) => {
        const responce = await fetch(`http://localhost:5000/months/${department}/${month}/${year}`);
        return await responce.json();
    }
)
export const monthNames = [
    "Styczeń", "Luty", "Marzec", "Kwiecień",
    "Maj", "Czerwiec", "Lipiec", "Sierpień",
    "Wrzesień", "Październik", "Listopad", "Grudzień"
];
const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();
const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();



const initialState: ScheduleSlice = {
    month: {
        name: monthNames[currentMonth - 1],
        numb: currentMonth,
    },
    year: currentYear,
    status: Status.loading,
    personel: {} as IPersonel
};


const ScheduleSlice = createSlice({
    name: 'scheduleSlice',
    initialState,
    reducers: {
        nextMonth: (state) => {
            const newYear = state.month.numb === 12 ? state.year + 1 : state.year;
            const newMonthNumb = state.month.numb < 12 ? state.month.numb + 1 : 1;
        
            return {
                ...state,
                month: {
                    name: monthNames[newMonthNumb - 1],
                    numb: newMonthNumb,
                },
                year: newYear,
            };
        },
        prevMonth: (state) => {
            const newMonthNumb = state.month.numb > 1 ? state.month.numb - 1 : 12;
            const newYear = state.month.numb === 1 ? state.year - 1 : state.year;
        
            return {
                ...state,
                month: {
                    name: monthNames[newMonthNumb -1 ],
                    numb: newMonthNumb,
                },
                year: newYear,
            };
        },
        resetMonth: (state) => {
            return {
                ...state,
                    year: currentYear,
                    month: {
                        name: monthNames[currentMonth - 1],
                        numb: currentMonth
                    }
            }
        },
        updateMonth: (state, action: PayloadAction<{month: {name:string, numb: number}, year: number}>) => {
            return {
                ...state,
                    year: action.payload.year,
                    month: {
                        name: action.payload.month.name,
                        numb: action.payload.month.numb
                    }
            }
        },
    },
    extraReducers: builder => {
        builder.addCase(fetchMonth.pending, (state) => {
            state.status = Status.loading;
        });
        builder.addCase(fetchMonth.fulfilled, (state, action: PayloadAction<IPersonel>) => {
            state.status = Status.idle;
            state.personel = action.payload;
        });
        builder.addCase(fetchMonth.rejected, state => {
            state.status = Status.error;            
        });
         
    }

});

export const { prevMonth, nextMonth, resetMonth, updateMonth} = ScheduleSlice.actions;

export default ScheduleSlice.reducer;