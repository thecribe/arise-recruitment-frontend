import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, UserPlus, X } from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";

import {
  useAssignableRoles,
  useCreateUser,
  useUpdateUser,
} from "../../hooks/useUsers";

import {
  userCreateSchema,
  userUpdateSchema,
  type UserCreateFormInput,
  type UserCreateFormOutput,
  type UserUpdateFormInput,
  type UserUpdateFormOutput,
} from "../../schemas/user.schema";

import { getUserFields } from "../../forms/user.fields";
import type { User } from "../../types/user.types";

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  user?: User | null;
}

const UserFormModal = ({ open, onClose, user }: UserFormModalProps) => {
  const isEditing = Boolean(user);

  const [feedback, setFeedback] = useState<string | null>(null);

  const { data: roles = [], isPending: rolesLoading } = useAssignableRoles();

  const createUser = useCreateUser();
  const updateUser = useUpdateUser();

  const isSaving = createUser.isPending || updateUser.isPending;

  const fields = useMemo(
    () => getUserFields(roles, isEditing),
    [roles, isEditing],
  );

  const createForm = useForm<
    UserCreateFormInput,
    unknown,
    UserCreateFormOutput
  >({
    resolver: zodResolver(userCreateSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      phone_number: "",
      address: "",
      postcode: "",
      role_id: "",
    },
    mode: "onBlur",
  });

  const updateForm = useForm<
    UserUpdateFormInput,
    unknown,
    UserUpdateFormOutput
  >({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      address: "",
      postcode: "",
    },
    mode: "onBlur",
  });

  useEffect(() => {
    if (!open) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFeedback(null);

    if (user) {
      updateForm.reset({
        first_name: user.first_name ?? "",
        last_name: user.last_name ?? "",
        email: user.email ?? "",
        phone_number: user.phone_number ?? "",
        address: user.address ?? "",
        postcode: user.postcode ?? "",
      });
    } else {
      createForm.reset({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        phone_number: "",
        address: "",
        postcode: "",
        role_id: "",
      });
    }
  }, [open, user, createForm, updateForm]);

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSaving) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => window.removeEventListener("keydown", handleEscape);
  }, [open, isSaving, onClose]);

  if (!open) return null;

  const submitCreate = async (values: UserCreateFormOutput) => {
    setFeedback(null);

    try {
      await createUser.mutateAsync({
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: values.password,
        role_id: values.role_id,
        phone_number: values.phone_number || undefined,
        address: values.address || undefined,
        postcode: values.postcode || undefined,
      });

      onClose();
    } catch {
      setFeedback(
        "Unable to create user. Please check the details and try again.",
      );
    }
  };

  const submitUpdate = async (values: UserUpdateFormOutput) => {
    if (!user) return;

    setFeedback(null);

    try {
      await updateUser.mutateAsync({
        id: user.id,
        values: {
          first_name: values.first_name,
          last_name: values.last_name,
          email: values.email,
          phone_number: values.phone_number || null,
          address: values.address || null,
          postcode: values.postcode || null,
        },
      });

      onClose();
    } catch {
      setFeedback(
        "Unable to update user. Please check the details and try again.",
      );
    }
  };

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !isSaving) {
          onClose();
        }
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-form-title"
        className="my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/60 bg-white/95 shadow-2xl backdrop-blur-2xl dark:border-white/10 dark:bg-slate-900/95"
      >
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200/70 bg-white/90 px-4 py-4 backdrop-blur-xl dark:border-slate-700/60 dark:bg-slate-900/90 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
              <UserPlus size={19} />
            </div>

            <div>
              <h2
                id="user-form-title"
                className="text-sm font-semibold text-slate-900 dark:text-white"
              >
                {isEditing ? "Edit user" : "Create user"}
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                {isEditing
                  ? "Update the user's account details."
                  : "Create an internal account and assign a role."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isSaving}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50 dark:hover:bg-slate-800 dark:hover:text-white"
          >
            <X size={18} />
          </button>
        </header>

        {isEditing ? (
          <FormProvider {...updateForm}>
            <form
              onSubmit={updateForm.handleSubmit(submitUpdate)}
              className="space-y-5 p-4 sm:p-6"
            >
              <FormRenderer
                fields={fields}
                config={{
                  mode: "edit",
                  canEdit: true,
                  disabled: isSaving,
                }}
              />

              {feedback && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                >
                  {feedback}
                </p>
              )}

              <footer className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || !updateForm.formState.isDirty}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  {isSaving ? "Saving..." : "Save changes"}
                </button>
              </footer>
            </form>
          </FormProvider>
        ) : (
          <FormProvider {...createForm}>
            <form
              onSubmit={createForm.handleSubmit(submitCreate)}
              className="space-y-5 p-4 sm:p-6"
            >
              <FormRenderer
                fields={fields}
                config={{
                  mode: "edit",
                  canEdit: true,
                  disabled: isSaving || rolesLoading,
                }}
              />

              {feedback && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300"
                >
                  {feedback}
                </p>
              )}

              <footer className="flex flex-col-reverse gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isSaving}
                  className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSaving || rolesLoading}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isSaving && <Loader2 size={16} className="animate-spin" />}
                  {isSaving ? "Creating..." : "Create user"}
                </button>
              </footer>
            </form>
          </FormProvider>
        )}
      </section>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default UserFormModal;
