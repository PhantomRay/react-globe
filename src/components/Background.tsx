import { type ReactElement } from "react";
import { Animator } from "@arwes/react-animator";
import { GridLines, Dots, Puffs } from "@arwes/react-bgs";

export const Background = (): ReactElement => {
  return (
    <Animator duration={{ interval: 2 }}>
      <div
        style={{
          position: "absolute",
          zIndex: -1,
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          backgroundColor: "#000906",
          backgroundImage:
            "radial-gradient(85% 85% at 50% 50%, hsla(185, 100%, 25%, 0.25) 0%, hsla(185, 100%, 25%, 0.12) 50%, hsla(185, 100%, 25%, 0) 100%)",
        }}
      >
        <Puffs
          color="hsla(120, 100%, 75%, 0.5)"
          quantity={100}
          padding={20}
          xOffset={[50, -100]}
          yOffset={[50, -100]}
          radiusOffset={[1, 0]}
          sets={5}
        />
        <GridLines lineColor="hsla(180, 100%, 75%, 0.05)" distance={30} />
        <Dots color="hsla(180, 100%, 75%, 0.05)" distance={30} />
      </div>
    </Animator>
  );
};
