import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import {
  X,
  UserRound,
  LockKeyhole,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import UserProfileSettings from "./UserProfileSettings";
import UserPasswordSettings from "./UserPasswordSettings";

type SettingsTab = "profile" | "password";

interface UserSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const settingsNavigation = [
  {
    id: "profile" as const,
    label: "Profile details",
    description: "Personal information",
    icon: UserRound,
  },
  {
    id: "password" as const,
    label: "Change password",
    description: "Account security",
    icon: LockKeyhole,
  },
];

export default function UserSettingsModal({
  open,
  onClose,
}: UserSettingsModalProps) {
  const [activeTab, setActiveTab] = useState<SettingsTab>("profile");

  // Handle Escape key and prevent background scrolling.
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  // Reset to profile details when the modal opens.
  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveTab("profile");
    }
  }, [open]);

  if (!open) return null;

  const activeNavigation = settingsNavigation.find(
    (item) => item.id === activeTab,
  );

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="user-settings-title"
        className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-white/40 bg-white/90 shadow-2xl shadow-blue-950/20 backdrop-blur-2xl sm:max-h-[85vh]"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-blue-100/80 bg-gradient-to-r from-blue-50/90 to-white/80 px-5 py-4 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <ShieldCheck size={21} />
            </div>

            <div>
              <h2
                id="user-settings-title"
                className="text-lg font-bold text-slate-900"
              >
                Account settings
              </h2>

              <p className="text-xs text-slate-500">
                Manage your profile and account security.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close settings"
            className="flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 transition hover:bg-blue-100 hover:text-blue-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal body */}
        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden md:grid-cols-[220px_minmax(0,1fr)]">
          {/* Sidebar */}
          <aside className="shrink-0 border-b border-blue-100/80 bg-blue-50/40 p-3 md:border-b-0 md:border-r md:p-4">
            <p className="mb-3 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Account
            </p>

            <nav className="flex gap-2 md:flex-col">
              {settingsNavigation.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    aria-current={isActive ? "page" : undefined}
                    className={`
                      flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left transition
                      ${
                        isActive
                          ? "bg-white text-blue-700 shadow-sm ring-1 ring-blue-100"
                          : "text-slate-600 hover:bg-white/70 hover:text-blue-700"
                      }
                    `}
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        isActive
                          ? "bg-blue-100 text-blue-700"
                          : "bg-white text-slate-500"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-xs font-semibold sm:text-sm">
                        {item.label}
                      </p>

                      <p className="hidden truncate text-[11px] text-slate-400 sm:block">
                        {item.description}
                      </p>
                    </div>

                    <ChevronRight
                      size={15}
                      className={`hidden shrink-0 md:block ${
                        isActive ? "text-blue-600" : "text-slate-300"
                      }`}
                    />
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Content */}
          <main className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="mb-5">
              <h3 className="text-base font-bold text-slate-900">
                {activeNavigation?.label}
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                {activeTab === "profile"
                  ? "Update your personal information and profile image."
                  : "Keep your account secure by updating your password."}
              </p>
            </div>

            {activeTab === "profile" && <UserProfileSettings />}

            {activeTab === "password" && <UserPasswordSettings />}
          </main>
        </div>
      </div>
    </div>,
    document.body,
  );
}
