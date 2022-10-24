import { configureStore } from "@reduxjs/toolkit";
import bovines from "../reducer/bovineReducer.js";

const reducer = {
   bovinesReducer: bovines,
  }

export const store = configureStore({
    reducer
});

export default store;
