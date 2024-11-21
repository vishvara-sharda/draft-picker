import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import  heroes  from "../lib/HeroData";
import {
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
  updateCurrentStep,
  updateTeam1Wins,
  updateTeam2Wins,
  resetAll,
} from "../lib/draftPickerSlice";


const actionOrder = [
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
];

export default function DraftPickerControlPanel() {
  const dispatch = useDispatch();
  const {
    team1Picks,
    team2Picks,
    team1Bans,
    team2Bans,
    teamNames,
    teamLogos,
    tournamentName,
    nicknames,
    timer,
    phase,
    currentStep,
    team1Wins,
    team2Wins,
  } = useSelector((state) => state.draftPicker);


  const OpenDraftPick = () => {
    window.open('/draft-pick', 'Draft Pick', `width=1400, height=900,fullscreen=yes, scrollbars=auto`);
  };

  const [selections, setSelections] = useState(
    Array(actionOrder.length).fill(null)
  );
  const [tempSelection, setTempSelection] = useState(null);
  const [secondTempSelection, setSecondTempSelection] = useState(null);
  const [secondInput, setSecondInput] = useState(false);

  useEffect(() => {
    if (currentStep < actionOrder.length) {
      if (isSimultaneousPick()) {
        setSecondInput(true);
      } else {
        setSecondInput(false);
      }
    }
  }, [currentStep]);

  const handleSelection = (heroId) => {
    setTempSelection(Number(heroId));
  };

  const handleSelectionSecond = (heroId) => {
    setSecondTempSelection(Number(heroId));
  };

  const confirmSelection = () => {
    const newSelections = [...selections];
    const newTeam1Picks = [...team1Picks];
    const newTeam2Picks = [...team2Picks];
    const newTeam1Bans = [...team1Bans];
    const newTeam2Bans = [...team2Bans];
    const currentAction = Array.isArray(actionOrder[currentStep])
      ? actionOrder[currentStep][0]
      : actionOrder[currentStep];
  
    const currentIndex = Array.isArray(actionOrder[currentStep])
      ? actionOrder[currentStep][0].index
      : currentAction.index;
  
    const simultaneousActions = actionOrder.filter((action) =>
      Array.isArray(action)
        ? action.some((a) => a.index === currentIndex)
        : action.index === currentIndex
    );
  
    const heroId = tempSelection;
  
    simultaneousActions.forEach((action) => {
      if (Array.isArray(action)) {
        const bothPicks = [tempSelection, secondTempSelection];
  
        action.forEach((subAction, index) => {
          const stepIndex = actionOrder.findIndex((a) =>
            Array.isArray(a)
              ? a.some(
                  (sa) =>
                    sa.player === subAction.player &&
                    sa.index === subAction.index
                )
              : a.player === subAction.player && a.index === subAction.index
          );
          newSelections[stepIndex] = bothPicks[index];
          if (subAction.actionType === "pick") {
            if (subAction.player <= 5) {
              newTeam1Picks[subAction.player - 1] = bothPicks[index];
            } else {
              newTeam2Picks[subAction.player - 6] = bothPicks[index];
            }
          } else {
            if (subAction.player <= 5) {
              newTeam1Bans[subAction.index % 5] = bothPicks[index];
            } else {
              newTeam2Bans[subAction.index % 5] = bothPicks[index];
            }
          }
        });
        setSecondInput(false);
      } else {
        setSecondInput(false);
        const stepIndex = actionOrder.findIndex((a) =>
          Array.isArray(a)
            ? a.some(
                (sa) => sa.player === action.player && sa.index === action.index
              )
            : a.player === action.player && a.index === action.index
        );
        newSelections[stepIndex] = heroId;
        if (action.actionType === "pick") {
          if (action.player <= 5) {
            newTeam1Picks[action.player - 1] = heroId;
          } else {
            newTeam2Picks[action.player - 6] = heroId;
          }
        } else {
          if (action.player <= 5) {
            newTeam1Bans[action.player - 1] = heroId;
          } else {
            newTeam2Bans[action.player - 6] = heroId;
          }
        }
      }
    });
  
    setSelections(newSelections);
    setTempSelection(null);
    alert("Hero Selected");
    dispatch(updateCurrentStep(currentStep + simultaneousActions.length));
    dispatch(updateTeam1Picks(newTeam1Picks));
    dispatch(updateTeam2Picks(newTeam2Picks));
    dispatch(updateTeam1Bans(newTeam1Bans));
    dispatch(updateTeam2Bans(newTeam2Bans));
  };

  const isSimultaneousPick = () => {
    return Array.isArray(actionOrder[currentStep]);
  };

  const handleTeamNameChange = (index, name) => {
    const newTeamNames = [...teamNames];
    newTeamNames[index] = name;
    dispatch(updateTeamNames(newTeamNames));
  };

  const handleTeamLogoChange = (index, event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newTeamLogos = [...teamLogos];
        newTeamLogos[index] = e.target?.result;
        dispatch(updateTeamLogos(newTeamLogos));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNicknameChange = (index, name) => {
    const newNicknames = [...nicknames];
    newNicknames[index] = name;
    dispatch(updateNicknames(newNicknames));
  };

  const resetPicks = () => {
    dispatch(updateTeam1Picks(Array(5).fill(null)));
    dispatch(updateTeam2Picks(Array(5).fill(null)));
  };

  const resetBans = () => {
    dispatch(updateTeam1Bans(Array(5).fill(null)));
    dispatch(updateTeam2Bans(Array(5).fill(null)));
  };

  const resetNicknames = () => dispatch(updateNicknames(Array(10).fill("")));

  const switchNicknames = () => {
    const newNicknames = [...nicknames.slice(5), ...nicknames.slice(0, 5)];
    dispatch(updateNicknames(newNicknames));
  };

  const switchTeams = () => {
    dispatch(updateTeamNames([teamNames[1], teamNames[0]]));
    dispatch(updateTeamLogos([teamLogos[1], teamLogos[0]]));
    dispatch(
      updateNicknames([...nicknames.slice(5), ...nicknames.slice(0, 5)])
    );
  };

  const handleResetAll = () => {
    dispatch(resetAll());
    setSelections(Array(actionOrder.length).fill(null));
  };

  const toggleWin = (team, game) => {
    if (team === 1) {
      const newWins = [...team1Wins];
      newWins[game] = !newWins[game];
      dispatch(updateTeam1Wins(newWins));
    } else {
      const newWins = [...team2Wins];
      newWins[game] = !newWins[game];
      dispatch(updateTeam2Wins(newWins));
    }
  };

  const getHeroNameById = (id) => {
    const hero = heroes.find((hero) => hero.id === id);
    return hero ? hero.name : "Unknown Hero";
  };

  return (
    <div className="p-4 space-y-4 relative">
      <Card>
      <Button onClick={OpenDraftPick} className="absolute right-6 top-6">Open Draft Pick</Button>
        <CardHeader>
          <CardTitle>Tournament Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="tournamentName">Tournament Name</Label>
              <Input
                id="tournamentName"
                value={tournamentName}
                onChange={(e) => dispatch(updateTournamentName(e.target.value))}
                placeholder="Enter tournament name"
              />
            </div>
            {[0, 1].map((index) => (
              <div key={index} className="space-y-2">
                <Label htmlFor={`team${index + 1}Name`}>
                  Team {index + 1} Name
                </Label>
                <Input
                  id={`team${index + 1}Name`}
                  value={teamNames[index]}
                  onChange={(e) => handleTeamNameChange(index, e.target.value)}
                  placeholder={`Enter Team ${index + 1} name`}
                />
                <Label htmlFor={`team${index + 1}Logo`}>
                  Team {index + 1} Logo
                </Label>
                <Input
                  id={`team${index + 1}Logo`}
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleTeamLogoChange(index, e)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Draft Picker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>Current Step: {currentStep + 1}</div>
            <div>
              Action: Player{" "}
              {Array.isArray(actionOrder[currentStep])
                ? actionOrder[currentStep].map((a) => a.player).join(", ")
                : actionOrder[currentStep]?.player}{" "}
              -{" "}
              {Array.isArray(actionOrder[currentStep])
                ? actionOrder[currentStep].map((a) => a.actionType).join(", ")
                : actionOrder[currentStep]?.actionType}
            </div>
            <div>Current Phase: {phase}</div>
            <div>
              <Label htmlFor="timer">Timer</Label>
              <Input
                id="timer"
                value={timer}
                onChange={(e) => dispatch(updateTimer(e.target.value))}
                placeholder="00:00"
              />
            </div>

            <div className="space-y-4">
              <Select onValueChange={handleSelection}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a hero" />
                </SelectTrigger>
                <SelectContent>
                  {heroes.map((hero) => (
                    <SelectItem key={hero.id} value={hero.id.toString()}>
                      {hero.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {secondInput && (
                <Select onValueChange={handleSelectionSecond}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select 2nd hero" />
                  </SelectTrigger>
                  <SelectContent>
                    {heroes.map((hero) => (
                      <SelectItem key={hero.id} value={hero.id.toString()}>
                        {hero.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <Button
                disabled={!tempSelection}
                onClick={confirmSelection}
                className="mt-2"
              >
                Confirm Selection
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={resetPicks}>Reset Picks</Button>
              <Button onClick={resetBans}>Reset Bans</Button>
              <Button onClick={resetNicknames}>Reset Nicknames</Button>
              <Button onClick={switchNicknames}>Switch Nicknames</Button>
              <Button onClick={switchTeams}>Switch Teams</Button>
              <Button onClick={handleResetAll}>Reset All</Button>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mt-4">
            {actionOrder.flat().map((action, index) => (
              <div key={index} className="p-2 border rounded">
                <div>
                  {action.actionType.toUpperCase()} - Player {action.player}
                </div>
                <div>
                  {selections[index] !== null ? (
                    <div>{getHeroNameById(selections[index])}</div>
                  ) : (
                    <div>Empty</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Win Tracker</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between">
            <div>
              <h3>{teamNames[0]}</h3>
              <div className="flex gap-2 mt-2">
                {team1Wins?.map((win, index) => (
                  <Button
                    key={index}
                    variant={win ? "default" : "outline"}
                    onClick={() => toggleWin(1, index)}
                  >
                    Game {index + 1}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h3>{teamNames[1]}</h3>
              <div className="flex gap-2 mt-2">
                {team2Wins.map((win, index) => (
                  <Button
                    key={index}
                    variant={win ? "default" : "outline"}
                    onClick={() => toggleWin(2, index)}
                  >
                    Game {index + 1}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Player Nicknames</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3>{teamNames[0]}</h3>
              {nicknames.slice(0, 5).map((nickname, index) => (
                <Input
                  key={index}
                  value={nickname}
                  onChange={(e) => handleNicknameChange(index, e.target.value)}
                  placeholder={`Player ${index + 1} Nickname`}
                  className="mt-1"
                />
              ))}
            </div>
            <div>
              <h3>{teamNames[1]}</h3>
              {nicknames.slice(5).map((nickname, index) => (
                <Input
                  key={index + 5}
                  value={nickname}
                  onChange={(e) =>
                    handleNicknameChange(index + 5, e.target.value)
                  }
                  placeholder={`Player ${index + 6} Nickname`}
                  className="mt-1"
                />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
