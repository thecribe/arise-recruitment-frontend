import {
  BadgeCheck,
  Bell,
  BriefcaseBusiness,
  FileCheck2,
  Fingerprint,
  GraduationCap,
  IdCard,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import type { SettingsNavItem } from "../types/settings.types";

export const settingsNavigation: SettingsNavItem[] = [
  {
    label: "General",
    description: "Organisation and general preferences",
    icon: Settings,
    disabled: true,
  },
  {
    label: "Recruitment",
    description: "Configure recruitment workflows",
    icon: BriefcaseBusiness,
    disabled: true,
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
      {
        label: "Professional Memberships",
        description: "Manage professional membership requirements",
        icon: BadgeCheck,
        disabled: true,
      },
      {
        label: "DBS Requirements",
        description: "Configure DBS requirements",
        icon: FileCheck2,
        disabled: true,
      },
      {
        label: "Right to Work",
        description: "Configure right-to-work requirements",
        icon: IdCard,
        disabled: true,
      },
      {
        label: "Identity",
        description: "Configure identity requirements",
        icon: Fingerprint,
        disabled: true,
      },
    ],
  },
  {
    label: "Users & Access",
    description: "Manage users, roles and permissions",
    icon: Users,
    disabled: true,
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
