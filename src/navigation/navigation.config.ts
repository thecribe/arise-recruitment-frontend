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
  },

  {
    id: "application",
    title: "Application",
    href: "/application",
    icon: FileText,
    permissions: ["application:view"],
  },

  {
    id: "recruitment",
    title: "Recruitment",
    href: "/recruitment",
    icon: Users,
    permissions: ["recruitment:view"],
  },

  {
    id: "compliance",
    title: "Compliance",
    href: "/compliance",
    icon: ShieldCheck,
    permissions: ["compliance:view"],
  },

  {
    id: "settings",
    title: "Settings",
    href: "settings",
    icon: Settings,
  },
];
