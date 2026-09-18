import { useEffect, useState } from "react";
import { ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import { settingsNavigation } from "../constants/settings-navigation";
import type { SettingsNavItem } from "../types/settings.types";

interface SettingsSidebarProps {
  className?: string;
}

const SettingsSidebar = ({ className = "" }: SettingsSidebarProps) => {
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(
    "Compliance",
  );

  /*
   * Automatically expand the parent section when one of
   * its children matches the current route.
   */
  useEffect(() => {
    const activeParent = settingsNavigation.find((item) =>
      item.children?.some((child) => child.path === location.pathname),
    );

    if (activeParent) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setExpandedSection(activeParent.label);
    }
  }, [location.pathname]);

  /*
   * Close the mobile menu whenever the user navigates.
   */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMobileOpen(false);
  }, [location.pathname]);

  const handleSectionToggle = (label: string) => {
    setExpandedSection((current) => (current === label ? null : label));
  };

  return (
    <>
      {/* Mobile settings selector */}
      <div className={`lg:hidden ${className}`}>
        <button
          type="button"
          onClick={() => setMobileOpen((open) => !open)}
          aria-expanded={mobileOpen}
          className="
            flex w-full items-center justify-between gap-3
            rounded-2xl
            border border-blue-200/60
            bg-white/50
            px-4 py-3
            text-left
            shadow-sm
            backdrop-blur-xl
            transition-colors
            hover:bg-blue-50/60
            dark:border-blue-400/20
            dark:bg-slate-900/40
            dark:hover:bg-blue-500/10
          "
        >
          <div className="flex min-w-0 items-center gap-3">
            <Menu className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-300" />

            <div className="min-w-0">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                Settings Menu
              </p>

              <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                Choose a settings category
              </p>
            </div>
          </div>

          {mobileOpen ? (
            <X className="h-5 w-5 shrink-0 text-slate-500" />
          ) : (
            <ChevronDown className="h-5 w-5 shrink-0 text-slate-500" />
          )}
        </button>

        {mobileOpen && (
          <div
            className="
              mt-3
              rounded-2xl
              border border-blue-200/60
              bg-white/60
              p-2
              shadow-sm
              backdrop-blur-xl
              dark:border-blue-400/20
              dark:bg-slate-900/50
            "
          >
            <nav className="space-y-1">
              {settingsNavigation.map((item) => (
                <SettingsNavItem
                  key={item.label}
                  item={item}
                  expandedSection={expandedSection}
                  onSectionToggle={handleSectionToggle}
                />
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Desktop settings sidebar */}
      <aside
        className={`
          hidden
          w-72
          shrink-0
          rounded-2xl
          border border-blue-200/60
          bg-white/40
          p-2
          shadow-sm
          backdrop-blur-xl
          dark:border-blue-400/20
          dark:bg-slate-900/30
          lg:block
          ${className}
        `}
      >
        <nav className="space-y-1">
          {settingsNavigation.map((item) => (
            <SettingsNavItem
              key={item.label}
              item={item}
              expandedSection={expandedSection}
              onSectionToggle={handleSectionToggle}
            />
          ))}
        </nav>
      </aside>
    </>
  );
};

interface SettingsNavItemProps {
  item: SettingsNavItem;
  expandedSection: string | null;
  onSectionToggle: (label: string) => void;
}

const SettingsNavItem = ({
  item,
  expandedSection,
  onSectionToggle,
}: SettingsNavItemProps) => {
  const Icon = item.icon;

  if (item.children) {
    const isExpanded = expandedSection === item.label;

    return (
      <div>
        <button
          type="button"
          disabled={item.disabled}
          onClick={() => onSectionToggle(item.label)}
          className={`
            flex w-full items-center gap-3
            rounded-xl
            px-3 py-2.5
            text-left
            transition-colors
            ${
              item.disabled
                ? `
                  cursor-not-allowed
                  text-slate-400
                  dark:text-slate-500
                `
                : `
                  text-slate-700
                  hover:bg-blue-50/60
                  hover:text-blue-700
                  dark:text-slate-200
                  dark:hover:bg-blue-500/10
                  dark:hover:text-blue-300
                `
            }
          `}
        >
          <Icon className="h-5 w-5 shrink-0" />

          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium">{item.label}</p>

            <p className="hidden truncate text-xs text-slate-500 dark:text-slate-400 sm:block">
              {item.description}
            </p>
          </div>

          {isExpanded ? (
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
          ) : (
            <ChevronRight className="h-4 w-4 shrink-0 text-slate-400" />
          )}
        </button>

        {isExpanded && (
          <div className="ml-4 mt-1 space-y-1 border-l border-blue-200/60 pl-2 dark:border-blue-400/20">
            {item.children.map((child) => (
              <SettingsNavItem
                key={child.label}
                item={child}
                expandedSection={expandedSection}
                onSectionToggle={onSectionToggle}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  if (item.disabled) {
    return (
      <div
        className="
          flex w-full cursor-not-allowed items-center gap-3
          rounded-xl
          px-3 py-2.5
          text-slate-400
          dark:text-slate-500
        "
      >
        <Icon className="h-5 w-5 shrink-0" />

        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium">{item.label}</p>

          <p className="hidden truncate text-xs sm:block">{item.description}</p>
        </div>

        <span className="hidden shrink-0 text-[10px] font-medium uppercase tracking-wide sm:block">
          Soon
        </span>
      </div>
    );
  }

  return (
    <NavLink
      to={item.path!}
      className={({ isActive }) => `
        flex w-full items-center gap-3
        rounded-xl
        px-3 py-2.5
        transition-colors
        ${
          isActive
            ? `
              border border-blue-200/70
              bg-blue-600/10
              text-blue-700
              shadow-sm
              dark:border-blue-400/20
              dark:bg-blue-500/10
              dark:text-blue-300
            `
            : `
              text-slate-600
              hover:bg-blue-50/60
              hover:text-blue-700
              dark:text-slate-300
              dark:hover:bg-blue-500/10
              dark:hover:text-blue-300
            `
        }
      `}
    >
      <Icon className="h-5 w-5 shrink-0" />

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{item.label}</p>

        <p className="hidden truncate text-xs text-slate-500 dark:text-slate-400 sm:block">
          {item.description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 opacity-50" />
    </NavLink>
  );
};

export default SettingsSidebar;
