import { useEffect } from "react";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";

import RichTextToolbar from "./RichTextToolbar";

import type { RichTextEditorProps } from "./rich-text-editor.types";

const EMPTY_CONTENT = "<p></p>";

export default function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  disabled = false,
  readOnly = false,
  minHeight = "160px",
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        link: false,
        underline: false,
      }),

      Underline,

      Link.configure({
        openOnClick: false,
        autolink: true,
        linkOnPaste: true,
      }),
    ],

    content: value || EMPTY_CONTENT,

    immediatelyRender: false,

    editable: !disabled && !readOnly,

    editorProps: {
      attributes: {
        class: `rich-text-editor-content ${
          disabled || readOnly ? "cursor-default opacity-70" : ""
        }`,

        "data-placeholder": placeholder,

        style: `min-height: ${minHeight};`,
      },
    },

    onUpdate: ({ editor: currentEditor }) => {
      if (!disabled && !readOnly) {
        onChange(currentEditor.getHTML());
      }
    },
  });

  /**
   * Synchronize external value changes with the editor.
   */
  useEffect(() => {
    if (!editor) return;

    const currentContent = editor.getHTML();
    const nextContent = value || EMPTY_CONTENT;

    if (nextContent !== currentContent) {
      editor.commands.setContent(nextContent, {
        emitUpdate: false,
      });
    }
  }, [editor, value]);

  /**
   * Update editor editable state when disabled/readOnly changes.
   */
  useEffect(() => {
    if (!editor) return;

    editor.setEditable(!disabled && !readOnly);
  }, [editor, disabled, readOnly]);

  if (!editor) return null;

  return (
    <div className={`rich-text-editor ${className}`}>
      {!readOnly && <RichTextToolbar editor={editor} disabled={disabled} />}

      <EditorContent editor={editor} />
    </div>
  );
}
