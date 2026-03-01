import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { interpolate } from "remotion";
import { REVEAL_START, REVEAL_END } from "./constants";

export const StencilReveal: React.FC = () => {
  const frame = useCurrentFrame();

  const radius = interpolate(frame, [REVEAL_START, REVEAL_END], [0, 150], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <Img
        src={staticFile("portrait.webp")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 35%",
          filter: "grayscale(1) brightness(1.3) contrast(20) invert(1)",
          clipPath: `circle(${radius}% at 50% 35%)`,
        }}
      />
    </AbsoluteFill>
  );
};
