import { IBattleResult } from "@/interfaces/IBattle"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState: IBattleResult = {
  files: [],
  totalItems: 0,
}

export const battle = createSlice({
  name: "battle",
  initialState,
  reducers: {
    reset: () => initialState,
    setBattleResult: (state, action: PayloadAction<IBattleResult>) => {
      return { state, ...action.payload }
    },
  },
})

export const { setBattleResult, reset } = battle.actions
export default battle.reducer
