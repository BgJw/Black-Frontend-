import { createSlice } from '@reduxjs/toolkit'


interface IOrderSlice {
    customerNumber: number,
}
const initialState: IOrderSlice = {
    customerNumber: 21,
}

const OrdersSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    nextOrderNumber: (state) => {
      state.customerNumber++;
    }
  }
});

export const {nextOrderNumber} = OrdersSlice.actions

export default OrdersSlice.reducer