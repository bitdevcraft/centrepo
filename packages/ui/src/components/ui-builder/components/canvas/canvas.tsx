"use client";

import {
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useComponentStore } from "../../store/use-component-store";
import { useQueryState } from "nuqs";

import { createPortal } from "react-dom";

import { collisionDetection } from "../../lib/collission-detection";
import { snapToLeftTopCorner } from "../../lib/drag-overlay-modifiers";
import { parseAsUniqueIdentifier } from "../../lib/nuqs-parser";
import { CanvasNode } from "./canvas-node";
import { Card, CardContent } from "@repo/ui/components/shadcn/card";

export function Canvas() {
  const moveComponent = useComponentStore((s) => s.moveComponent);
  const setDragActiveId = useComponentStore((s) => s.setDragActiveId);
  const dragActiveId = useComponentStore((s) => s.dragActiveId);

  // const [dragActiveId, setDragActiveId] = useQueryState(
  //   "dragActiveId",
  //   parseAsUniqueIdentifier.withDefault("")
  // );

  const handleDragStart = (event: DragStartEvent) => {
    setDragActiveId(event.active.id);
  };
  const handleDragCancel = (event: DragCancelEvent) => {
    setDragActiveId("");
  };

  const handleDragMove = (event: DragMoveEvent) => {
    // console.log(event);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setDragActiveId("");

    const { over, active } = event;

    if (active.id === "root-canvas") return;
    if (!over) return;

    moveComponent(over.id, active.id);
  };
  const handleDragOver = (event: DragOverEvent) => {
    //
  };

  const sensors = useSensors(useSensor(PointerSensor));

  const isClient = () => typeof window !== "undefined";

  return (
    <DndContext
      collisionDetection={collisionDetection}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDragMove={handleDragMove}
      onDragCancel={handleDragCancel}
    >
      <CanvasNode id={"root-canvas"} dragActiveId={dragActiveId} />

      {isClient() &&
        createPortal(
          <DragOverlay
            className="grid"
            modifiers={[snapToLeftTopCorner]}
            wrapperElement={"div"}
            adjustScale={false}
          >
            {dragActiveId && (
              <div className="p-4 bg-blue-100/50 relative rounded-r-lg rounded-b-lg w-full">
                {/* <div className="rounded-r-full rounded-b-full size-2 bg-black absolute top-0 left-0 translate-y-[-50%] translate-x-[-50%]"></div> */}
                {dragActiveId}
              </div>
            )}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
