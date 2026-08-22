// import { Save, X } from "lucide-react";
// import { useFormContext } from "react-hook-form";

// import { Button } from "@/components/ui/button";

// interface RecruitmentSectionEditActionsProps {
//   sectionId: string;

//   repeatable: boolean;

//   onCancel: () => void;

//   onSave: (values: Record<string, unknown> | Record<string, unknown>[]) => void;
// }

// export default function RecruitmentSectionEditActions({
//   sectionId,
//   repeatable,
//   onCancel,
//   onSave,
// }: RecruitmentSectionEditActionsProps) {
//   const { handleSubmit, getValues } = useFormContext();

//   const handleSave = handleSubmit(() => {
//     /**
//      * -------------------------------------------------------------------------
//      * Repeatable section
//      *
//      * RHF structure:
//      *
//      * {
//      *   [sectionId]: [
//      *     {...},
//      *     {...},
//      *   ]
//      * }
//      * -------------------------------------------------------------------------
//      */
//     if (repeatable) {
//       const values = getValues(sectionId);

//       console.log("Repeatable section values:", values);

//       onSave(Array.isArray(values) ? values : []);

//       return;
//     }

//     /**
//      * -------------------------------------------------------------------------
//      * Non-repeatable section
//      * -------------------------------------------------------------------------
//      */

//     const values = getValues();

//     console.log("Section values:", values);

//     onSave(values);
//   });

//   return (
//     <div className="flex flex-col gap-3 sm:flex-row">
//       <Button
//         type="button"
//         variant="outline"
//         size="sm"
//         leftIcon={<X className="h-4 w-4" />}
//         onClick={onCancel}
//       >
//         Cancel
//       </Button>

//       <Button
//         type="button"
//         size="sm"
//         leftIcon={<Save className="h-4 w-4" />}
//         onClick={handleSave}
//       >
//         Save Changes
//       </Button>
//     </div>
//   );
// }

import { Save, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";

interface RecruitmentSectionEditActionsProps {
  sectionId: string;

  repeatable: boolean;

  onCancel: () => void;

  onSave: (values: Record<string, unknown> | Record<string, unknown>[]) => void;
}

export default function RecruitmentSectionEditActions({
  sectionId,
  repeatable,
  onCancel,
  onSave,
}: RecruitmentSectionEditActionsProps) {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext();

  const onValid = () => {
    if (repeatable) {
      const values = getValues(sectionId);

      onSave(Array.isArray(values) ? values : []);

      return;
    }

    const values = getValues();

    onSave(values);
  };

  const onInvalid = (validationErrors: unknown) => {
    console.error("FORM INVALID:", validationErrors);

    console.log("FORM ERRORS:", errors);

    console.log("CURRENT FORM VALUES:", getValues());
  };

  const handleSave = handleSubmit(onValid, onInvalid);

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      <Button
        type="button"
        variant="outline"
        size="sm"
        leftIcon={<X className="h-4 w-4" />}
        onClick={onCancel}
      >
        Cancel
      </Button>

      <Button
        type="button"
        size="sm"
        leftIcon={<Save className="h-4 w-4" />}
        onClick={() => {
          handleSave();
        }}
      >
        Save Changes
      </Button>
    </div>
  );
}
