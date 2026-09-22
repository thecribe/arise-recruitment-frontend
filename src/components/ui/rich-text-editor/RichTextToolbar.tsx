import {
  Bold,
  Italic,
  Link as LinkIcon,
  List,
  ListOrdered,
  Quote,
  Strikethrough,
  Underline,
} from "lucide-react";

import type { RichTextToolbarProps } from "./rich-text-editor.types";

interface ToolbarButtonProps {
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

function ToolbarButton({
  label,
  active = false,
  disabled = false,
  onClick,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`rounded-md p-2 transition-colors ${
        active
          ? "bg-blue-600 text-white"
          : "text-white hover:bg-slate-700 hover:text-white"
      } disabled:cursor-not-allowed disabled:opacity-50`}
    >
      {children}
    </button>
  );
}

export default function RichTextToolbar({
  editor,
  disabled = false,
}: RichTextToolbarProps) {
  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;

    const url = window.prompt("Enter URL", previousUrl || "");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-slate-700 bg-slate-950 p-2">
      <ToolbarButton
        label="Bold"
        active={editor.isActive("bold")}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold size={16} />
      </ToolbarButton>

      <ToolbarButton
        label="Italic"
        active={editor.isActive("italic")}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic size={16} />
      </ToolbarButton>

      <ToolbarButton
        label="Underline"
        active={editor.isActive("underline")}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline size={16} />
      </ToolbarButton>

      <ToolbarButton
        label="Strike-through"
        active={editor.isActive("strike")}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough size={16} />
      </ToolbarButton>

      <ToolbarButton
        label="Bullet list"
        active={editor.isActive("bulletList")}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List size={16} />
      </ToolbarButton>

      <ToolbarButton
        label="Numbered list"
        active={editor.isActive("orderedList")}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered size={16} />
      </ToolbarButton>

      <ToolbarButton
        label="Blockquote"
        active={editor.isActive("blockquote")}
        disabled={disabled}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote size={16} />
      </ToolbarButton>

      <ToolbarButton
        label="Link"
        active={editor.isActive("link")}
        disabled={disabled}
        onClick={addLink}
      >
        <LinkIcon size={16} />
      </ToolbarButton>

      <select
        defaultValue="paragraph"
        disabled={disabled}
        onChange={(event) => {
          const value = event.target.value;

          if (value === "paragraph") {
            editor.chain().focus().setParagraph().run();
          }

          if (value === "h2") {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
          }

          if (value === "h3") {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
          }
        }}
        className="rounded-md border border-slate-700 bg-slate-900 px-2 py-1 text-xs text-white disabled:opacity-50"
      >
        <option value="paragraph">Paragraph</option>
        <option value="h2">Heading 2</option>
        <option value="h3">Heading 3</option>
      </select>
    </div>
  );
}
