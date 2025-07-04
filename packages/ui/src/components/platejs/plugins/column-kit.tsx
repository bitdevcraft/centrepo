"use client";

import { ColumnItemPlugin, ColumnPlugin } from "@platejs/layout/react";
import { ColumnGroupElement, ColumnElement } from "../ui/column-node";

export const ColumnKit = [
  ColumnPlugin.withComponent(ColumnGroupElement),
  ColumnItemPlugin.withComponent(ColumnElement),
];
