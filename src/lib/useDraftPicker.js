import { useDispatch, useSelector } from 'react-redux';
import {
  updateTeam1Picks,
  updateTeam2Picks,
  updateTeam1Bans,
  updateTeam2Bans,
  updateNicknames,
  updateTeamNames,
  updateTeamLogos,
  updateTournamentName,
  updateTimer,
  updatePhase,
  updateTeam1Wins,
  updateTeam2Wins,
  updateCurrentStep,
  loadStoredData,
} from './draftPickerSlice';
import { useCallback } from 'react';

export const useDraftPicker = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.draftPicker);

  const onUpdateTeam1Picks = useCallback((picks) => {
    dispatch(updateTeam1Picks(picks));
  }, [dispatch]);

  const onUpdateTeam2Picks = useCallback((picks) => {
    dispatch(updateTeam2Picks(picks));
  }, [dispatch]);

  const onUpdateTeam1Bans = useCallback((bans) => {
    dispatch(updateTeam1Bans(bans));
  }, [dispatch]);

  const onUpdateTeam2Bans = useCallback((bans) => {
    dispatch(updateTeam2Bans(bans));
  }, [dispatch]);

  const onUpdateNicknames = useCallback((nicknames) => {
    dispatch(updateNicknames(nicknames));
  }, [dispatch]);

  const onUpdateTeamNames = useCallback((names) => {
    dispatch(updateTeamNames(names));
  }, [dispatch]);

  const onUpdateTeamLogos = useCallback((logos) => {
    dispatch(updateTeamLogos(logos));
  }, [dispatch]);

  const onUpdateTournamentName = useCallback((name) => {
    dispatch(updateTournamentName(name));
  }, [dispatch]);

  const onUpdateTimer = useCallback((timer) => {
    dispatch(updateTimer(timer));
  }, [dispatch]);

  const onUpdatePhase = useCallback((phase) => {
    dispatch(updatePhase(phase));
  }, [dispatch]);

  const onUpdateTeam1Wins = useCallback((wins) => {
    dispatch(updateTeam1Wins(wins));
  }, [dispatch]);

  const onUpdateTeam2Wins = useCallback((wins) => {
    dispatch(updateTeam2Wins(wins));
  }, [dispatch]);

  const onUpdateCurrentStep = useCallback((step) => {
    dispatch(updateCurrentStep(step));
  }, [dispatch]);

  const onLoadStoredData = useCallback((data) => {
    dispatch(loadStoredData(data));
  }, [dispatch]);

  return {
    ...state,
    onUpdateTeam1Picks,
    onUpdateTeam2Picks,
    onUpdateTeam1Bans,
    onUpdateTeam2Bans,
    onUpdateNicknames,
    onUpdateTeamNames,
    onUpdateTeamLogos,
    onUpdateTournamentName,
    onUpdateTimer,
    onUpdatePhase,
    onUpdateTeam1Wins,
    onUpdateTeam2Wins,
    onUpdateCurrentStep,
    onLoadStoredData,
  };
};