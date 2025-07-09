"use client";

import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Tree } from "./tree";
import { Canvas } from "./canvas";

export function UiEditor() {
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  return (
    <div>
      {/* <DndContext sensors={sensors}>


      </DndContext> */}

      {/* <Tree /> */}

      <Canvas />
    </div>
  );
}
