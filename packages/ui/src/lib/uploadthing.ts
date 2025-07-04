import type { FileRouter } from "uploadthing/next";

import { createUploadthing } from "uploadthing/next";
import { FileRoute } from "uploadthing/types";

const f = createUploadthing();

export const ourFileRouter: {
  editorUploader: FileRoute<{
    input: undefined;
    output: {
      key: string;
      name: string;
      size: number;
      type: string;
      url: string;
    };
    errorShape: any;
  }>;
} = {
  editorUploader: f(["image", "text", "blob", "pdf", "video", "audio"])
    .middleware(() => {
      return {};
    })
    .onUploadComplete(({ file }) => {
      return {
        key: file.key,
        name: file.name,
        size: file.size,
        type: file.type,
        url: file.ufsUrl,
      };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
