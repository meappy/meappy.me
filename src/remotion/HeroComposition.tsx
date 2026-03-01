import { AbsoluteFill } from "remotion";
import { StencilReveal } from "./StencilReveal";
import { TitleSpring } from "./TitleSpring";

export const HeroComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      <StencilReveal />
      <TitleSpring />
    </AbsoluteFill>
  );
};
