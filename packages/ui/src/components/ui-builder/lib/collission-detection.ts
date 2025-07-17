import { closestCorners, pointerWithin } from "@dnd-kit/core";

export function collisionDetection(args: any) {
  return pointerWithin(args) || closestCorners(args);
}
