import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@repo/ui/lib/utils";
import { Grip } from "lucide-react";
import { JSX, ReactNode } from "react";

interface Props {
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
  disabled?: boolean;
  droppableGap?: ReactNode;
}

export function DroppableContainer({
  className,
  id,
  items,
  disabled = false,
  children,
  droppableGap,
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

  return (
    <div>
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
        {!isDragging && (
          <div>
            <Grip size={20} {...listeners} />
            {children}
          </div>
        )}
      </div>
      {!isDragging && <>{droppableGap}</>}
    </div>
  );
}
