import { AbsoluteFill, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { interpolate } from "remotion";
import { TITLE_START } from "./constants";

export const TitleSpring: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - TITLE_START,
    fps,
    config: { damping: 200 },
  });

  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: "40%",
      }}
    >
      <div
        style={{
          fontSize: 72,
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 700,
          color: "#fff",
          transform: `scale(${scale})`,
          opacity,
          letterSpacing: "-0.02em",
          WebkitTextStroke: "4px #000",
          paintOrder: "stroke fill",
        }}
      >
        meappy
        <span style={{ WebkitTextStroke: "14px #000" }}>.me</span>
      </div>
    </AbsoluteFill>
  );
};
