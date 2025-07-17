import { UniqueIdentifier } from "@dnd-kit/core";

export interface UiComponentConfig {
  type: string;
  items: UniqueIdentifier[];
  parent?: UniqueIdentifier;
}
