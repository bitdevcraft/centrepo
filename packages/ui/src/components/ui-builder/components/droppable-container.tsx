import { UniqueIdentifier } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import { useSortable } from "@dnd-kit/sortable";
import { cn } from "@repo/ui/lib/utils";
import { Grip } from "lucide-react";

interface Props {
  id: UniqueIdentifier;
  items: UniqueIdentifier[];
}

export function DroppableContainer({
  className,
  id,
  items,
  children,
  ...props
}: Props & Omit<React.ComponentProps<"div">, "id">) {
  const { isDragging, setNodeRef, transition, transform, isOver, listeners } =
    useSortable({
      id,
      data: {
        type: "container",
        children: items,
      },
    });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        className,
        isOver && `border border-4 border-blue-100`,
        isDragging && `opacity-50`
      )}
      style={{
        ...props.style,
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      {...props}
    >
      <Grip size={10} {...listeners} />
      {children}
    </div>
  );
}
