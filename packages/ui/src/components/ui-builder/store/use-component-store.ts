import { UniqueIdentifier } from "@dnd-kit/core";
import { create } from "zustand";
import { nanoid } from "nanoid";
import { arrayMove } from "@dnd-kit/sortable";
import { insertAt } from "../utils/array";
import { UiComponentConfig } from "../types/ui-component";
import { stat } from "fs";

interface ComponentStore {
  data: Record<UniqueIdentifier, UiComponentConfig>;
  activeId: UniqueIdentifier;
  dragActiveId: UniqueIdentifier;
  hoverActiveId: UniqueIdentifier;
  setActiveId: (id: UniqueIdentifier) => void;
  setDragActiveId: (id: UniqueIdentifier) => void;
  setHoverActiveId: (id: UniqueIdentifier) => void;
  appendComponent: (parentId: UniqueIdentifier, type: string) => void;
  appendChild: (parentId: UniqueIdentifier, type: string) => void;
  moveComponent: (droppableId: UniqueIdentifier, id: UniqueIdentifier) => void;
  duplicateComponent: (
    id: UniqueIdentifier,
    targetParentId?: UniqueIdentifier
  ) => void;
}

export const useComponentStore = create<ComponentStore>((set, get) => {
  const uniq = <T>(arr: T[]) => Array.from(new Set(arr));

  const createAndAttach = (
    data: ComponentStore["data"],
    parentId: UniqueIdentifier,
    type: string,
    includeParentRef: boolean
  ) => {
    const id = nanoid() as UniqueIdentifier;
    const parent = data[parentId];

    if (!parent) return { data };

    const newNode: UiComponentConfig = {
      type,
      items: [],
      ...(includeParentRef ? { parent: parentId } : {}),
    };

    return {
      data: {
        ...data,
        [id]: newNode,
        [parentId]: {
          ...parent,
          items: uniq([...parent.items, id]),
        },
      },
    };
  };

  function duplicateTree(
    data: ComponentStore["data"],
    sourceId: UniqueIdentifier,
    idMap: Record<string, UniqueIdentifier> = {}
  ): {
    newData: Record<UniqueIdentifier, UiComponentConfig>;
    newId: UniqueIdentifier;
  } {
    const source = data[sourceId];
    if (!source) throw new Error(`Component ${sourceId} not found`);

    const newId = nanoid() as UniqueIdentifier;
    idMap[sourceId] = newId;

    // clone children recursively
    let clonedData: Record<UniqueIdentifier, UiComponentConfig> = {};
    const newItems: UniqueIdentifier[] = [];

    for (const childId of source.items) {
      const { newData: childData, newId: childNewId } = duplicateTree(
        data,
        childId,
        idMap
      );
      // merge child subtree
      clonedData = { ...clonedData, ...childData };
      newItems.push(childNewId);
    }

    // clone this node
    const clonedNode: UiComponentConfig = {
      type: source.type,
      items: newItems,
      // parent will be set by caller
    };
    clonedData[newId] = clonedNode;

    return { newData: clonedData, newId };
  }

  const parseDroppable = (droppableId: string) => {
    const parts = droppableId.split("|");
    if (parts.length === 3) {
      return {
        parentId: parts[1] as UniqueIdentifier,
        index: Number(parts[2]),
        isSort: true,
      };
    }
    return {
      parentId: droppableId as UniqueIdentifier,
      index: 0,
      isSort: false,
    };
  };

  return {
    // start with a single "root" container
    data: {
      "root-canvas": {
        type: "root",
        items: [],
      },
    },
    activeId: "",
    dragActiveId: "",
    hoverActiveId: "",
    setActiveId: (id) => {
      set((state) => ({
        ...state,
        activeId: id,
      }));
    },
    setDragActiveId: (id) => {
      set((state) => ({
        ...state,
        dragActiveId: id,
      }));
    },
    setHoverActiveId: (id) => {
      set((state) => ({
        ...state,
        hoverActiveId: id,
      }));
    },
    appendComponent: (parentId, type) => {
      set((state) => {
        const { data } = createAndAttach(state.data, parentId, type, false);
        return {
          ...state,
          data,
        };
      });
    },

    appendChild: (parentId, type) => {
      set((state) => {
        const { data } = createAndAttach(state.data, parentId, type, true);
        return {
          ...state,
          data,
        };
      });
    },
    moveComponent: (droppableId, id) => {
      set((state) => {
        const { data } = state;

        const {
          parentId: destParentId,
          index: destIndex,
          isSort,
        } = parseDroppable(String(droppableId));

        const component = state.data[id];
        if (!component?.parent) return { data };

        const srcParentId = component.parent;

        const srcParent = state.data[srcParentId];
        if (!srcParent) return { data };

        const destParent = state.data[destParentId];
        if (!destParent) return { data };

        if (srcParentId === destParentId) {
          const oldIdx = destParent.items.findIndex((item) => item === id);
          const newIdx = isSort
            ? Math.min(destIndex, destParent.items.length - 1)
            : destParent.items.length;

          const newArr = isSort
            ? arrayMove(destParent.items, oldIdx, newIdx)
            : destParent.items;

          return {
            ...state,
            data: {
              ...data,
              [destParentId]: {
                ...destParent,
                items: [...new Set(newArr)],
              },
              [id]: {
                ...component,
                parent: destParentId,
              },
            },
          };
        }

        return {
          ...state,
          data: {
            ...data,
            [srcParentId]: {
              ...srcParent,
              items: srcParent.items.filter((childId) => childId !== id),
            },
            [destParentId]: {
              ...destParent,
              items: [...new Set(insertAt(destParent.items, destIndex, id))],
            },
            [id]: {
              ...component,
              parent: destParentId,
            },
          },
        };
      });
    },
    duplicateComponent: (id, targetParentId) => {
      set((state) => {
        const src = state.data[id];
        if (!src) return { data: state.data };

        const parentId = targetParentId ?? src.parent;
        if (!parentId) return { data: state.data };

        // clone subtree
        const { newData, newId } = duplicateTree(state.data, id);

        // attach cloned root under parent
        const dest = state.data[parentId];

        if (!dest) return { data: state.data };

        const srcIndex = dest.items.findIndex((item) => item === id);

        // const updatedDestItems = uniq([...dest.items, newId]);
        const updatedDestItems = uniq(
          insertAt(dest.items, srcIndex + 1, newId)
        );

        return {
          ...state,
          data: {
            ...state.data,
            ...newData,
            [parentId]: {
              ...dest,
              items: updatedDestItems,
            },
            // set parent on cloned root
            [newId]: {
              ...newData[newId],
              parent: parentId,
            },
          },
        } as Partial<ComponentStore>;
      });
    },
  };
});
