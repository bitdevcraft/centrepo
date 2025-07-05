"use client";

import { Toaster } from "@repo/ui/components/shadcn/sonner";
import { PlateEditor } from "@repo/ui/components/platejs/editor/plate-editor";
import { Plate, usePlateEditor } from "platejs/react";
import { EditorKit } from "@repo/ui/components/platejs/plugins/editor-kit";
import { SettingsDialog } from "@repo/ui/components/platejs/editor/settings-dialog";
import { EditorContainer, Editor } from "@repo/ui/components/platejs/ui/editor";
import { BaseEditorKit } from "@repo/ui/components/platejs/plugins/editor-base-kit";
import { EditorStatic } from "@repo/ui/components/platejs/ui/editor-static";
import { createSlateEditor, serializeHtml } from "platejs";
import { Button } from "@repo/ui/components/shadcn/button";
import { DocxKit } from "@repo/ui/components/platejs/plugins/docx-kit";

const siteUrl = "https://platejs.org";

export default function Page() {
  const editor = usePlateEditor({
    plugins: [...EditorKit, ...DocxKit],
  });

  const exportToHtml = async () => {
    const editorStatic = createSlateEditor({
      plugins: BaseEditorKit,
      value: editor.children,
    });

    const editorHtml = await serializeHtml(editorStatic, {
      editorComponent: EditorStatic,
      props: { style: { padding: "0 calc(50% - 350px)", paddingBottom: "" } },
    });

    const tailwindCss = `<link rel="stylesheet" href="${siteUrl}/tailwind.css">`;
    const katexCss = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.18/dist/katex.css" integrity="sha384-9PvLvaiSKCPkFKB1ZsEoTjgnJn+O3KvEwtsz37/XrkYft3DTk2gHdYvd9oWgW3tV" crossorigin="anonymous">`;

    const html = `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&family=JetBrains+Mono:wght@400..700&display=swap"
          rel="stylesheet"
        />
        ${tailwindCss}
        ${katexCss}
        <style>
          :root {
            --font-sans: 'Inter', 'Inter Fallback';
            --font-mono: 'JetBrains Mono', 'JetBrains Mono Fallback';
          }
        </style>
      </head>
      <body>
        ${editorHtml}
      </body>
    </html>`;

    console.log(html);
  };

  return (
    <div className="h-screen w-full p-9">
      <div className="border">
        {/* <PlateEditor /> */}
        <Plate editor={editor}>
          <EditorContainer>
            <Editor variant="demo" />
          </EditorContainer>

          <SettingsDialog />
        </Plate>
        <Toaster />
      </div>
      <Button onClick={exportToHtml}>Save</Button>
    </div>
  );
}

/**
 * 

 const editor = usePlateEditor({
    plugins: EditorKit,
    value,
  });

  console.log(editor.children);

  return (
    <Plate editor={editor}>
      <EditorContainer>
        <Editor variant="demo" />
      </EditorContainer>

      <SettingsDialog />
    </Plate>
  );
 */
