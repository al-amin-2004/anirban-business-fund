"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { adminCreateAccountSchema } from "@/schemas/adminCreateAccountSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/types";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import Input from "@/app/_components/ui/Input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type FormData = z.infer<typeof adminCreateAccountSchema>;

interface CreateAccountProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
}

const CreateAccount = ({ open, onClose, user }: CreateAccountProps) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(adminCreateAccountSchema),
    defaultValues: {
      accName: "",
      identification: {
        birthId: "",
        nid: "",
        dateOfBirth: "",
      },
    },
  });

  // প্রতিবার dialog খুললে form reset হবে
  useEffect(() => {
    if (open) {
      reset({
        accName: "",
        identification: {
          birthId: "",
          nid: "",
          dateOfBirth: "",
        },
      });
    }
  }, [open, user?._id, reset]);

  const closeDialog = () => {
    if (submitting) return;
    reset();
    onClose();
  };

  const onSubmit = async (values: FormData) => {
    if (!user?._id) {
      toast.add({
        type: "error",
        description: "Please select a user first",
      });
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/accounts/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: String(user._id),
          accName: values.accName,
          identification: {
            birthId: values.identification.birthId.trim() || undefined,
            nid: values.identification.nid.trim() || undefined,
            dateOfBirth: values.identification.dateOfBirth,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        toast.add({
          type: "error",
          description: data.message || "Failed to create account",
        });
        return;
      }

      toast.add({
        type: "success",
        description: "Account created successfully",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Create account error:", error);

      toast.add({
        type: "error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) closeDialog();
      }}
    >
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Account</DialogTitle>
          <DialogDescription>
            Create an ABF account for this user. NID or Birth ID and date of
            birth are required.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Selected user */}
          <div className="rounded-lg border bg-muted/30 p-3">
            <p className="text-xs text-muted-foreground">Selected User</p>
            <p className="font-medium">
              {user?.fullName || "No user selected"}
            </p>
            {user?.username && (
              <p className="text-sm text-muted-foreground">{user.username}</p>
            )}
          </div>

          {/* Account Name */}
          <div className="space-y-2">
            <label htmlFor="accName" className="text-sm font-medium">
              Account Name <span className="text-destructive">*</span>
            </label>

            <Input
              id="accName"
              placeholder="e.g. Monthly Savings"
              {...register("accName")}
            />

            {errors.accName && (
              <p className="text-sm text-destructive">
                {errors.accName.message}
              </p>
            )}
          </div>

          {/* Identification */}
          <div className="border-t pt-4">
            <h3 className="mb-1 font-semibold">Identification</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Provide at least one: NID or Birth ID.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="birthId" className="text-sm font-medium">
                  Birth Registration ID
                </label>

                <Input
                  id="birthId"
                  placeholder="Enter Birth ID"
                  {...register("identification.birthId")}
                />

                {errors.identification?.birthId && (
                  <p className="text-sm text-destructive">
                    {errors.identification.birthId.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label htmlFor="nid" className="text-sm font-medium">
                  National ID (NID)
                </label>

                <Input
                  id="nid"
                  placeholder="Enter NID number"
                  {...register("identification.nid")}
                />

                {errors.identification?.nid && (
                  <p className="text-sm text-destructive">
                    {errors.identification.nid.message}
                  </p>
                )}
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label htmlFor="dateOfBirth" className="text-sm font-medium">
                  Date of Birth <span className="text-destructive">*</span>
                </label>

                <Input
                  id="dateOfBirth"
                  type="date"
                  {...register("identification.dateOfBirth")}
                />

                {errors.identification?.dateOfBirth && (
                  <p className="text-sm text-destructive">
                    {errors.identification.dateOfBirth.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={submitting}
              onClick={closeDialog}
            >
              Cancel
            </Button>

            <Button type="submit" disabled={submitting || !user}>
              {submitting ? "Creating..." : "Create Account"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateAccount;
