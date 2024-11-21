import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Rnd } from "react-rnd";
import { Check, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import { HeroCard } from "./HeroCard";
import heroes from "../lib/HeroData";
import { Button } from "./ui/button";
import { cn } from "../lib/utils";

const actionOrder = [
  { player: 1, actionType: "ban", index: 0 },
  { player: 6, actionType: "ban", index: 1 },
  { player: 2, actionType: "ban", index: 2 },
  { player: 7, actionType: "ban", index: 3 },
  { player: 3, actionType: "ban", index: 4 },
  { player: 8, actionType: "ban", index: 5 },
  { player: 1, actionType: "pick", index: 6 },
  [{ player: 6, actionType: "pick", index: 7 }, { player: 7, actionType: "pick", index: 7 }],
  [{ player: 2, actionType: "pick", index: 8 }, { player: 3, actionType: "pick", index: 8 }],
  { player: 8, actionType: "pick", index: 9 },
  { player: 9, actionType: "ban", index: 10 },
  { player: 4, actionType: "ban", index: 11 },
  { player: 10, actionType: "ban", index: 12 },
  { player: 5, actionType: "ban", index: 13 },
  { player: 9, actionType: "pick", index: 14 },
  [{ player: 4, actionType: "pick", index: 15 }, { player: 5, actionType: "pick", index: 15 }],
  { player: 10, actionType: "pick", index: 16 }
];

export default function DraftPickerV3() {
  const {
    team1Picks,
    team2Picks,
    team1Bans,
    team2Bans,
    nicknames,
    teamNames,
    teamLogos,
    tournamentName,
    timer,
    phase,
    team1Wins,
    team2Wins,
    currentStep,
  } = useSelector((state) => state.draftPicker);

  const [componentPositions, setComponentPositions] = useState({});
  const [isEditorMode, setIsEditorMode] = useState(true);
  const [closeSidebar, setCloseSidebar] = useState(false);
  const [components, setComponents] = useState([]);
  const [currentAction, setCurrentAction] = useState(actionOrder[0]);
  
  const videoRef = useRef(null);

  useEffect(() => {
    setCurrentAction(actionOrder[currentStep]);
  }, [currentStep]);

  const getHeroImageByID = (id) => {
    const hero = heroes.find((h) => h.id === id);
    return hero ? hero.img : "/placeholder.svg";
  };
  
  const getHeroNameByID = (id) => {
    const hero = heroes.find((h) => h.id === id);
    return hero ? hero.name : "Unknown Hero";
  };
  
  const updateComponentPosition = (key, position) => {
    setComponentPositions((prev) => ({ ...prev, [key]: position }));
  };
  
  const resetPositions = () => {
    setComponentPositions({});
    setComponents([]);
  };
  
  const addComponent = (type) => {
    const id = `${type}-${Date.now()}`;
    const defaultPosition = { x: 400, y: 120, width: 600, height: 250 };
  
    const componentCount = components.filter((component) => component.type === type).length;
  
    if (
      (type === "picks" && componentCount >= 1) ||
      (type === "picks2" && componentCount >= 1) ||
      (type === "bans1" && componentCount >= 1) ||
      (type === "bans2" && componentCount >= 1) ||
      (type === "team1Name" && componentCount >= 1) ||
      (type === "team1Logo" && componentCount >= 1) ||
      (type === "team2Name" && componentCount >= 1) ||
      (type === "team2Logo" && componentCount >= 1) ||
      (type === "tournamentLogo" && componentCount >= 1) ||
      (type === "timer" && componentCount >= 1) ||
      (type === "footer" && componentCount >= 1)
    ) {
      alert(`You reached the limit for ${type} component.`);
      return;
    }
  
    setComponents((prev) => [...prev, { id, type, defaultPosition }]);
  };

  const RndWrapper = ({ children, defaultPosition, id }) => (
    <Rnd
      size={{
        width: componentPositions[id]?.width || defaultPosition.width,
        height: componentPositions[id]?.height || defaultPosition.height,
      }}
      position={{
        x: componentPositions[id]?.x || defaultPosition.x,
        y: componentPositions[id]?.y || defaultPosition.y,
      }}
      onDragStop={(e, d) => {
        updateComponentPosition(id, {
          x: d.x,
          y: d.y,
          width: componentPositions[id]?.width || defaultPosition.width,
          height: componentPositions[id]?.height || defaultPosition.height,
        });
      }}
      onResizeStop={(e, direction, ref, delta, position) =>
        updateComponentPosition(id, {
          width: ref.offsetWidth,
          height: ref.offsetHeight,
          x: position.x,
          y: position.y,
        })
      }
      enableUserSelectHack={true}
      enableResizing={isEditorMode}
      dragHandleClassName="drag-handle"
      dragAxis="both"
      disableDragging={!isEditorMode}
      className="z-50"
    >
      {children}
    </Rnd>
  );

  const isActiveAction = (index, type, isTeam1) => {
    if (Array.isArray(currentAction)) {
      return currentAction.some(action => 
        action.actionType === type && 
        ((isTeam1 && action.player <= 5) || (!isTeam1 && action.player > 5)) &&
        (type === "pick" ? (isTeam1 ? action.player - 1 : action.player - 6) : (isTeam1 ? action.player - 1 : action.player - 6)) === index
      )
    } else {
      return currentAction.actionType === type && 
        ((isTeam1 && currentAction.player <= 5) || (!isTeam1 && currentAction.player > 5)) &&
        (type === "pick" ? (isTeam1 ? currentAction.player - 1 : currentAction.player - 6) : (isTeam1 ? currentAction.player - 1 : currentAction.player - 6)) === index
    }
  }

  const renderComponent = (component) => {
    switch (component.type) {
      case "team1Name":
      case "team2Name":
        return (
          <RndWrapper key={component.id} id={component.id} defaultPosition={component.defaultPosition}>
            <div className="relative px-8 py-2 text-4xl font-bold text-yellow-100 h-full flex items-center drag-handle">
              {teamNames[component.type === "team1Name" ? 0 : 1]}
            </div>
          </RndWrapper>
        );
      case "team1Logo":
      case "team2Logo":
        return (
          <RndWrapper key={component.id} id={component.id} defaultPosition={component.defaultPosition}>
            <div className="relative w-full h-full drag-handle">
              <div className="absolute inset-0 border-2 border-yellow-400 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20" />
              <img
                src={teamLogos[component.type === "team1Logo" ? 0 : 1] || "/placeholder.svg"}
                alt={`Team ${component.type === "team1Logo" ? 1 : 2} logo`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
                draggable={false}
              />
            </div>
          </RndWrapper>
        );
      case "picks":
      case "picks2":
        const picks = component.type === "picks" ? team1Picks : team2Picks;
        return (
          <RndWrapper key={component.id} id={component.id} defaultPosition={component.defaultPosition}>
            <div className="flex space-x-[0.3vw] h-full drag-handle">
              {picks.map((hero, index) => (
                <div key={index} className="w-full h-full relative flex-grow">
                  <HeroCard
                    hero={hero}
                    index={index}
                    animate={isActiveAction(index, "pick", component.type === "picks")}
                  />
                  <div className="absolute bottom-0 left-0 px-1 opacity-70 w-full bg-black/70 text-white text-center z-50">
                    {nicknames[component.type === "picks" ? index : index + 5]}
                  </div>
                </div>
              ))}
            </div>
          </RndWrapper>
        );
      case "bans1":
      case "bans2":
        const bans = component.type === "bans1" ? team1Bans : team2Bans;
        return (
          <RndWrapper key={component.id} id={component.id} defaultPosition={component.defaultPosition}>
            <div className="flex justify-between space-x-[0.52vw] h-full drag-handle">
              {bans.map((heroId, index) => (
                <div
                  key={index}
                  className={cn(
                    "relative overflow-hidden rounded flex-grow",
                    "bg-gradient-to-b from-zinc-800/90 to-zinc-900/90",
                    "border border-red-900/50"
                  )}
                >
                  {heroId === null && isActiveAction(index, "ban", component.type === "bans1") && (
                    <img
                      src="/Ban__Animation_VP9.gif"
                      alt="Ban Animation"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      draggable={false}
                      className="z-10"
                    />
                  )}
                  {heroId !== null && (
                    <img
                      src={getHeroImageByID(heroId)}
                      alt={getHeroNameByID(heroId)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                      className="grayscale z-10"
                      draggable={false}
                    />
                  )}
                  <div className="absolute inset-0 bg-red-900/30" />
                </div>
              ))}
            </div>
          </RndWrapper>
        );
      case "timer":
        return (
          <RndWrapper key={component.id} id={component.id} defaultPosition={component.defaultPosition}>
            <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-white bg-black/50 rounded-full border border-yellow-400/50 drag-handle">
              {timer}
            </div>
          </RndWrapper>
        );
      case "footer":
        return (
          <RndWrapper key={component.id} id={component.id} defaultPosition={component.defaultPosition}>
            <div className="relative h-full drag-handle">
              <div className="absolute inset-0" />
              <div className="relative flex items-center justify-between px-8 h-full">
                <div className="text-lg text-yellow-900 font-bold">{tournamentName}</div>
                <div className="text-2xl font-bold text-white text-center">{phase}</div>
                <div className="text-lg text-yellow-900 font-bold">BRACKET - LAN QUALIFIER ONLINE P1</div>
              </div>
            </div>
          </RndWrapper>
        );
      default:
        return null;
    }
  };

  const Sidebar = () => (
    <div className={`fixed top-0 left-0 w-64 ${closeSidebar ? "h-12" : "h-full"}  bg-gray-800 text-white p-4 z-30 transition-all duration-200`}>
      <X
        className="absolute top-4 right-4 cursor-pointer"
        onClick={() => setCloseSidebar(!closeSidebar)}
      />
      <h2 className="text-xl font-bold mb-4">Sidebar</h2>
      {!closeSidebar && (
        <div className="space-y-4">
          {["team1Name", "team1Logo", "team2Name", "team2Logo", "tournamentLogo", "picks", "picks2", "timer", "bans1", "bans2", "footer"].map((type) => (
            <button
              key={type}
              onClick={() => addComponent(type)}
              className="w-full bg-blue-500 py-2 rounded"
            >
              Add {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const WinChecker = () => (
    <div className="fixed top-4 right-4 flex gap-8 z-30 bg-black/50 p-4 rounded-lg">
      {[team1Wins, team2Wins].map((wins, teamIndex) => (
        <div key={teamIndex} className="flex flex-col items-center">
          <h3 className="text-white mb-2">{teamNames[teamIndex]}</h3>
          <div className="flex gap-2">
            {wins.map((win, index) => (
              <div
                key={index}
                className={cn(
                  "w-8 h-8 rounded flex items-center justify-center",
                  win ? "bg-green-500" : "bg-gray-700"
                )}
              >
                {win && <Check className="text-white" size={16} />}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="absolute bg-green-500 w-screen h-screen -z-20" />
      {isEditorMode && <Sidebar />}
      <WinChecker />
      
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 object-cover w-full h-full -z-10"
      >
        <source src="/Assets/Main Ban Pick Shell_VP9.webm" type="video/webm" />
      </video>

      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 object-cover w-full h-full z-10"
        ref={videoRef}
      >
        <source src="/Assets/Swiss Bracket Lower_VP9.webm" type="video/webm" />
      </video>

      <div className="relative z-20 w-full h-full flex flex-col">
        {components.map(renderComponent)}
      </div>

      <div className="fixed bottom-4 right-4 flex gap-2 z-30">
        <Button
          onClick={resetPositions}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Reset Positions
        </Button>
        <Button
          onClick={() => setIsEditorMode(!isEditorMode)}
          className="bg-green-500 text-white px-4 py-2 rounded-md"
        >
          {isEditorMode ? "Switch to Preview Mode" : "Switch to Editor Mode"}
        </Button>
      </div>
    </div>
  );
}