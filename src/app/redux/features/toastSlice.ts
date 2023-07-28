import { IToast } from "@/interfaces/IToast"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IToast = {
  title: "",
  message: "",
  status: 500,
}

export const toast = createSlice({
  name: "toast",
  initialState,
  reducers: {
    reset: () => initialState,
    setToast: (state, action: PayloadAction<IToast>) => {
      return { state, ...action.payload }
    },
  },
})

export const { setToast, reset } = toast.actions
export default toast.reducer
