import {
  ArrowLeftRight,
  BadgeQuestionMark,
  Book,
  FileUser,
  HandCoins,
  LayoutDashboard,
  Settings,
  User,
  UserGroup,
} from "lucide-react";

export const profileSidebarItems = [
  {
    items: [
      { label: "Dashboard", icon: LayoutDashboard, link: "/profile/dashboard" },
      { label: "Profile", icon: User, link: "/profile" },
    ],
  },
  {
    title: "Membership",
    items: [
      { label: "Membership", icon: UserGroup, link: "/membership" },
      { label: "My Account", icon: HandCoins, link: "/profile/account" },
      {
        label: "Transactions",
        icon: ArrowLeftRight,
        link: "/profile/transactions",
      },
      { label: "Passbook", icon: Book, link: "/profile/passbook" },
      { label: "Apply", icon: FileUser, link: "/profile/membership-apply" },
    ],
  },
  {
    title: "Settings",
    items: [
      { label: "Settings", icon: Settings, link: "/profile/settings" },
      {
        label: "Help & Support",
        icon: BadgeQuestionMark,
        link: "/profile/help-support",
      },
    ],
  },
];
