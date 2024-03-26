import { PayloadAction, createSlice } from "@reduxjs/toolkit";



interface INotificationSlice {
    text: string
}

const initialState: INotificationSlice = {
    text: ''
};

const NotificationSlice = createSlice({
    name: 'NotificationSlice',
    initialState,
    reducers: {
        update: (state, action: PayloadAction<string>) => {
            state.text = action.payload;
        },
        removeText: (state) => {
            state.text = '';
        }  

    }
});

export const { update, removeText } = NotificationSlice.actions;

export default NotificationSlice.reducer;
