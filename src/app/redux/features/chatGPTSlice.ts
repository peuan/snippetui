import { IChatGPT } from "@/interfaces/IGPT";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IChatGPT = {
  apiKey: "",
  message: "",
};

export const chatGPT = createSlice({
  name: "chatGPT",
  initialState,
  reducers: {
    reset: () => initialState,
    setChatGPTResult: (state, action: PayloadAction<IChatGPT>) => {
      return { state, ...action.payload };
    },
    setChatGPTApiKey: (state, action: PayloadAction<IChatGPT>) => {
      state.apiKey = action.payload.apiKey;
    },
  },
});

export const { setChatGPTResult, setChatGPTApiKey, reset } = chatGPT.actions;
export default chatGPT.reducer;
