import { IPlayground } from "@/interfaces/IPlayground"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IPlayground = {
  code: "",
}

export const playground = createSlice({
  name: "playground",
  initialState,
  reducers: {
    reset: () => initialState,
    setPlaygroundResult: (state, action: PayloadAction<IPlayground>) => {
      return { state, ...action.payload }
    },
  },
})

export const { setPlaygroundResult, reset } = playground.actions
export default playground.reducer
