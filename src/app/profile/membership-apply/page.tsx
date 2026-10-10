"use client";

import { FC, useState } from "react";
import { useUser } from "@/providers/UserContext";
import { defineStepper } from "@stepperize/react";
import { buttonVariants } from "@/components/ui/button";
import { accountNameValidation } from "@/schemas/commonSchema";
import { cn } from "cn";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import Input from "@/app/_components/ui/Input";
import MembershipPDF, {
  type MembershipPDFApplicant,
} from "../_components/ui/membershipPDF";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  FileText,
  Info,
  ShieldCheck,
  UserRound,
} from "lucide-react";

const membershipStepper = defineStepper(
  [
    { id: "information", title: "Your Information", icon: UserRound },
    {
      id: "accountName",
      title: "Account Name",
      icon: FileText,
      schema: accountNameValidation,
    },
    { id: "preview", title: "Preview Form", icon: ShieldCheck },
    { id: "download", title: "Download Form", icon: Download },
  ] as const,
  {
    defaultData: {
      accountName: { accountName: "" },
    },
  },
);

const { Stepper } = membershipStepper;

type Errors = Record<string, string>;

function toErrors(
  issues: ReadonlyArray<{
    message: string;
    path?: ReadonlyArray<unknown>;
  }>,
): Errors {
  const errors: Errors = {};

  for (const issue of issues) {
    const key = String(issue.path?.[0] ?? "_");
    errors[key] ??= issue.message;
  }

  return errors;
}

