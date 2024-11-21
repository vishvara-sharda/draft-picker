// src/features/draftSlice.js
import { createSlice } from "@reduxjs/toolkit";
import socket from "../utils/socket";

const initialState = {
  actionOrder: [
    { player: 1, actionType: "ban", index: 0 },
    { player: 6, actionType: "ban", index: 1 },
    { player: 2, actionType: "ban", index: 2 },
    { player: 7, actionType: "ban", index: 3 },
    { player: 3, actionType: "ban", index: 4 },
    { player: 8, actionType: "ban", index: 5 },
    { player: 1, actionType: "pick", index: 6 },
    [
      { player: 6, actionType: "pick", index: 7 },
      { player: 7, actionType: "pick", index: 7 },
    ],
    [
      { player: 2, actionType: "pick", index: 8 },
      { player: 3, actionType: "pick", index: 8 },
    ],
    { player: 8, actionType: "pick", index: 9 },
    { player: 9, actionType: "ban", index: 10 },
    { player: 4, actionType: "ban", index: 11 },
    { player: 10, actionType: "ban", index: 12 },
    { player: 5, actionType: "ban", index: 13 },
    { player: 9, actionType: "pick", index: 14 },
    [
      { player: 4, actionType: "pick", index: 15 },
      { player: 5, actionType: "pick", index: 15 },
    ],
    { player: 10, actionType: "pick", index: 16 },
  ],
  currentActionIndex: 0,
  picks: [],
  bans: [],
};

const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    performAction: (state, action) => {
      const { actionType, heroId, player } = action.payload;
      if (actionType === "pick") state.picks.push({ heroId, player });
      else if (actionType === "ban") state.bans.push({ heroId, player });

      state.currentActionIndex++;
      socket.emit("updateDraft", state);
    },
    syncDraft: (state, action) => {
      return action.payload;
    },
  },
});

export const { performAction, syncDraft } = draftSlice.actions;

export default draftSlice.reducer;
