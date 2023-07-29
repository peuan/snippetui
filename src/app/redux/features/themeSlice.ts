import { Itheme } from "@/interfaces/Itheme"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: Itheme = {
  theme: "system",
}

export const theme = createSlice({
  name: "theme",
  initialState,
  reducers: {
    reset: () => initialState,
    setGlobalTheme: (state, action: PayloadAction<Itheme>) => {
      return { state, ...action.payload }
    },
  },
})

export const { setGlobalTheme, reset } = theme.actions
export default theme.reducer
