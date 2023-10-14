import { IContributor } from "@/interfaces/IContributor"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IContributor = {
  contributors: [],
}

export const github = createSlice({
  name: "github",
  initialState,
  reducers: {
    reset: () => initialState,
    setContributorResult: (state, action: PayloadAction<IContributor>) => {
      return { ...state, ...action.payload }
    },
  },
})

export const { setContributorResult, reset } = github.actions
export default github.reducer
