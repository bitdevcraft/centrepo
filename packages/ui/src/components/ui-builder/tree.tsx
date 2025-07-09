"use client";

import React from "react";
import { useComponentStore } from "./store/use-component-store";
import { UniqueIdentifier } from "@dnd-kit/core";
import { Button } from "../shadcn/button";

function TreeNode({ id }: { id: UniqueIdentifier }) {
  const node = useComponentStore((s) => s.data[id]);
  const appendChild = useComponentStore((s) => s.appendChild);

  if (!node) return null;
  return (
    <div style={{ marginLeft: 20 }}>
      <strong>{node.type}</strong> ({id})
      <Button onClick={() => appendChild(id, "child")}>+ child</Button>
      {node.items.map((childId) => (
        <TreeNode key={childId} id={childId} />
      ))}
    </div>
  );
}

export function Tree() {
  const appendComponent = useComponentStore((s) => s.appendComponent);
  return (
    <div>
      <Button onClick={() => appendComponent("root-canvas", "child")}>
        Add top-level component
      </Button>
      <TreeNode id="root-canvas" />
    </div>
  );
}
