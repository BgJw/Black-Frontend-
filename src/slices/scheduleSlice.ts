import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPersonel, IScheduleSlice, Status } from "./types";
import { SERVER_PORT } from "@/app/api/handleApiRequest";

interface Ifetch {
    department: string,
    month: string, 
    year: number
}

export const fetchMonth = createAsyncThunk(
    'schedule/fetchMonth',
    async ({department, month, year}: Ifetch ) => {
        try {
            const res = await fetch(`${SERVER_PORT}/months/${department}/${month}/${year}`);
            return await res.json();
            
        } catch (error) {
            return (error as Error).message;
        }
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



const initialState: IScheduleSlice = {
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
        builder.addCase(fetchMonth.pending, state => {
            state.status = Status.loading;
        });
        builder.addCase(fetchMonth.fulfilled, (state, action: PayloadAction<IPersonel | string>) => {
            
            if (typeof action.payload === 'string') {
                state.status = Status.notFound;
              } else {
                state.status = Status.idle;
                state.personel = action.payload;
              }
        });
        builder.addCase(fetchMonth.rejected, state => {
            state.status = Status.error;            
        });
         
    }

});

export const { prevMonth, nextMonth, resetMonth, updateMonth} = ScheduleSlice.actions;

export default ScheduleSlice.reducer;