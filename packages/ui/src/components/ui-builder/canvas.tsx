import {
  closestCenter,
  closestCorners,
  DndContext,
  DragCancelEvent,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  pointerWithin,
  UniqueIdentifier,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { snapCenterToCursor, createSnapModifier } from "@dnd-kit/modifiers";
import { DroppableContainer } from "./components/droppable-container";
import { useComponentStore } from "./store/use-component-store";
import { Button } from "../shadcn/button";
import { SortableContext } from "@dnd-kit/sortable";
import { cn } from "@repo/ui/lib/utils";
import { createParser, parseAsInteger, useQueryState } from "nuqs";
import { drop } from "lodash";

import { Minus } from "lucide-react";
import { DroppableGap } from "./components/droppable-gap";

function CanvasNode({
  id,
  dragActiveId,
  dropDisable = false,
  children,
  parentId,
  ...props
}: {
  id: UniqueIdentifier;
  dragActiveId?: UniqueIdentifier;
  parentId?: UniqueIdentifier;
  dropDisable?: boolean;
} & Omit<React.ComponentProps<"div">, "id">) {
  const node = useComponentStore((s) => s.data[id]);
  const appendChild = useComponentStore((s) => s.appendChild);

  if (!node) return null;

  return (
    <>
      <DroppableContainer
        id={id}
        items={node.items}
        className="p-4 border"
        disabled={dropDisable}
        droppableGap={children}
      >
        <strong>{node.type}</strong> ({id})
        <SortableContext items={node.items}>
          <div className="">
            {node.items.map((childId, idx) => (
              <div key={childId}>
                {idx === 0 ? (
                  <DroppableGap id={id} index={idx} hidden={!dragActiveId} />
                ) : (
                  <></>
                )}
                <CanvasNode
                  id={childId}
                  dragActiveId={dragActiveId}
                  dropDisable={dropDisable || id === dragActiveId}
                  parentId={id}
                >
                  <DroppableGap
                    id={id}
                    index={idx + 1}
                    hidden={!dragActiveId}
                  />
                </CanvasNode>
              </div>
            ))}
          </div>
        </SortableContext>
        <Button
          onClick={() => appendChild(id, "container")}
          className="mx-auto"
        >
          + child
        </Button>
      </DroppableContainer>
    </>
  );
}

const parseAsUniqueIdentifier = createParser({
  parse(queryValue: string) {
    return queryValue as UniqueIdentifier;
  },
  serialize(value: UniqueIdentifier) {
    return String(value);
  },
});

export function Canvas() {
  const moveComponent = useComponentStore((s) => s.moveComponent);

  const [dragActiveId, setDragActiveId] = useQueryState(
    "dragActiveId",
    parseAsUniqueIdentifier.withDefault("")
  );

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

    console.log("Over", over.id);
    console.log("Active", active.id);

    moveComponent(over.id, active.id);
  };
  const handleDragOver = (event: DragOverEvent) => {
    //
  };

  const sensors = useSensors(useSensor(PointerSensor));

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

      <DragOverlay className="justify-start items-start">
        {/* <div className="border-dashed bg-blue-100">{dragActiveId}</div> */}

        <CanvasNode id={dragActiveId} />
      </DragOverlay>
    </DndContext>
  );
}

function collisionDetection(args: any) {
  return pointerWithin(args) || closestCorners(args);
}
