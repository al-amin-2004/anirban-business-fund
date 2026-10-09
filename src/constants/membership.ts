import {
  BadgeCheck,
  ClipboardCheck,
  ClipboardList,
  Download,
  FileCheck2,
  FileSignature,
  FileText,
  HandCoins,
  IdCard,
  LineChart,
  PenLine,
  SearchCheck,
  Send,
  ShieldCheck,
  UserCheck,
  UserRound,
  UsersRound,
} from "lucide-react";
import { IcardCommon } from "./home";

// Benifits ===
export const benefits: IcardCommon[] = [
  {
    number: "01",
    icon: UsersRound,
    title: "Be Part of the Community",
    description:
      "Become part of a group built around collective participation, shared responsibility, and a common long-term vision.",
  },
  {
    number: "02",
    icon: HandCoins,
    title: "Build the Fund Together",
    description:
      "Regular contributions from members help create a stronger collective fund for future activities and opportunities.",
  },
  {
    number: "03",
    icon: LineChart,
    title: "Think Long Term",
    description:
      "ABF follows a long-term approach where the focus is on building a sustainable fund rather than short-term expectations.",
  },
  {
    number: "04",
    icon: ShieldCheck,
    title: "Structured & Responsible",
    description:
      "Membership follows a defined process with records, contribution tracking, and authority-based approval.",
  },
];

// Membership Eligibility ===
export const requirements: IcardCommon[] = [
  {
    number: "01",
    icon: UserCheck,
    title: "Active ABF Account",
    description:
      "Applicants should have a registered and verified account on the Anirban Business Fund platform.",
  },
  {
    number: "02",
    icon: FileText,
    title: "Complete Information",
    description:
      "Required personal and contact information must be provided accurately for the membership application.",
  },
  {
    number: "03",
    icon: ClipboardCheck,
    title: "Physical Application",
    description:
      "The membership form must be downloaded, completed, signed, and physically submitted to the authorized ABF authority.",
  },
  {
    number: "04",
    icon: BadgeCheck,
    title: "Authority Approval",
    description:
      "Submitting an application does not automatically create membership. Membership becomes active only after approval.",
  },
];

// Membership Process ===
export const steps: IcardCommon[] = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Start Your Application",
    description:
      "Begin the membership process from your ABF account and provide the required information.",
  },
  {
    number: "02",
    icon: Download,
    title: "Generate & Download",
    description:
      "Generate your official ABF membership form and download it for physical completion.",
  },
  {
    number: "03",
    icon: FileSignature,
    title: "Fill & Sign",
    description:
      "Print the form, complete the required information, and provide your signature.",
  },
  {
    number: "04",
    icon: Send,
    title: "Submit Physically",
    description:
      "Submit the completed and signed membership form to the authorized ABF authority.",
  },
  {
    number: "05",
    icon: SearchCheck,
    title: "Application Review",
    description:
      "The submitted application will be reviewed and verified by the ABF authority.",
  },
  {
    number: "06",
    icon: UserCheck,
    title: "Become a Member",
    description:
      "Once approved, your account will be updated to member status and your ABF account will be created.",
  },
];

// Membership Requirements ===
export const requirements2: IcardCommon[] = [
  {
    number: "01",
    icon: UserRound,
    title: "Accurate Personal Information",
    description:
      "Make sure your profile and application information is complete and accurate before generating the membership form.",
  },
  {
    number: "02",
    icon: FileCheck2,
    title: "Official Membership Form",
    description:
      "Download the ABF membership form generated from your application and use the official form for physical submission.",
  },
  {
    number: "03",
    icon: PenLine,
    title: "Applicant Signature",
    description:
      "Print the form and complete all required sections before signing it in the designated place.",
  },
  {
    number: "04",
    icon: IdCard,
    title: "Physical Submission",
    description:
      "Submit the completed and signed form to the authorized ABF authority for verification and review.",
  },
];
