import { UniqueIdentifier } from "@dnd-kit/core";
import { useComponentStore } from "../../store/use-component-store";
import { useQueryState } from "nuqs";
import { DroppableContainer } from "../droppable/droppable-container";
import { cn } from "@repo/ui/lib/utils";
import { SortableContext } from "@dnd-kit/sortable";
import { DroppableGap } from "../droppable/droppable-gap";
import { Button } from "@repo/ui/components/shadcn/button";
import { parseAsUniqueIdentifier } from "../../lib/nuqs-parser";
import { Plus } from "lucide-react";

export function CanvasNode({
  id,
  dragActiveId,
  dropDisable = false,
  children,
  parentId,
  className,
  ...props
}: {
  id: UniqueIdentifier;
  dragActiveId?: UniqueIdentifier;
  parentId?: UniqueIdentifier;
  dropDisable?: boolean;
} & Omit<React.ComponentProps<"div">, "id">) {
  const node = useComponentStore((s) => s.data[id]);
  const appendChild = useComponentStore((s) => s.appendChild);
  const activeId = useComponentStore((s) => s.activeId);
  const setActiveId = useComponentStore((s) => s.setActiveId);
  const hoverActiveId = useComponentStore((s) => s.hoverActiveId);
  const setHoverActiveId = useComponentStore((s) => s.setHoverActiveId);

  //   const [activeId, setActiveId] = useQueryState(
  //     "activeId",
  //     parseAsUniqueIdentifier.withDefault("")
  //   );
  //   const [hoverActiveId, setHoverActiveId] = useQueryState(
  //     "hoverActiveId",
  //     parseAsUniqueIdentifier.withDefault("")
  //   );

  if (!node) return null;

  return (
    <>
      <DroppableContainer
        id={id}
        items={node.items}
        isSelected={activeId === id}
        className={cn(
          "p-4 border w-full",
          hoverActiveId === id && `hover:bg-blue-50/50`,
          activeId === id && `border-blue-400`,
          className
        )}
        disabled={dropDisable}
        droppableGap={children}
        {...props}
        onClick={(e) => {
          e.stopPropagation();
          console.log(id);
          setActiveId(id);
        }}
        onMouseOver={(e) => {
          e.stopPropagation();
          setHoverActiveId(id);
        }}
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
          hidden={activeId !== id}
          onClick={() => appendChild(id, "container")}
          className="mx-auto"
          size={"icon"}
        >
          <Plus />
        </Button>
      </DroppableContainer>
    </>
  );
}
