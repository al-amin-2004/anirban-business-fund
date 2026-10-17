"use client";

import { FC, useEffect, useState } from "react";
import { adminUpdateUserSchema } from "@/schemas/adminUpdateUserScema";
import { zodResolver } from "@hookform/resolvers/zod";
import { blood, country, gender } from "@/constants/user";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { IUser } from "@/types";
import { Camera } from "lucide-react";
import { Option, Select } from "@/app/_components/ui/Select";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import Input from "@/app/_components/ui/Input";
import Image from "next/image";
import z from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface EditProfileProps {
  user: IUser | null;
  open: boolean;
  title: string;
  onClose: () => void;
}

const EditProfile: FC<EditProfileProps> = ({ user, open, onClose, title }) => {
  const [profilePic, setProfilePic] = useState<File | string | null>(null);
  const [profilePicChanged, setProfilePicChanged] = useState<boolean>(false);

  type AdminUpdateprofileData = z.infer<typeof adminUpdateUserSchema>;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AdminUpdateprofileData>({
    resolver: zodResolver(adminUpdateUserSchema),
  });

  // load Initial data
  useEffect(() => {
    if (user) {
      reset({
        avatarId: user.avatarId || "",
        fullName: user.fullName || "",
        username: user.username || "",
        email: user.email || "",
        number: user.number || "",
        blood: user.blood || "",
        nationality: user.nationality || "",
        address: user.address || "",
        gender: user.gender || "male",
        isVerifiedEmail: user.isVerifiedEmail ?? false,
        isVerifiedNumber: user.isVerifiedNumber ?? false,
        dateOfBirth: user.dateOfBirth
          ? new Date(user.dateOfBirth).toISOString().split("T")[0]
          : "",
      });
      setProfilePic(user?.avatar || null);
    }
  }, [user, reset]);

  const avatarId = watch("avatarId");

  const onSubmit = async (data: AdminUpdateprofileData) => {
    try {
      let uploadedImageUrl = typeof profilePic === "string" ? profilePic : "";
      let uploadedPublicId = avatarId;

      if (profilePic && profilePic instanceof File) {
        const imgForm = new FormData();
        imgForm.append("file", profilePic);

        if (avatarId) {
          imgForm.append("oldPublicId", avatarId);
        }

        const res = await fetch("/api/admin/users/update", {
          method: "POST",
          body: imgForm,
        });

        const data = await res.json();

        if (data.success) {
          uploadedImageUrl = data.result.secure_url;
          uploadedPublicId = data.result.public_id;
        }
      }

      const res = await fetch(`/api/admin/users/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          userId: user?._id,
          avatar: uploadedImageUrl,
          avatarId: uploadedPublicId,
        }),
      });

      if (!res.ok) {
        toast.add({ type: "error", description: "Update failed!" });
        return;
      }

      toast.add({
        type: "success",
        description: "User Profile updated successfully.",
      });
      reset(data);
      onClose();
    } catch (error) {
      console.error("Update Error:", error);
      toast.add({ type: "error", description: "Failed to update Profile!" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl">
        <DialogHeader className="border-b pb-2.5">
          <DialogTitle>Edit {title} Profile</DialogTitle>
          <DialogDescription>
            Update personal information and account details for this user.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-center">
          {profilePic ? (
            <Image
              src={
                typeof profilePic === "string"
                  ? profilePic
                  : URL.createObjectURL(profilePic)
              }
              width={200}
              height={200}
              priority
              alt="Profile"
              className="size-16 rounded-full"
            />
          ) : user?.avatar ? (
            <Image
              src={user?.avatar}
              width={200}
              height={200}
              alt="Profile"
              className="size-16 rounded-full"
            />
          ) : (
            <div className="flex justify-center items-center h-full">
              No Avatar
            </div>
          )}

          <div>
            <label htmlFor="avatar-upload">
              <Camera className="size-8 p-1.5 hover:bg-white/10 rounded cursor-pointer" />
            </label>
            <input
              id="avatar-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setProfilePic(e.target.files?.[0] || null);
                setProfilePicChanged(true);
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="fullName">First Name</label>
            <Input id="fullName" {...register("fullName")} />
            {errors.fullName && (
              <ErrorMessage>{errors.fullName.message}</ErrorMessage>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="username">Username</label>
            <Input id="username" {...register("username")} />
            {errors.username && (
              <ErrorMessage>{errors.username.message}</ErrorMessage>
            )}
          </div>

          {/* Date of Birth*/}
          <div>
            <label>Birth Date</label>
            <Input type="date" {...register("dateOfBirth")} />
            {errors.dateOfBirth && (
              <ErrorMessage>{errors.dateOfBirth.message}</ErrorMessage>
            )}
          </div>

          {/* Gender */}
          <div>
            <label htmlFor="gender">Gender</label>
            <Select id="gender" {...register("gender")}>
              {gender.map((gender) => (
                <Option key={gender} value={gender} className="capitalize">
                  {gender}
                </Option>
              ))}
            </Select>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email">Email</label>
            <Input id="email" {...register("email")} />
            {errors.email && (
              <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
          </div>

          {/* Verified Email */}
          <div className="h-9.5 flex items-center justify-between border px-3 rounded-md self-end">
            <label className="mb-0">Email Verified</label>
            <Input
              type="checkbox"
              {...register("isVerifiedEmail")}
              className="size-4"
            />
          </div>

          {/* Number */}
          <div>
            <label htmlFor="number">Number</label>
            <Input id="number" {...register("number")} />
            {errors.number && (
              <ErrorMessage>{errors.number.message}</ErrorMessage>
            )}
          </div>

          {/* Verified Number */}
          <div className="h-9.5 flex items-center justify-between border px-3 rounded-md self-end">
            <label className="mb-0">Number Verified</label>
            <Input
              type="checkbox"
              {...register("isVerifiedNumber")}
              className="size-4"
            />
          </div>

          {/* Blood */}
          <div>
            <label htmlFor="blood">Nationality</label>
            <Select id="blood" {...register("blood")}>
              <Option value="">Select</Option>
              {blood.map((blood) => (
                <Option key={blood} value={blood} className="capitalize">
                  {blood}
                </Option>
              ))}
            </Select>
            {errors.blood && (
              <ErrorMessage>{errors.blood.message}</ErrorMessage>
            )}
          </div>

          {/* Nationality */}
          <div>
            <label htmlFor="nationality">Nationality</label>
            <Select id="nationality" {...register("nationality")}>
              <Option value="">Select</Option>
              {country.map((country) => (
                <Option key={country} value={country} className="capitalize">
                  {country}
                </Option>
              ))}
            </Select>
            {errors.nationality && (
              <ErrorMessage>{errors.nationality.message}</ErrorMessage>
            )}
          </div>

          {/* Address */}
          <div className="md:col-span-2">
            <label htmlFor="address">Address</label>
            <Input id="address" {...register("address")} />
            {errors.address && (
              <ErrorMessage>{errors.address.message}</ErrorMessage>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancle</Button>} />

          <Button
            type="submit"
            disabled={(!isDirty || isSubmitting) && !profilePicChanged}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfile;
