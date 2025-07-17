import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@repo/ui/lib/utils";
import { Copy, Grip, GripHorizontal, Plus } from "lucide-react";
import { JSX, ReactNode } from "react";
import { useComponentStore } from "../../store/use-component-store";

interface Props {
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  disabled?: boolean;
  droppableGap?: ReactNode;
  isSelected?: boolean;
}

export function DroppableContainer({
  className,
  id,
  items,
  disabled = false,
  children,
  droppableGap,
  isSelected = false,
  ...props
}: Props & Omit<React.ComponentProps<"div">, "id">) {
  const {
    isDragging,
    setNodeRef,
    transition,
    transform,
    isOver,
    listeners,
    rect,
  } = useSortable({
    id,
    data: {
      type: "container",
      children: items,
    },
    disabled,
  });

  const duplicateComponent = useComponentStore((s) => s.duplicateComponent);

  return (
    <div hidden={isDragging} className="relative">
      {isSelected && (
        <div className="flex w-full justify-end ">
          <div className="flex p-1 bg-blue-500 text-background gap-2 absolute -translate-y-[100%]">
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Plus size={15} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                duplicateComponent(id);
              }}
            >
              <Copy size={15} />
            </button>
            <GripHorizontal size={15} {...listeners} />
          </div>
        </div>
      )}

      <div
        ref={setNodeRef}
        className={cn(
          className,
          isOver && `border border-blue-400`,
          isDragging && `opacity-50 h-0 p-0`
        )}
        style={{
          ...props.style,
          transition,
        }}
        {...props}
      >
        <div>{children}</div>
      </div>
      {!isDragging && <>{droppableGap}</>}
    </div>
  );
}
