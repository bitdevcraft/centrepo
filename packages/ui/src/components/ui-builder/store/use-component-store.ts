import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";
import { nanoid, customRandom, urlAlphabet } from "nanoid";
import { drop, over } from "lodash";
import { arrayMove } from "@dnd-kit/sortable";
import { an } from "node_modules/@faker-js/faker/dist/airline-BUL6NtOJ";

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

      let ancestorId = parentId;
      let ancestorIndex = 0;

      const droppableParent = String(parentId).split("|");
      const onSort = droppableParent.length === 3;

      if (onSort) {
        ancestorId = droppableParent[1] as UniqueIdentifier;
        ancestorIndex = Number(droppableParent[2]);
      }

      const newParent = state.data[ancestorId];
      const component = state.data[id];

      if (!component?.parent) return { data };

      if (!newParent) return { data };
      console.log("Ancestor", ancestorId);

      console.log("Parent", component.parent);

      const oldParent = state.data[component.parent];
      if (!oldParent) return { data };

      if (component.parent === ancestorId) {
        const activeIdx = newParent.items.findIndex((item) => item === id);
        const overIdx = Math.min(ancestorIndex, newParent.items.length - 1);

        const newArr = arrayMove(newParent.items, activeIdx, overIdx);

        return {
          data: {
            ...data,
            [ancestorId]: {
              ...newParent,
              items: [...new Set(newArr)],
            },
            [id]: {
              ...component,
              parent: ancestorId,
            },
          },
        };
      }

      return {
        data: {
          ...data,
          [component.parent]: {
            ...oldParent,
            items: oldParent.items.filter((childId) => childId !== id),
          },
          [ancestorId]: {
            ...newParent,
            items: [...new Set(insertAt(newParent.items, ancestorIndex, id))],
          },
          [id]: {
            ...component,
            parent: ancestorId,
          },
        },
      };
    });
  },
}));

function insertAt<T>(array: T[], index: number, element: T): T[] {
  // clamp index between 0 and array.length
  const i = Math.max(0, Math.min(index, array.length));
  return [...array.slice(0, i), element, ...array.slice(i)];
}
