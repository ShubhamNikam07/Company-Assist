import { createSlice } from "@reduxjs/toolkit";

const CardDataSlice = createSlice({
  name: "Cards",
  initialState: {
    cardData: [],
  },
  reducers: {
    updateCards: (state, action) => {
      state.cardData = action.payload;
    },
  },
});

export const{updateCards} = CardDataSlice.actions;

export default CardDataSlice.reducer;
