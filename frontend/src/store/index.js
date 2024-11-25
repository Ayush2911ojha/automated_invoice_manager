import { configureStore } from "@reduxjs/toolkit";
import invoicesReducer from "../slices/invoicesSlice";
import productsReducer from "../slices/productsSlice";
import customersReducer from "../slices/customersSlice";

const store = configureStore({
  reducer: {
    invoices: invoicesReducer,
    products: productsReducer,
    customers: customersReducer,
  },
});

export default store;
