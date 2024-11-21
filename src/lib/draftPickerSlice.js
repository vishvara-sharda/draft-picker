import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  team1Picks: Array(5).fill(null),
  team2Picks: Array(5).fill(null),
  team1Bans: Array(5).fill(null),
  team2Bans: Array(5).fill(null),
  teamNames: ["Team 1", "Team 2"],
  teamLogos: [null, null],
  tournamentName: "",
  nicknames: Array(10).fill(""),
  timer: "00:00",
  phase: "Drafting",
  team1Wins: Array(3).fill(false),
  team2Wins: Array(3).fill(false),
  currentStep: 0,
};

const draftPickerSlice = createSlice({
  name: "draftPicker",
  initialState,
  reducers: {
    updateTeam1Picks: (state, action) => {
      state.team1Picks = action.payload;
    },
    updateTeam2Picks: (state, action) => {
      state.team2Picks = action.payload;
    },
    updateTeam1Bans: (state, action) => {
      state.team1Bans = action.payload;
    },
    updateTeam2Bans: (state, action) => {
      state.team2Bans = action.payload;
    },
    updateTeamNames: (state, action) => {
      state.teamNames = action.payload;
    },
    updateTeamLogos: (state, action) => {
      state.teamLogos = action.payload;
    },
    updateTournamentName: (state, action) => {
      state.tournamentName = action.payload;
    },
    updateNicknames: (state, action) => {
      state.nicknames = action.payload;
    },
    updateTimer: (state, action) => {
      state.timer = action.payload;
    },
    updatePhase: (state, action) => {
      state.phase = action.payload;
    },
    updateTeam1Wins: (state, action) => {
      state.team1Wins = action.payload;
    },
    updateTeam2Wins: (state, action) => {
      state.team2Wins = action.payload;
    },
    updateCurrentStep: (state, action) => {
      state.currentStep = action.payload;
    },
    resetAll: (state) => {
      return initialState;
    },
    loadStoredData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  updateTeam1Picks,
  updateTeam2Picks,
  updateTeam1Bans,
  updateTeam2Bans,
  updateTeamNames,
  updateTeamLogos,
  updateTournamentName,
  updateNicknames,
  updateTimer,
  updatePhase,
  updateTeam1Wins,
  updateTeam2Wins,
  updateCurrentStep,
  resetAll,
  loadStoredData,
} = draftPickerSlice.actions;

export default draftPickerSlice.reducer;