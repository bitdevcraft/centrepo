"use client";

import * as React from "react";

import type { VariantProps } from "class-variance-authority";

import {
  Caption as CaptionPrimitive,
  CaptionTextarea as CaptionTextareaPrimitive,
  useCaptionButton,
  useCaptionButtonState,
} from "@platejs/caption/react";
import { createPrimitiveComponent } from "@udecode/cn";
import { cva } from "class-variance-authority";

import { Button } from "@repo/ui/components/shadcn/button";
import { cn } from "@repo/ui/lib/utils";

const captionVariants = cva("max-w-full", {
  defaultVariants: {
    align: "center",
  },
  variants: {
    align: {
      center: "mx-auto",
      left: "mr-auto",
      right: "ml-auto",
    },
  },
});

export function Caption({
  align,
  className,
  ...props
}: React.ComponentProps<typeof CaptionPrimitive> &
  VariantProps<typeof captionVariants>) {
  return (
    <CaptionPrimitive
      {...props}
      className={cn(captionVariants({ align }), className)}
    />
  );
}

export function CaptionTextarea(
  props: React.ComponentProps<typeof CaptionTextareaPrimitive>
) {
  return (
    <CaptionTextareaPrimitive
      {...props}
      className={cn(
        "mt-2 w-full resize-none border-none bg-inherit p-0 font-[inherit] text-inherit",
        "focus:outline-none focus:[&::placeholder]:opacity-0",
        "text-center print:placeholder:text-transparent",
        props.className
      )}
    />
  );
}

// @ts-nocheck
export const CaptionButton: any = createPrimitiveComponent(Button)({
  propsHook: useCaptionButton,
  stateHook: useCaptionButtonState,
});
