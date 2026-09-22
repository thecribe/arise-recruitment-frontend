import type { Editor } from "@tiptap/react";

export interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;

  placeholder?: string;
  disabled?: boolean;
  readOnly?: boolean;

  minHeight?: string;
  className?: string;
}

export interface RichTextToolbarProps {
  editor: Editor;
  disabled?: boolean;
}
