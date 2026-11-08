import { UserPlus } from "lucide-react";

interface AddApplicantButtonProps {
  onClick: () => void;
}

const AddApplicantButton = ({ onClick }: AddApplicantButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition hover:bg-blue-700"
    >
      <UserPlus size={17} />
      <span>Add new applicant</span>
    </button>
  );
};

export default AddApplicantButton;
