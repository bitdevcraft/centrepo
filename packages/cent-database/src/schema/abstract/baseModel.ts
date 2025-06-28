import { baseIdModel } from "./baseIdModel";
import { baseTimestampModel } from "./baseTimestampModel";

export const baseModel = {
  ...baseIdModel,
  ...baseTimestampModel,
};
