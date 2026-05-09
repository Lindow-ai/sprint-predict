import {
  CalendarRangeIcon,
  HomeIcon,
  LayersIcon,
  PlugIcon,
  SettingsIcon,
  TicketIcon,
  TrendingUpIcon,
} from "lucide-react";

export type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  soon?: boolean;
};

export type NavGroup = {
  section: string;
  items: NavItem[];
};

export const NAV: NavGroup[] = [
  {
    section: "Pilotage",
    items: [
      { href: "/dashboard", label: "Vue d'ensemble", icon: HomeIcon },
      { href: "/dashboard/tickets", label: "Tickets", icon: TicketIcon },
      { href: "/dashboard/sprints", label: "Sprints", icon: CalendarRangeIcon },
      {
        href: "/dashboard/trends",
        label: "Tendances",
        icon: TrendingUpIcon,
        soon: true,
      },
    ],
  },
  {
    section: "Configuration",
    items: [
      {
        href: "/dashboard/templates",
        label: "Templates équipe",
        icon: LayersIcon,
      },
      {
        href: "/dashboard/integrations",
        label: "Intégrations",
        icon: PlugIcon,
      },
      {
        href: "/dashboard/settings",
        label: "Paramètres",
        icon: SettingsIcon,
        soon: true,
      },
    ],
  },
];
