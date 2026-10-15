import { IProfileSidebarItems } from "./profile";
import {
  ArrowLeftRight,
  BadgeQuestionMark,
  HouseCog,
  LayoutDashboard,
  Megaphone,
  NotebookDot,
  ShieldCogCorner,
  UserGroup,
  UserStar,
} from "lucide-react";

export const adminSidebarItems: IProfileSidebarItems[] = [
  {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, link: "" },
      { label: "All Users", icon: UserGroup, link: "/all-users" },
    ],
  },
  {
    title: "Membership",
    items: [
      { label: "ABF Members", icon: UserStar, link: "/abf-members" },
      { label: "ABF Accounts", icon: NotebookDot, link: "/abf-accounts" },
    ],
  },
  {
    title: "Finance",
    items: [
      {
        label: "All Transactions",
        icon: ArrowLeftRight,
        link: "/abf-transactions",
      },
    ],
  },
  {
    title: "Content & Support",
    items: [
      {
        label: "Help & Support",
        icon: BadgeQuestionMark,
        link: "/abf-help-support",
      },
      {
        label: "Notifications",
        icon: Megaphone,
        link: "/abf-notifications",
      },
    ],
  },
  {
    title: "System",
    items: [
      {
        label: "Role Management",
        icon: ShieldCogCorner,
        link: "/abf-role-management",
      },
      {
        label: "Settings",
        icon: HouseCog,
        link: "/abf-settings",
      },
    ],
  },
];
