/**
 * -----------------------------------------------------------------------------
 * File: RecruitmentApplicantTabs.tsx
 *
 * Description:
 * Navigation tabs for the Recruitment Applicant single page.
 *
 * Responsibilities:
 * - Render the applicant workspace navigation.
 * - Keep the tab styling consistent with the application's glassmorphism UI.
 * - Notify the parent page when the active tab changes.
 *
 * The actual tab content is rendered by RecruitmentApplicantPage.
 * -----------------------------------------------------------------------------
 */

import {
  ClipboardCheck,
  FileText,
  FolderOpen,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type RecruitmentApplicantTab =
  | "application"
  | "interview"
  | "compliance"
  | "profile"
  | "documents";

interface RecruitmentApplicantTabsProps {
  value: RecruitmentApplicantTab;

  onValueChange: (value: RecruitmentApplicantTab) => void;
}

/**
 * -----------------------------------------------------------------------------
 * Tab configuration.
 *
 * Keeping this configuration outside the component makes the component easier
 * to maintain when more applicant areas are introduced later.
 * -----------------------------------------------------------------------------
 */
const tabs = [
  {
    value: "application",
    label: "Application",
    icon: FileText,
  },
  {
    value: "interview",
    label: "Interview",
    icon: ClipboardCheck,
  },
  {
    value: "compliance",
    label: "Compliance",
    icon: ShieldCheck,
  },
  {
    value: "profile",
    label: "Profile & Settings",
    icon: UserRound,
  },
  {
    value: "documents",
    label: "Documents",
    icon: FolderOpen,
  },
] as const;

export default function RecruitmentApplicantTabs({
  value,
  onValueChange,
}: RecruitmentApplicantTabsProps) {
  return (
    <Tabs
      value={value}
      onValueChange={(nextValue) => {
        onValueChange(nextValue as RecruitmentApplicantTab);
      }}
    >
      {/*
       * -----------------------------------------------------------------------
       * The horizontal scroll is intentional.
       *
       * On smaller screens the five tabs should remain usable without
       * compressing the labels into unreadable buttons.
       * -----------------------------------------------------------------------
       */}
      <div className="overflow-x-auto">
        <TabsList
          className="
            inline-flex
            h-auto
            min-w-full
            justify-start
            gap-1
            rounded-2xl
            border
            border-white/60
            bg-white/60
            p-1
            shadow-sm
            backdrop-blur-xl
            sm:min-w-0
          "
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;

            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="
                  shrink-0
                  gap-2
                  rounded-xl
                  px-4
                  py-2.5
                  text-sm
                  text-slate-500
                  transition-all
                  data-[state=active]:bg-white
                  data-[state=active]:text-blue-700
                  data-[state=active]:shadow-sm
                "
              >
                <Icon className="h-4 w-4" />

                <span>{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>
      </div>
    </Tabs>
  );
}
