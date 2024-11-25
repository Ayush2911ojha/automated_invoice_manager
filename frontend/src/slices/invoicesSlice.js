import { createSlice } from "@reduxjs/toolkit";

const invoicesSlice = createSlice({
  name: "invoices",
  initialState: [],
  reducers: {
    addInvoice: (state, action) => {
      state.push(action.payload);
    },
    updateInvoice: (state, action) => {
      const index = state.findIndex(invoice => invoice.id === action.payload.id);
      if (index !== -1) state[index] = action.payload;
    },
  },
});

export const { addInvoice, updateInvoice } = invoicesSlice.actions;
export default invoicesSlice.reducer;
