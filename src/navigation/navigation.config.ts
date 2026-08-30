/**
 * -----------------------------------------------------------------------------
 * File: navigation.config.ts
 * Description:
 * Dashboard navigation configuration.
 *
 * Responsibilities:
 * - Define all available navigation items.
 * - Do NOT perform permission filtering.
 * -----------------------------------------------------------------------------
 */

import {
  LayoutDashboard,
  FileText,
  Users,
  ShieldCheck,
  Settings,
} from "lucide-react";

import type { NavigationItem } from "./navigation.types";

export const navigation: NavigationItem[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    type: "general",
  },

  {
    id: "application",
    title: "Application",
    href: "/application",
    icon: FileText,
    permissions: ["APPLICATION_VIEW"],
    type: "general",
  },
  {
    id: "application-compliance",
    title: "Compliance",
    href: "/application-compliance",
    icon: ShieldCheck,
    permissions: ["APPLICATION_VIEW"],
    type: "general",
  },

  {
    id: "recruitment",
    title: "Recruitment",
    href: "/recruitment",
    icon: Users,
    permissions: ["recruitment:view"],
    type: "management",
  },

  {
    id: "compliance",
    title: "Compliance",
    href: "/compliance",
    icon: ShieldCheck,
    permissions: ["compliance:view"],
    type: "management",
  },

  {
    id: "settings",
    title: "Settings",
    href: "/settings",
    icon: Settings,
    type: "management",
  },
];
