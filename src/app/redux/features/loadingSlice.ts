import { ILoading } from "@/interfaces/ILoading"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ILoading = {
  isLoading: false,
}

export const loading = createSlice({
  name: "loading",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading: (state, action: PayloadAction<ILoading>) => {
      return { state, ...action.payload }
    },
  },
})

export const { setLoading, reset } = loading.actions
export default loading.reducer
