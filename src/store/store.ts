import { configureStore } from '@reduxjs/toolkit';
import listSlice from '@/slices/listSlice';
import notificationSlice from '@/slices/notificationSlice';
import scheduleSlice from '@/slices/scheduleSlice';
import ordersSlice from '@/slices/ordersSlice';


const store = configureStore({
    reducer: {
        scheduleSlice,
        listSlice,
        notificationSlice,
        ordersSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;