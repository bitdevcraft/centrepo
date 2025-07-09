"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  UniqueIdentifier,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { DroppableContainer } from "./components/droppable-container";
import { useComponentStore } from "./store/use-component-store";
import { Button } from "../shadcn/button";
import { SortableContext } from "@dnd-kit/sortable";
import { cn } from "@repo/ui/lib/utils";
import { createParser, parseAsInteger, useQueryState } from "nuqs";

function CanvasNode({ id }: { id: UniqueIdentifier }) {
  const node = useComponentStore((s) => s.data[id]);
  const appendChild = useComponentStore((s) => s.appendChild);

  if (!node) return null;

  return (
    <>
      {node.type !== "gap" ? (
        <DroppableContainer
          id={id}
          items={node.items}
          className="p-4 border min-size-16"
        >
          <strong>{node.type}</strong> ({id})
          <SortableContext items={node.items}>
            <div className="grid gap-4">
              {node.items.map((childId) => (
                <CanvasNode key={childId} id={childId} />
              ))}
            </div>
          </SortableContext>
          <Button onClick={() => appendChild(id, "container")}>+ child</Button>
        </DroppableContainer>
      ) : (
        <Droppable id={id} />
      )}
    </>
  );
}

function Droppable({
  id,
  ...props
}: Omit<React.ComponentProps<"div">, "id"> & { id: UniqueIdentifier }) {
  const { isOver, setNodeRef } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      {...props}
      className={cn(isOver && `border border-4 border-red-100`)}
    />
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

  const [activeId, setActiveId] = useQueryState(
    "activeId",
    parseAsUniqueIdentifier.withDefault("")
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    //
    setActiveId("");

    console.log(event);

    const { over, active } = event;

    if (active.id === "root-canvas") return;

    if (!over) return;

    moveComponent(over.id, active.id);
  };
  const handleDragOver = (event: DragOverEvent) => {
    //
  };

  const sensors = useSensors(useSensor(PointerSensor));

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
    >
      <CanvasNode id={"root-canvas"} />

      <DragOverlay>
        {activeId && (
          <div
            style={{
              padding: 8,
              border: "1px dashed #cc0",
              background: "#ffd",
            }}
          >
            {activeId}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
