import { UniqueIdentifier, useDroppable } from "@dnd-kit/core";
import { cn } from "@repo/ui/lib/utils";

interface Props {
  id: UniqueIdentifier;
  index: number;
}

export function DroppableGap({
  id,
  index,
  children,
  ...props
}: Props & Omit<React.ComponentProps<"div">, "id">) {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable|${id}|${index}`,
  });

  return (
    <div
      id={`droppable|${id}|${index}`}
      ref={setNodeRef}
      className={cn(
        !isOver && `w-full border border-0 border-b-4 border-blue-100`
      )}
      style={{
        minHeight: 2,
        marginTop: "1rem",
        marginBottom: "1rem",
      }}
      {...props}
    >
      {children}
      {isOver && (
        <div className="flex w-full items-center">
          <div className="border border-0 border-b-4 border-blue-500 flex-grow"></div>
          <span className="text-center">Drop Here</span>
          <div className="border border-0 border-b-4 border-blue-500 flex-grow"></div>
        </div>
      )}
    </div>
  );
}