const Page = () => {
  const { user } = useUser();
  const [errors, setErrors] = useState<Errors>({});

  if (!user) return;

  return (
    <main className="min-h-screen py-10">
      <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
            Membership Application
          </h1>

          <p className="mt-2 max-w-2xl text-sm md:leading-6 text-muted-foreground sm:text-base">
            Review your information, provide your account name, and prepare your
            official membership form.
          </p>
        </div>

        <Stepper.Root
          linear
          className="space-y-6"
          beforeStepChange={async ({ direction, validate }) => {
            if (direction !== "next") {
              setErrors({});
              return true;
            }

            const result = await validate();

            if (!result.success) {
              setErrors(toErrors(result.issues));
              return false;
            }

            setErrors({});
            return true;
          }}
        >
          {({ stepper }) => {
            const account = stepper.data.get("accountName") ?? {
              accountName: "",
            };

            const applicant: MembershipPDFApplicant = {
              ...user,
              fullName: user.fullName,
              username: user.username,
              email: user.email,
              number: user.number,
              dateOfBirth: user.dateOfBirth,
              gender: user.gender,
              nationality: user.nationality,
              blood: user.blood,
              address: user.address,
              accountName: account.accountName,
            };

            const setAccountName = (accountName: string) => {
              stepper.data.set("accountName", { accountName });
              setErrors((previous) => ({
                ...previous,
                accountName: "",
              }));
            };

            return (
              <>
                {/* Step indicator */}
                <div className="rounded-2xl border bg-card p-4 sm:p-6">
                  <Stepper.List className="flex">
                    <Stepper.Items>
                      {(step, index) => (
                        <Stepper.Item
                          key={step.id}
                          step={step.id}
                          className="relative flex flex-1 justify-center"
                        >
                          {index < stepper.count - 1 && (
                            <Stepper.Separator
                              className={cn(
                                "absolute left-[calc(50%+1rem)] right-[calc(-50%+1rem)] top-4 h-px bg-border",
                                index < stepper.index && "bg-primary",
                              )}
                            />
                          )}

                          <Stepper.Trigger className="group relative z-10 flex min-w-0 flex-col items-center gap-2 text-center disabled:cursor-not-allowed">
                            <Stepper.Indicator
                              className={cn(
                                "grid size-9 shrink-0 place-items-center rounded-full border bg-background text-xs font-semibold transition-colors sm:size-10 sm:text-sm",
                                "data-[status=active]:border-primary data-[status=active]:bg-primary data-[status=active]:text-primary-foreground",
                                "data-[status=previous]:border-primary data-[status=previous]:bg-primary data-[status=previous]:text-primary-foreground",
                                "data-[status=upcoming]:border-border data-[status=upcoming]:text-muted-foreground",
                              )}
                            >
                              <span className="group-data-[status=previous]:hidden">
                                <step.icon className="size-5" />
                              </span>
                              <Check className="hidden size-4 group-data-[status=previous]:block" />
                            </Stepper.Indicator>

                            <span className="max-w-24 text-xs font-medium leading-4 text-muted-foreground sm:max-w-none sm:text-sm">
                              <Stepper.Title />
                            </span>
                          </Stepper.Trigger>
                        </Stepper.Item>
                      )}
                    </Stepper.Items>
                  </Stepper.List>
                </div>

                {/* Step 1: Profile information */}
                <Stepper.Content
                  step="information"
                  className="rounded-2xl border bg-card"
                >
                  <StepHeader
                    title="Your Information"
                    description="Retrieved from your registered profile."
                  />

                  <div className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-7 border-y">
                    {[
                      { label: "Full Name", value: user.fullName },
                      { label: "Username / UID", value: user.username },
                      { label: "Email Address", value: user.email },
                      { label: "Phone Number", value: user.number },
                      {
                        label: "Date of Birth",
                        value: user.dateOfBirth
                          ? new Date(user.dateOfBirth).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )
                          : "Not provided",
                      },
                      {
                        label: "Gender",
                        value: user.gender.toLocaleUpperCase(),
                      },
                      {
                        label: "Nationality",
                        value: user.nationality.toLocaleUpperCase(),
                      },
                      { label: "Address", value: user.address },
                    ].map((field) => (
                      <div
                        key={field.label}
                        className="min-w-0 border-b border-border/70 pb-3"
                      >
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {field.label}
                        </p>
                        <p className="mt-2 wrap-break-words text-sm font-medium text-foreground">
                          {field.value?.trim() || "Not provided"}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="m-5 sm:m-7 flex gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
                    <Info className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      Please ensure that all information provided above matches
                      your National Identity Card (NID) or Birth Registration
                      Certificate. Any discrepancies may affect the verification
                      and approval of your membership application.
                    </p>
                  </div>

                  <div className="flex flex-col-reverse gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
                    <a
                      href="/profile"
                      className={buttonVariants({ variant: "outline" })}
                    >
                      Edit Profile
                    </a>

                    <Stepper.Next className={buttonVariants()}>
                      Continue
                      <ArrowRight className="ml-2 size-4" />
                    </Stepper.Next>
                  </div>
                </Stepper.Content>

                {/* Step 2: Account name */}
                <Stepper.Content
                  step="accountName"
                  className="rounded-2xl border bg-card"
                >
                  <StepHeader
                    title="Account Name"
                    description="Enter the name you want associated with your ABF account.
                      Your account will be created only after membership
                      approval."
                  />

                  <div className="space-y-2 p-5 sm:p-7 border-y">
                    <label
                      htmlFor="accountName"
                      className="text-sm font-medium text-foreground"
                    >
                      Preferred account name
                      <span className="ml-1 text-destructive">*</span>
                    </label>

                    <Input
                      id="accountName"
                      name="accountName"
                      value={account.accountName}
                      onChange={(event) => setAccountName(event.target.value)}
                      placeholder="Enter your preferred account name"
                      maxLength={20}
                      aria-invalid={Boolean(errors.accountName)}
                    />

                    {errors.accountName && (
                      <p className="text-xs text-destructive">
                        {errors.accountName}
                      </p>
                    )}
                  </div>

                  <div className="m-5 sm:m-7 flex gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4">
                    <Info className="mt-0.5 size-5 shrink-0 text-primary" />
                    <p className="text-sm leading-6 text-muted-foreground">
                      This is a preferred name, not a confirmed account number.
                      The final account details can be assigned after admin
                      approval.
                    </p>
                  </div>

                  <div className="flex justify-between gap-3 p-5 sm:p-7">
                    <Stepper.Prev
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <ArrowLeft className="mr-2 size-4" />
                      Back
                    </Stepper.Prev>

                    <Stepper.Next className={buttonVariants()}>
                      Preview Form
                      <ArrowRight className="ml-2 size-4" />
                    </Stepper.Next>
                  </div>
                </Stepper.Content>

                {/* Step 3: PDF preview */}
                <Stepper.Content
                  step="preview"
                  className="rounded-2xl border bg-card"
                >
                  <StepHeader
                    title="Preview Membership Form"
                    description="Review the official form before downloading it."
                  />

                  <div className="p-5 sm:p-7 border-y">
                    <PDFViewer
                      width="100%"
                      height={650}
                      showToolbar
                      className="rounded-xl border border-border"
                    >
                      <MembershipPDF {...applicant} />
                    </PDFViewer>
                  </div>

                  <div className="flex justify-between gap-3 p-5 sm:p-7">
                    <Stepper.Prev
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <ArrowLeft className="mr-2 size-4" />
                      Back
                    </Stepper.Prev>

                    <Stepper.Next className={buttonVariants()}>
                      Continue to Download
                      <ArrowRight className="ml-2 size-4" />
                    </Stepper.Next>
                  </div>
                </Stepper.Content>

                {/* Step 4: Download */}
                <Stepper.Content
                  step="download"
                  className="rounded-2xl border border-border bg-card"
                >
                  <div className="p-6 text-center sm:p-10">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                      <Download className="size-7" />
                    </div>

                    <h2 className="mt-5 text-xl font-semibold text-foreground">
                      Your Form Is Ready
                    </h2>

                    <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
                      Download the membership application and print it in{" "}
                      <span className="font-bold">full color</span>. Complete
                      all required sections, sign the form, and submit the
                      printed physical copy to the authorized ABF authority.
                    </p>

                    <div className="mx-auto mt-6 flex max-w-lg gap-3 rounded-xl border border-primary/15 bg-primary/5 p-4 text-left">
                      <ShieldCheck className="mt-0.5 size-5 shrink-0 text-primary" />
                      <p className="text-sm leading-6 text-muted-foreground">
                        Downloading this form does not create your account or
                        make you a member. Your membership requires physical
                        submission and admin approval.
                      </p>
                    </div>

                    <PDFDownloadLink
                      document={<MembershipPDF {...applicant} />}
                      fileName="ABF-Membership-Application.pdf"
                      className={cn(buttonVariants(), "mt-7")}
                    >
                      {({ loading }) =>
                        loading ? (
                          "Preparing PDF..."
                        ) : (
                          <>
                            <Download className="mr-2 size-4" />
                            Download Membership Form
                          </>
                        )
                      }
                    </PDFDownloadLink>
                  </div>

                  <div className="flex justify-start border-t border-border p-5 sm:p-7">
                    <Stepper.Prev
                      className={buttonVariants({ variant: "outline" })}
                    >
                      <ArrowLeft className="mr-2 size-4" />
                      Back to Preview
                    </Stepper.Prev>
                  </div>
                </Stepper.Content>
              </>
            );
          }}
        </Stepper.Root>
      </div>
    </main>
  );
};

export default Page;

type IStepHeader = {
  title: string;
  description: string;
};
const StepHeader: FC<IStepHeader> = ({ title, description }) => {
  return (
    <div className="p-5 sm:p-7 space-y-1.5">
      <h2 className="font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
};
