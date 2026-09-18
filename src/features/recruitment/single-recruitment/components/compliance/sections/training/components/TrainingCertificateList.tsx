import { AlertCircle, Plus } from "lucide-react";

import TrainingCertificateCard from "./TrainingCertificateCard";
import type {
  TrainingCertificate,
  TrainingCertificateRequirement,
} from "../types/training-certificate.types";

interface TrainingCertificateListProps {
  requirements: TrainingCertificateRequirement[];
  certificates: TrainingCertificate[];

  canEdit?: boolean;
  canDelete?: boolean;

  onAdd?: (requirement?: TrainingCertificateRequirement) => void;
  onView: (certificate: TrainingCertificate) => void;
  onEdit?: (certificate: TrainingCertificate) => void;
  onDelete?: (certificate: TrainingCertificate) => void;
}

const TrainingCertificateList = ({
  requirements,
  certificates,
  canEdit = false,
  canDelete = false,
  onAdd,
  onView,
  onEdit,
  onDelete,
}: TrainingCertificateListProps) => {
  const mandatoryRequirements = requirements.filter(
    (requirement) => requirement.active,
  );

  const mandatoryCertificates = mandatoryRequirements.map((requirement) => ({
    requirement,
    certificate:
      certificates.find(
        (certificate) => certificate.requirementId === requirement.id,
      ) ?? null,
  }));
  const otherCertificates = certificates.filter(
    (certificate) => certificate.requirementId === null,
  );

  return (
    <div className="space-y-8">
      {/* Mandatory Certificates */}
      <section>
        <div className="mb-4">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Mandatory Certificates
          </h3>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Applicants must provide all active certificate requirements listed
            below.
          </p>
        </div>

        {mandatoryCertificates.length === 0 ? (
          <div
            className="
              flex min-h-[180px]
              items-center justify-center
              rounded-2xl
              border border-blue-100/70
              bg-blue-50/30
              px-6 py-8
              text-center
              dark:border-blue-400/10
              dark:bg-slate-800/20
            "
          >
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No mandatory certificates configured
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Mandatory training certificate requirements will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {mandatoryCertificates.map(({ requirement, certificate }) =>
              certificate ? (
                <TrainingCertificateCard
                  key={requirement.id}
                  certificate={certificate}
                  requirementName={requirement.name}
                  isMandatory
                  canEdit={canEdit}
                  canDelete={canDelete}
                  onView={onView}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ) : (
                <div
                  key={requirement.id}
                  className="
                      relative
                      flex
                      min-w-0
                      flex-col
                      rounded-2xl
                      border border-amber-200/70
                      bg-amber-50/30
                      p-5
                      shadow-sm
                      backdrop-blur-xl
                      dark:border-amber-400/20
                      dark:bg-amber-500/5
                    "
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="
                          flex h-10 w-10 shrink-0
                          items-center justify-center
                          rounded-xl
                          bg-amber-100/70
                          text-amber-700
                          dark:bg-amber-500/10
                          dark:text-amber-300
                        "
                    >
                      <AlertCircle className="h-5 w-5" />
                    </div>

                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                        {requirement.name}
                      </h4>

                      <span
                        className="
                            mt-1
                            inline-flex
                            rounded-full
                            bg-blue-100/70
                            px-2 py-0.5
                            text-[11px]
                            font-medium
                            text-blue-700
                            dark:bg-blue-500/10
                            dark:text-blue-300
                          "
                      >
                        Mandatory
                      </span>
                    </div>
                  </div>

                  {requirement.description && (
                    <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-400">
                      {requirement.description}
                    </p>
                  )}

                  <div className="mt-5 flex items-center justify-between gap-3 border-t border-amber-200/50 pt-4 dark:border-amber-400/10">
                    <div>
                      <p className="text-xs font-medium text-amber-700 dark:text-amber-300">
                        Certificate missing
                      </p>

                      <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                        This requirement has not been satisfied.
                      </p>
                    </div>

                    {onAdd && (
                      <button
                        type="button"
                        onClick={() => onAdd(requirement)}
                        className="
                            inline-flex
                            shrink-0
                            items-center
                            gap-2
                            rounded-xl
                            bg-blue-600
                            px-3.5 py-2
                            text-sm
                            font-medium
                            text-white
                            shadow-lg
                            shadow-blue-950/20
                            transition
                            hover:bg-blue-500
                          "
                      >
                        <Plus className="h-4 w-4" />
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </section>

      {/* Other Certificates */}
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Other Certificates
            </h3>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Additional training certificates that are not part of the
              mandatory requirements.
            </p>
          </div>

          {onAdd && (
            <button
              type="button"
              onClick={() => onAdd()}
              className="
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                border border-blue-200/60
                bg-white/50
                px-4 py-2.5
                text-sm
                font-medium
                text-blue-700
                shadow-sm
                backdrop-blur-sm
                transition
                hover:bg-blue-50/70
                sm:w-auto
                dark:border-blue-400/20
                dark:bg-slate-900/30
                dark:text-blue-300
                dark:hover:bg-blue-500/10
              "
            >
              <Plus className="h-4 w-4" />
              Add Other Certificate
            </button>
          )}
        </div>

        {otherCertificates.length === 0 ? (
          <div
            className="
              flex min-h-[150px]
              items-center justify-center
              rounded-2xl
              border border-blue-100/70
              bg-blue-50/20
              px-6 py-8
              text-center
              dark:border-blue-400/10
              dark:bg-slate-800/20
            "
          >
            <div>
              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                No additional certificates
              </p>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Additional certificates will appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {otherCertificates.map((certificate) => (
              <TrainingCertificateCard
                key={certificate.id}
                certificate={certificate}
                canEdit={canEdit}
                canDelete={canDelete}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default TrainingCertificateList;
