import {
  // BadgeCheck,
  Bell,
  BriefcaseBusiness,
  // FileCheck2,
  // Fingerprint,
  GraduationCap,
  // IdCard,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  UserKey,
} from "lucide-react";

import type { SettingsNavItem } from "../types/settings.types";

export const settingsNavigation: SettingsNavItem[] = [
  {
    label: "General",
    description: "Organisation and general preferences",
    icon: Settings,
    disabled: false,
    path: "/settings/general",
  },
  {
    label: "Job Types",
    description: "Configure job types and their properties",
    icon: BriefcaseBusiness,
    disabled: false,
    path: "/settings/job-types",
  },
  {
    label: "Compliance",
    description: "Manage compliance requirements",
    icon: ShieldCheck,
    children: [
      {
        label: "Training Certificates",
        description: "Manage mandatory training certificates",
        icon: GraduationCap,
        path: "/settings/compliance/training-certificates",
      },
      // {
      //   label: "Professional Memberships",
      //   description: "Manage professional membership requirements",
      //   icon: BadgeCheck,
      //   disabled: true,
      // },
      // {
      //   label: "DBS Requirements",
      //   description: "Configure DBS requirements",
      //   icon: FileCheck2,
      //   disabled: true,
      // },
      // {
      //   label: "Right to Work",
      //   description: "Configure right-to-work requirements",
      //   icon: IdCard,
      //   disabled: true,
      // },
      // {
      //   label: "Identity",
      //   description: "Configure identity requirements",
      //   icon: Fingerprint,
      //   disabled: true,
      // },
    ],
  },
  {
    label: "Roles & Permission",
    description: "Manage roles and permissions",
    icon: UserKey,
    disabled: false,
    path: "/settings/roles-permissions",
  },
  {
    label: "Users & Access",
    description: "Manage users, roles and permissions",
    icon: Users,
    path: "/settings/users",
    disabled: false,
  },
  {
    label: "Notifications",
    description: "Configure system notifications",
    icon: Bell,
    disabled: true,
  },
  {
    label: "System",
    description: "System and document configuration",
    icon: SlidersHorizontal,
    disabled: true,
  },
];
