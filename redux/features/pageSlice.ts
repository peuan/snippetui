import { IPages } from "@/interfaces/IPage"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IPages = {
  page: "BATTLE",
  pageNumber: 1,
}

export const page = createSlice({
  name: "page",
  initialState,
  reducers: {
    reset: () => initialState,
    setPage: (state, action: PayloadAction<IPages>) => {
      return { state, ...action.payload }
    },
  },
})

export const { setPage, reset } = page.actions
export default page.reducer
