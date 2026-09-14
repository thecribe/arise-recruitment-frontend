import {
  CheckCircle2,
  Eye,
  FileCheck2,
  Pencil,
  ClipboardPenLine,
  MoreVertical,
  Send,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type {
  ManagerReference,
  ManagerReferenceAction,
} from "@/features/recruitment/types/reference.types";

interface ManagerReferenceActionsProps {
  reference: ManagerReference;
  onAction: (
    action: ManagerReferenceAction,
    reference: ManagerReference,
  ) => void;
}

export default function ManagerReferenceActions({
  reference,
  onAction,
}: ManagerReferenceActionsProps) {
  const handleAction = (action: ManagerReferenceAction) => {
    onAction(action, reference);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className="
          inline-flex
          h-9
          w-9
          items-center
          justify-center
          rounded-lg
          border
          border-blue-200/60
          bg-white/50
          text-slate-500
          outline-none
          transition
          hover:bg-blue-50/70
          hover:text-blue-600
          focus-visible:ring-2
          focus-visible:ring-blue-500/40
          data-popup-open:bg-blue-50
          data-popup-open:text-blue-600
          dark:border-blue-400/20
          dark:bg-white/5
          dark:text-slate-400
          dark:hover:bg-blue-500/10
          dark:hover:text-blue-300
          dark:data-popup-open:bg-blue-500/10
          dark:data-popup-open:text-blue-300
        "
        aria-label={`Actions for ${reference.companyName ?? "reference"}`}
      >
        <MoreVertical className="h-4 w-4" />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        sideOffset={6}
        className="
          w-56
          rounded-xl
          border
          border-blue-200/60
          bg-white/95
          p-1.5
          text-slate-700
          shadow-xl
          shadow-blue-900/10
          backdrop-blur-xl
          dark:border-blue-400/20
          dark:bg-slate-900/95
          dark:text-slate-200
        "
      >
        {/* View Reference */}
        <DropdownMenuItem
          onClick={() => handleAction("view")}
          className="
            cursor-pointer
            rounded-lg
            px-2.5
            py-2
            text-sm
            focus:bg-blue-50
            focus:text-blue-700
            dark:focus:bg-blue-500/10
            dark:focus:text-blue-300
          "
        >
          <Eye className="text-blue-500" />
          <span>View Reference</span>
        </DropdownMenuItem>

        {/* Edit Reference */}
        <DropdownMenuItem
          onClick={() => handleAction("edit")}
          className="
            cursor-pointer
            rounded-lg
            px-2.5
            py-2
            text-sm
            focus:bg-blue-50
            focus:text-blue-700
            dark:focus:bg-blue-500/10
            dark:focus:text-blue-300
          "
        >
          <Pencil className="text-blue-500" />
          <span>Edit Reference</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Fill / Edit Response */}
        <DropdownMenuItem
          onClick={() => handleAction("fill_response")}
          className="
            cursor-pointer
            rounded-lg
            px-2.5
            py-2
            text-sm
            focus:bg-blue-50
            focus:text-blue-700
            dark:focus:bg-blue-500/10
            dark:focus:text-blue-300
          "
        >
          <ClipboardPenLine className="text-blue-500" />

          <span>
            {reference.hasResponse ? "Edit Response" : "Fill Reference"}
          </span>
        </DropdownMenuItem>

        {/* View Response */}
        {reference.hasResponse && (
          <DropdownMenuItem
            onClick={() => handleAction("view_response")}
            className="
              cursor-pointer
              rounded-lg
              px-2.5
              py-2
              text-sm
              focus:bg-blue-50
              focus:text-blue-700
              dark:focus:bg-blue-500/10
              dark:focus:text-blue-300
            "
          >
            <FileCheck2 className="text-blue-500" />
            <span>View Response</span>
          </DropdownMenuItem>
        )}

        {/* Review */}
        {reference.hasResponse && (
          <DropdownMenuItem
            onClick={() => handleAction("review")}
            className="
              cursor-pointer
              rounded-lg
              px-2.5
              py-2
              text-sm
              focus:bg-blue-50
              focus:text-blue-700
              dark:focus:bg-blue-500/10
              dark:focus:text-blue-300
            "
          >
            <CheckCircle2 className="text-blue-500" />
            <span>Review Reference</span>
          </DropdownMenuItem>
        )}

        {/* Send */}
        {reference.mailStatus === "Not sent" && (
          <>
            <DropdownMenuSeparator />

            <DropdownMenuItem
              onClick={() => handleAction("send")}
              className="
                cursor-pointer
                rounded-lg
                px-2.5
                py-2
                text-sm
                focus:bg-blue-50
                focus:text-blue-700
                dark:focus:bg-blue-500/10
                dark:focus:text-blue-300
              "
            >
              <Send className="text-blue-500" />
              <span>Send Reference</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
