import type { LucideIcon } from "lucide-react";

export interface SettingsNavItem {
  label: string;
  description: string;
  icon: LucideIcon;
  path?: string;
  children?: SettingsNavItem[];
  disabled?: boolean;
}
