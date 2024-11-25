import { createSlice } from "@reduxjs/toolkit";

const customersSlice = createSlice({
  name: "customers",
  initialState: [],
  reducers: {
    addCustomer: (state, action) => {
      state.push(action.payload);
    },
    updateCustomer: (state, action) => {
      const index = state.findIndex(customer => customer.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
  },
});

export const { addCustomer, updateCustomer } = customersSlice.actions;
export default customersSlice.reducer;
