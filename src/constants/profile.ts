import {
  BadgeCheck,
  BadgeQuestionMark,
  Book,
  History,
  LayoutDashboard,
  Settings,
  User,
  UserGroup,
  UserRoundPen,
} from "lucide-react";

export const profileSidebarItems = [
  {
    items: [
      { label: "Profile", icon: User, link: "/profile" },
      { label: "Dashboard", icon: LayoutDashboard, link: "/dashboard" },
      { label: "History", icon: History, link: "/history" },
    ],
  },
  {
    title: "Membership",
    items: [
      { label: "Membership", icon: UserGroup, link: "/membership" },
      { label: "Apply", icon: BadgeCheck, link: "/apply" },
      { label: "Passbook", icon: Book, link: "/passbook" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Update Profile", icon: UserRoundPen, link: "/update-profile" },
      { label: "Settings", icon: Settings, link: "/settings" },
      {
        label: "Help & Support",
        icon: BadgeQuestionMark,
        link: "/help-support",
      },
    ],
  },
];
