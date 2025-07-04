import { BaseColumnItemPlugin, BaseColumnPlugin } from "@platejs/layout";
import {
  ColumnGroupElementStatic,
  ColumnElementStatic,
} from "../ui/column-node-static";

export const BaseColumnKit = [
  BaseColumnPlugin.withComponent(ColumnGroupElementStatic),
  BaseColumnItemPlugin.withComponent(ColumnElementStatic),
];
