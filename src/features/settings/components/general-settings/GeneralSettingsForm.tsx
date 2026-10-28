import { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Building2,
  ContactRound,
  Image as ImageIcon,
  Save,
} from "lucide-react";

import FormRenderer from "@/components/forms/FormRenderer";
import type { FormField } from "@/components/forms/types/field";
import type {
  GeneralSettings,
  GeneralSettingsFormValues,
} from "../../types/general-settings.types";
import { generalSettingsFields } from "../../forms/general-settings.fields";
import { generalSettingsSchema } from "../../schemas/general-settings.schema";
import type z from "zod";

interface GeneralSettingsFormProps {
  settings: GeneralSettings | null;
  isSaving: boolean;
  onSave: (values: GeneralSettingsFormValues) => Promise<void>;
}

type GeneralSettingsFormInput = z.input<typeof generalSettingsSchema>;
type GeneralSettingsFormOutput = z.output<typeof generalSettingsSchema>;

const defaults: GeneralSettingsFormValues = {
  organisation_name: "",
  site_name: "",
  description: "",
  website_url: "",
  organisation_email: "",
  recruitment_email: "",
  telephone: "",
  address: "",
  country: "",
  postcode: "",
  logo: null,
  favicon: null,
};

const normaliseFile = (value: unknown) => {
  if (!value || typeof value !== "object") return null;

  const file = value as Record<string, unknown>;

  if (typeof file.document_url !== "string" || typeof file.name !== "string") {
    return null;
  }

  return {
    ...file,
    id: typeof file.id === "string" ? file.id : file.document_url,
    document_url: file.document_url,
    name: file.name,
  };
};

const toFormValues = (
  settings: GeneralSettings | null,
): GeneralSettingsFormValues => {
  if (!settings) return defaults;

  return {
    organisation_name: settings.organisation_name ?? "",
    site_name: settings.site_name ?? "",
    description: settings.description ?? "",
    website_url: settings.website_url ?? "",
    organisation_email: settings.organisation_email ?? "",
    recruitment_email: settings.recruitment_email ?? "",
    telephone: settings.telephone ?? "",
    address: settings.address ?? "",
    country: settings.country ?? "",
    postcode: settings.postcode ?? "",
    logo: normaliseFile(settings.logo),
    favicon: normaliseFile(settings.favicon),
  };
};

const sectionFields = (names: string[]): FormField[] =>
  generalSettingsFields.filter(
    (field) => field.name && names.includes(field.name),
  );

const sections = [
  {
    title: "Organisation details",
    description: "The name and public identity of your organisation.",
    icon: Building2,
    fields: sectionFields([
      "organisation_name",
      "site_name",
      "description",
      "website_url",
    ]),
  },
  {
    title: "Contact and address",
    description: "Contact details used for general and recruitment enquiries.",
    icon: ContactRound,
    fields: sectionFields([
      "organisation_email",
      "recruitment_email",
      "telephone",
      "address",
      "country",
      "postcode",
    ]),
  },
  {
    title: "Branding",
    description: "Manage the logo and favicon used across the site.",
    icon: ImageIcon,
    fields: sectionFields(["logo", "favicon"]),
  },
];

export default function GeneralSettingsForm({
  settings,
  isSaving,
  onSave,
}: GeneralSettingsFormProps) {
  const initialValues = useMemo(() => toFormValues(settings), [settings]);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const form = useForm<
    GeneralSettingsFormInput,
    unknown,
    GeneralSettingsFormOutput
  >({
    resolver: zodResolver(generalSettingsSchema),
    defaultValues: initialValues,
    mode: "onBlur",
  });

  const { handleSubmit, reset, formState } = form;

  useEffect(() => {
    reset(initialValues);
  }, [initialValues, reset]);

  const submit = async (values: GeneralSettingsFormOutput) => {
    setFeedback(null);

    try {
      await onSave(values);
      setFeedback({
        type: "success",
        message: "General settings saved successfully.",
      });
    } catch {
      setFeedback({
        type: "error",
        message: "Unable to save settings. Please try again.",
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        {sections.map(({ title, description, icon: Icon, fields }) => (
          <section
            key={title}
            className="overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60"
          >
            <header className="flex items-start gap-3 border-b border-slate-200/70 bg-white/40 px-4 py-4 sm:px-5 dark:border-slate-700/60 dark:bg-slate-900/30">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                <Icon size={19} />
              </div>

              <div className="min-w-0">
                <h2 className="text-sm font-semibold text-slate-900 dark:text-white">
                  {title}
                </h2>
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {description}
                </p>
              </div>
            </header>

            <div className="p-4 sm:p-5">
              <FormRenderer
                fields={fields}
                config={{
                  mode: "edit",
                  canEdit: true,
                  disabled: isSaving,
                }}
              />
            </div>
          </section>
        ))}

        {feedback && (
          <p
            role="status"
            className={`rounded-xl border px-4 py-3 text-sm ${
              feedback.type === "success"
                ? "border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/40 dark:text-blue-200"
                : "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200"
            }`}
          >
            {feedback.message}
          </p>
        )}

        <div className="sticky bottom-3 z-10 flex justify-end rounded-2xl border border-white/60 bg-white/85 p-3 shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/85">
          <button
            type="submit"
            disabled={isSaving || !formState.isDirty}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
          >
            <Save size={16} />
            {isSaving ? "Saving settings..." : "Save changes"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
