import { useCallback, useEffect, useRef, useState } from "react";
import { Player, PlayerRef } from "@remotion/player";
import { HeroComposition } from "./remotion/HeroComposition";
import { SocialOverlay } from "./components/SocialOverlay";
import {
  FPS,
  DURATION_IN_FRAMES,
  COMP_WIDTH,
  COMP_HEIGHT,
  OVERLAY_FRAME,
} from "./remotion/constants";

export const App: React.FC = () => {
  const playerRef = useRef<PlayerRef>(null);
  const [showLinks, setShowLinks] = useState(false);

  const onFrameUpdate = useCallback(
    (e: { detail: { frame: number } }) => {
      if (!showLinks && e.detail.frame >= OVERLAY_FRAME) {
        setShowLinks(true);
      }
    },
    [showLinks],
  );

  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    player.addEventListener("frameupdate", onFrameUpdate);
    return () => player.removeEventListener("frameupdate", onFrameUpdate);
  }, [onFrameUpdate]);

  // Fallback: show links after 6s even if Player fails
  useEffect(() => {
    const timer = setTimeout(() => setShowLinks(true), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100dvh",
        background: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Player
        ref={playerRef}
        component={HeroComposition}
        compositionWidth={COMP_WIDTH}
        compositionHeight={COMP_HEIGHT}
        durationInFrames={DURATION_IN_FRAMES}
        fps={FPS}
        autoPlay
        loop={false}
        controls={false}
        clickToPlay={false}
        moveToBeginningWhenEnded={false}
        acknowledgeRemotionLicense
        style={{
          width: "100%",
          height: "100%",
        }}
      />
      {showLinks && <SocialOverlay />}
    </div>
  );
};
