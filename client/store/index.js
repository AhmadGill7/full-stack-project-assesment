import { configureStore } from "@reduxjs/toolkit";
import logger from "thunk-logger";
import tasksReducer from "./tasksSlice";

export const store = configureStore({
  reducer: {
    tasks: tasksReducer
  },
  middleware: (getDefaultMiddleware) => {
     
    return getDefaultMiddleware().concat(logger);
  }
});
