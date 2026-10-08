import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/icons";
import {
  BriefcaseBusiness,
  Clock,
  HandCoins,
  Landmark,
  Mail,
  MapPin,
  Phone,
  TrendingUp,
  UserPlus,
  UsersRound,
  WalletCards,
} from "lucide-react";

interface itemsOfICTALink {
  link: string;
  label: string;
}
interface ICTALink {
  name: string;
  items: itemsOfICTALink[];
}
// Header Navigations Items ===
export const Navlist: itemsOfICTALink[] = [
  { link: "/profile", label: "Profile" },
  { link: "/gallery", label: "Gallery" },
  { link: "/membership", label: "Membership" },
  { link: "/#about", label: "About us" },
  { link: "/#contact", label: "Contact us" },
];

// Footer Navigations Items ===
export const socials = [
  { icon: YoutubeIcon, link: "#" },
  { icon: FacebookIcon, link: "#" },
  { icon: InstagramIcon, link: "#" },
];

export const footerLinks: ICTALink[] = [
  { name: "Explore", items: Navlist },
  {
    name: "Organizations",
    items: [
      { link: "#", label: "Anirban Organization" },
      { link: "#", label: "Anirban Business Fund" },
      { link: "#", label: "অনির্বাণ কল্যাণ তহবিল" },
      { link: "#", label: "Anirban Shop" },
    ],
  },
  {
    name: "Importent Links",
    items: [
      { link: "#about", label: "About ABF" },
      { link: "#contact", label: "Contact ABF" },
      { link: "/privacy-policy", label: "Privacy Policy" },
      { link: "/refund-policy", label: "Refund Policy" },
      { link: "/terms-conditions", label: "Terms & Conditions" },
    ],
  },
];

// ABF Stats ===
interface ABFStatsTypes {
  number: number;
  desc: string;
  prefix?: string;
  suffix?: string;
}
export const abfStats: ABFStatsTypes[] = [
  {
    number: 35,
    desc: "Active Member",
    suffix: "+",
  },
  {
    number: 150,
    desc: "Trusted By Company",
    suffix: "+",
  },
  {
    number: 7000,
    desc: "Our Target",
    suffix: "M+",
    prefix: "$",
  },
];

// How ABF Works ===
export const steps = [
  {
    id: "01",
    icon: UserPlus,
    title: "Become a Member",
    description:
      "Join Anirban Business Fund and become part of a community built around collective participation.",
  },
  {
    id: "02",
    icon: WalletCards,
    title: "Contribute Regularly",
    description:
      "Members make regular contributions according to the fund's established rules and schedule.",
  },
  {
    id: "03",
    icon: Landmark,
    title: "Build the Fund",
    description:
      "Regular contributions come together to create a collective fund for suitable opportunities.",
  },
  {
    id: "04",
    icon: BriefcaseBusiness,
    title: "Explore Opportunities",
    description:
      "The fund can be considered for suitable business and investment opportunities through responsible decision-making.",
  },
  {
    id: "05",
    icon: TrendingUp,
    title: "Grow Together",
    description:
      "Through participation, responsible use of resources, and long-term thinking, ABF aims to grow collectively.",
  },
];

// Services ===
export const servicescardData = [
  {
    icon: UsersRound,
    head: "Member Participation",
    desc: "ABF is built around active member participation, regular contributions, and collective involvement.",
  },
  {
    icon: HandCoins,
    head: "Fund Building",
    desc: "Regular contributions come together to build a collective fund for suitable opportunities and future activities.",
  },
  {
    icon: BriefcaseBusiness,
    head: "Business Opportunities",
    desc: "The fund may be considered for suitable business and investment opportunities with a long-term growth mindset.",
  },
];

// FAQ ===
export const faqs = [
  {
    question: "What is Anirban Business Fund?",
    answer:
      "Anirban Business Fund (ABF) is a member-driven initiative under Anirban Organization. It brings members together through regular contributions with the aim of building a collective fund for suitable business and investment opportunities.",
  },
  {
    question: "Who can become a member of ABF?",
    answer:
      "Membership is available to individuals who meet the membership requirements established by Anirban Business Fund. For current membership criteria and availability, please contact the ABF team.",
  },
  {
    question: "How does the ABF contribution system work?",
    answer:
      "Members contribute regularly according to the contribution rules established by ABF. Each contribution is recorded and maintained as part of the member's fund records.",
  },
  {
    question: "How is the collected fund used?",
    answer:
      "The collective fund may be used for suitable business and investment opportunities based on the organization's established process and decisions.",
  },
  {
    question: "Does ABF guarantee a profit or return?",
    answer:
      "No specific profit or return should be considered guaranteed. Business and investment activities involve risks, and outcomes may vary depending on the opportunity and circumstances.",
  },
  {
    question: "How can members keep track of their contributions?",
    answer:
      "Members can maintain their contribution records through the ABF member passbook and other records maintained by the organization.",
  },
  {
    question: "Can I learn about ABF's activities and updates?",
    answer:
      "Yes. Relevant activities, announcements, and updates can be shared through ABF's official communication channels.",
  },
  {
    question: "How can I become a member?",
    answer:
      "You can contact the ABF team or use the membership option on this website to learn about the current joining process and requirements.",
  },
];

// Contact ===
export const contact = [
  {
    icon: Phone,
    label: "Phone",
    info: "+880 1XXXXXXXXX",
  },
  {
    icon: Mail,
    label: "Email",
    info: "example@gmail.com",
  },
  {
    icon: MapPin,
    label: "Address",
    info: "203 Fake St. Mountain View, San Francisco, California, USA",
  },
  {
    icon: Clock,
    label: "Office Time",
    info: "24/7 (Saturday – Thursday)",
  },
];
