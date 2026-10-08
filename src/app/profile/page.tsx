"use client";

import { FC, ReactNode, useEffect, useState } from "react";
import { useUser } from "@/providers/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Loading2 } from "@/icons";
import { blood, country, gender } from "@/constants/user";
import { Option, Select } from "../_components/ui/Select";
import { useForm } from "react-hook-form";
import { updateProfileSchema } from "@/schemas/UpdateProfileSchema";
import Image from "next/image";
import z from "zod";
import ProfilePagesTitle from "../_components/ui/ProfilePagesTitle";
import Input from "../_components/ui/Input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Cake,
  Droplets,
  Flag,
  LucideProps,
  Mail,
  MapPinned,
  NotepadText,
  Pencil,
  Phone,
  ShieldCheck,
  UserRound,
  UsersRound,
  VenusAndMars,
} from "lucide-react";

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

const Profile = () => {
  const { user, loading, refreshUser } = useUser();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      fullName: "",
      gender: "",
      dateOfBirth: "",
      blood: "",
      nationality: "",
      address: "",
    },
  });

  useEffect(() => {
    if (!user) return;

    reset({
      fullName: user.fullName || "",
      gender: user.gender || "",
      dateOfBirth: user.dateOfBirth
        ? new Date(user.dateOfBirth).toISOString().split("T")[0]
        : "",
      blood: user.blood || "",
      nationality: user.nationality || "",
      address: user.address || "",
    });
  }, [user, reset]);

  // Cleanup preview URL
  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith("blob:")) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  // Avatar selection
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.add({
        type: "error",
        title: "Image too large",
        description: "Image size must be less than 5MB.",
      });

      event.target.value = "";
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setAvatarFile(file);
    setAvatarPreview(previewUrl);
  };

  const onSubmit = async (formData: UpdateProfileFormData) => {
    try {
      let uploadedImageUrl = user?.avatar || "";
      let uploadedImageId = user?.avatarId || "";

      if (avatarFile) {
        const imgForm = new FormData();
        imgForm.append("file", avatarFile);

        const res = await fetch("/api/users/update", {
          method: "POST",
          body: imgForm,
        });

        const data = await res.json();

        if (!res.ok || !data.success)
          throw new Error(data.message || "Avatar upload failed.");

        uploadedImageUrl = data.result.secure_url;
        uploadedImageId = data.result.public_id;
      }

      // Update User Profile ===
      const res = await fetch("/api/users/update", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          avatar: uploadedImageUrl,
          avatarId: uploadedImageId,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Failed to update User");

      toast.add({
        type: "success",
        title: "Profile updated",
        description: data.message,
        timeout: 2000,
      });
      refreshUser();
      reset(formData);
    } catch (error) {
      console.error("Update Error:", error);
      toast.add({
        type: "error",
        title: "Update failed",
        description: "Failed to update Profile!",
      });
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-85px)]">
        <Loading2 />
      </div>
    );

  if (!user) {
    return (
      <div className="flex h-[calc(100vh-85px)] items-center justify-center">
        <p className="text-muted-foreground">User data not found.</p>
      </div>
    );
  }

  const currentAvatar = avatarPreview || user.avatar || "";
  return (
    <main className="space-y-4 pb-4">
      {/* ====== PAGE TITLE COMPONENT ====== */}
      <ProfilePagesTitle
        title="Profile"
        description="Manage your personal information and profile preferences."
      />

      {/* ======== PROFILE HERO ========= */}
      <section className="relative overflow-hidden rounded-xl bg-[#0B3B22]">
        {/* Decorative background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-10 -top-20 size-80 rounded-full border-70 border-white/5"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 right-24 size-72 rounded-full border-55 border-[#D4A72C]/10"
        />

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between p-4 md:p-8">
          {/* Identity */}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="relative shrink-0">
              <div className="size-24 md:size-35 border-4 border-foreground rounded-full overflow-hidden flex items-center justify-center">
                {currentAvatar ? (
                  <Image
                    src={currentAvatar}
                    alt={user.username}
                    width={300}
                    height={300}
                    priority
                    className="size-full object-cover"
                  />
                ) : (
                  <span>No added!</span>
                )}
              </div>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold md:text-3xl">
                  {user.fullName}
                </h2>

                <div className="w-fit flex items-center gap-1 bg-accent/30 p-0.5 px-1.5 uppercase rounded-full text-xs">
                  {user.role}
                </div>
              </div>

              <p className="mt-1 text-sm text-muted-foreground md:text-base">
                {user.username}
              </p>

              <p className="text-sm md:text-base text-muted-foreground">
                {user.address}
              </p>
            </div>
          </div>

          {/* Edit button */}
          <label
            htmlFor="avatar-upload"
            className="inline-flex items-center text-sm py-2 px-2.5 border-border hover:bg-muted dark:border-input bg-primary dark:hover:bg-input rounded-full cursor-pointer"
          >
            <Pencil className="mr-2 size-4" />
            Edit Avatar
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>

        {/* Bottom information */}
        <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm border-t bg-black/5 p-4 px-6 md:px-8">
          <span className="font-medium">Good Morning 👋</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="size-4 text-[#D4A72C]" />
            <span className="text-white/60">Status</span>
            <span className="font-medium">Active </span>
          </div>
        </div>
      </section>

      <Separator />

      {/* ========= CONTENT GRID ========== */}
      <section className="grid gap-6 lg:grid-cols-5">
        {/* LEFT */}
        <div
          className="space-y-6
          col-span-2 lg:col-span-3"
        >
          {/* Profile Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
              <CardDescription>
                Quick information about your profile.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 sm:grid-cols-2">
                {/* Full Name */}
                <ProfileContentBox
                  title="Full Name"
                  icon={NotepadText}
                  des={user.fullName}
                />

                {/* Username */}
                <ProfileContentBox
                  title="Username"
                  icon={UserRound}
                  des={user.username}
                />

                {/* Email */}
                <ProfileContentBox title="Email" icon={Mail} des={user.email} />

                {/* Phone  */}
                <ProfileContentBox
                  title="Phone"
                  icon={Phone}
                  des={user.number ?? "Not added"}
                />

                {/* Gender  */}
                <ProfileContentBox
                  classname="uppercase"
                  title="Gender"
                  icon={VenusAndMars}
                  des={user.gender}
                />

                {/* Date of Birth */}
                <ProfileContentBox
                  title="Date of Birth"
                  icon={Cake}
                  des={
                    user.dateOfBirth
                      ? new Date(user.dateOfBirth).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })
                      : "Not added"
                  }
                />

                {/* Nationality */}
                <ProfileContentBox
                  classname="capitalize"
                  title="Nationality"
                  icon={Flag}
                  des={user.nationality ?? "Not added"}
                />

                {/* Blood */}
                <ProfileContentBox
                  title="Blood"
                  icon={Droplets}
                  des={user.blood ?? "Not added"}
                />

                {/* Address */}
                <ProfileContentBox
                  classname="col-span-2"
                  title="Address"
                  icon={MapPinned}
                  des={user.address || "Not added"}
                />
              </div>
            </CardContent>
          </Card>

          {/* Membership */}
          <Card>
            <CardHeader>
              <CardTitle>Membership</CardTitle>

              <CardDescription>
                Your current ABF membership status.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="flex items-center justify-between rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <UsersRound className="size-5" />
                  </div>

                  <div>
                    <p className="font-semibold">Not a Member</p>

                    <p className="text-xs text-muted-foreground">
                      Apply for ABF membership
                    </p>
                  </div>
                </div>

                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          {/* Edit Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Edit your personal information.</CardDescription>
            </CardHeader>

            <CardContent>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="grid lg:grid-cols-2 gap-x-3 gap-y-4"
              >
                {/* Name */}
                <InputBox htmlFor="name" label="Name" type="required">
                  <Input id="name" type="text" {...register("fullName")} />
                  {errors.fullName && (
                    <p className="text-xs text-destructive">
                      {errors.fullName.message}
                    </p>
                  )}
                </InputBox>

                {/* Gender */}
                <InputBox htmlFor="gender" label="Gender">
                  <Select id="gender" {...register("gender")}>
                    {gender.map((gender) => (
                      <Option key={gender} value={gender}>
                        {gender}
                      </Option>
                    ))}
                  </Select>
                </InputBox>

                {/* Date of Birth */}
                <InputBox
                  htmlFor="dateOfBirth"
                  label="Date of Birth"
                  type="optional"
                >
                  <Input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-xs text-destructive">
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </InputBox>

                {/* Blood */}
                <InputBox htmlFor="blood" label="Blood">
                  <Select id="blood" {...register("blood")}>
                    {blood.map((blood) => (
                      <Option key={blood} value={blood}>
                        {blood}
                      </Option>
                    ))}
                  </Select>
                </InputBox>

                {/* Nationality */}
                <InputBox htmlFor="nationality" label="Nationality">
                  <Select id="nationality" {...register("nationality")}>
                    {country.map((country) => (
                      <Option key={country} value={country}>
                        {country}
                      </Option>
                    ))}
                  </Select>
                </InputBox>

                {/* Address */}
                <InputBox
                  htmlFor="address"
                  label="Address"
                  type="optional"
                  className="col-span-2"
                >
                  <textarea
                    id="address"
                    rows={3}
                    placeholder="Inter your address..."
                    {...register("address")}
                    className="w-full border border-gray-700 rounded-sm md:rounded-md resize-none p-2"
                  />
                </InputBox>

                <div className="col-span-2 flex justify-end">
                  <Button
                    type="submit"
                    disabled={(!isDirty && !avatarFile) || isSubmitting}
                  >
                    <Pencil className="mr-2 size-4" />
                    {isSubmitting ? "Saving..." : "Save Information"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
};

export default Profile;

// Profile Content Box Component ===
type ProfileContentBoxType = {
  title: string;
  icon: React.FC<LucideProps>;
  des: string;
  classname?: string;
};
export const ProfileContentBox: FC<ProfileContentBoxType> = ({
  title,
  icon: Icon,
  des,
  classname,
}) => {
  return (
    <div className={`flex items-start gap-3 ${classname}`}>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted text-foreground">
        <Icon className="size-5" />
      </div>

      <div>
        <label className="text-xs text-muted-foreground">{title}</label>
        <p className="font-semibold">{des}</p>
      </div>
    </div>
  );
};

// Input Box Component ===
type inputBoxType = {
  className?: string;
  children: ReactNode;
  label: string;
  htmlFor: string;
  type?: "optional" | "required";
};
export const InputBox: FC<inputBoxType> = ({
  className,
  children,
  label,
  htmlFor,
  type,
}) => {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}{" "}
        {type === "required" && (
          <span className="text-destructive text-xs">*</span>
        )}
        {type === "optional" && (
          <span className="text-muted-foreground text-xs">(optional)</span>
        )}
      </label>
      {children}
    </div>
  );
};
