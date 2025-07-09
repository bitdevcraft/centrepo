import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";
import { nanoid } from "nanoid";

export interface ComponentConfig {
  type: string;
  items: UniqueIdentifier[];
  parent?: UniqueIdentifier;
}

interface ComponentZustand {
  data: Record<UniqueIdentifier, ComponentConfig>;
  appendComponent: (parentId: UniqueIdentifier, type: string) => void;
  appendChild: (parentId: UniqueIdentifier, type: string) => void;
  moveComponent: (parentId: UniqueIdentifier, id: UniqueIdentifier) => void;
}

export const useComponentStore = create<ComponentZustand>((set, get) => ({
  // start with a single "root" container
  data: {
    "root-canvas": {
      type: "root",
      items: [],
    },
  },

  appendComponent: (parentId, type) => {
    const id = nanoid() as UniqueIdentifier;
    set((state) => {
      const parent = state.data[parentId];
      if (!parent) return {};

      return {
        data: {
          ...state.data,
          // 1) create the new node
          [id]: { type, items: [] },
          // 2) add it into the parent’s items array
          [parentId]: {
            ...parent,
            items: [...new Set([...parent.items, id])],
          },
        },
      };
    });
  },

  appendChild: (parentId, type) => {
    const id = nanoid() as UniqueIdentifier;
    set((state) => {
      const parent = state.data[parentId];
      if (!parent) return {};

      return {
        data: {
          ...state.data,
          [id]: { type, items: [], parent: parentId },
          [parentId]: {
            ...parent,
            items: [...new Set([...parent.items, id])],
          },
        },
      };
    });
  },
  moveComponent: (parentId: UniqueIdentifier, id: UniqueIdentifier) => {
    set((state) => {
      const { data } = state;

      if (parentId === id) return { data };

      const newParent = state.data[parentId];
      const component = state.data[id];

      if (!component?.parent) return { data };
      if (!newParent) return { data };

      const oldParent = state.data[component.parent];
      if (!oldParent) return { data };

      return {
        data: {
          ...data,
          [component.parent]: {
            ...oldParent,
            items: oldParent.items.filter((childId) => childId !== id),
          },
          [parentId]: {
            ...newParent,
            items: [...new Set([...newParent.items, id])],
          },
          [id]: {
            ...component,
            parent: parentId,
          },
        },
      };
    });
  },
}));
