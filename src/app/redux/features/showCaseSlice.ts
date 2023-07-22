import { IShowCaseResult } from "@/interfaces/IShowCase";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IShowCaseResult = {
  files: [],
  totalItems: 0,
};

export const showCase = createSlice({
  name: "showCase",
  initialState,
  reducers: {
    reset: () => initialState,
    setShowCaseResult: (state, action: PayloadAction<IShowCaseResult>) => {
      return { state, ...action.payload };
    },
  },
});

export const { setShowCaseResult, reset } = showCase.actions;
export default showCase.reducer;
