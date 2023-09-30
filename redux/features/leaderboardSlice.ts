import { ILeaderboard } from "@/interfaces/ILeaderboard"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: ILeaderboard = {
  leaderboard: [],
}

export const leaderboard = createSlice({
  name: "leaderboard",
  initialState,
  reducers: {
    reset: () => initialState,
    setLeaderboardResult: (state, action: PayloadAction<ILeaderboard>) => {
      return { state, ...action.payload }
    },
  },
})

export const { setLeaderboardResult, reset } = leaderboard.actions
export default leaderboard.reducer
