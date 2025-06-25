import { baseModelWithWorkspace } from "./baseModelWithWorkSpace";
import { baseModelWithOwner } from "./baseModelWithOwner";

export const baseModelWithWorkspaceAndOwner = {
  ...baseModelWithWorkspace,
  ...baseModelWithOwner,
};
