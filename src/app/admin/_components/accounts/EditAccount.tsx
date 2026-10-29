"use client";

import { FC, useEffect } from "react";
import { adminUpdateAccountSchema } from "@/schemas/adminUpdateAccountScema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useForm } from "react-hook-form";
import { IAccount } from "@/types";
import ErrorMessage from "@/app/_components/ui/ErrorMessage";
import Input from "@/app/_components/ui/Input";
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

interface EditAccountProps {
  account: IAccount | null;
  open: boolean;
  title: string;
  onClose: () => void;
}

const EditAccount: FC<EditAccountProps> = ({
  account,
  open,
  onClose,
  title,
}) => {
  type AdminUpdateprofileData = z.infer<typeof adminUpdateAccountSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<AdminUpdateprofileData>({
    resolver: zodResolver(adminUpdateAccountSchema),
  });

  // load Initial data
  useEffect(() => {
    if (account) {
      reset({
        accName: account.accName || "",
        accNumber: account.accNumber || "",
        identification: {
          nid: account.identification?.nid || "",
          birthId: account.identification?.birthId || "",
          dateOfBirth: account.identification.dateOfBirth
            ? new Date(account.identification.dateOfBirth)
                .toISOString()
                .split("T")[0]
            : "",
        },
      });
    }
  }, [account, reset]);

  const onSubmit = async (data: AdminUpdateprofileData) => {
    try {
      const res = await fetch(`/api/admin/accounts/update`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          accountId: account?._id,
        }),
      });

      if (!res.ok) {
        toast.add({ type: "error", description: "Update failed!" });
        return;
      }

      toast.add({
        type: "success",
        description: "Account updated successfully.",
      });
      reset(data);
      onClose();
    } catch (error) {
      console.error("Update Error:", error);
      toast.add({ type: "error", description: "Failed to update account!" });
    }
  };
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="min-w-2xl">
        <DialogHeader className="border-b pb-2.5">
          <DialogTitle>Edit {title}</DialogTitle>
          <DialogDescription>
            Update the account information below. Make sure to fill in all
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label htmlFor="accName">Account Name</label>
            <Input id="accName" {...register("accName")} />
            {errors.accName && (
              <ErrorMessage>{errors.accName.message}</ErrorMessage>
            )}
          </div>

          {/* Username */}
          <div>
            <label htmlFor="accNumber">Account Number</label>
            <Input id="accNumber" {...register("accNumber")} />
            {errors.accNumber && (
              <ErrorMessage>{errors.accNumber.message}</ErrorMessage>
            )}
          </div>

          {/* identification */}
          <div>
            <label htmlFor="nid">National ID</label>
            <Input id="nid" {...register("identification.nid")} />
            {errors.identification?.nid && (
              <ErrorMessage>{errors.identification.nid.message}</ErrorMessage>
            )}
          </div>

          {/* Birth ID */}
          <div>
            <label htmlFor="birthId">Birth ID</label>
            <Input id="birthId" {...register("identification.birthId")} />
            {errors.identification?.birthId && (
              <ErrorMessage>
                {errors.identification.birthId.message}
              </ErrorMessage>
            )}
          </div>

          {/* Date of Birth */}
          <div>
            <label htmlFor="dateOfBirth">Date of Birth</label>
            <Input
              id="dateOfBirth"
              type="date"
              {...register("identification.dateOfBirth")}
            />
            {errors.identification?.dateOfBirth && (
              <ErrorMessage>
                {errors.identification.dateOfBirth.message}
              </ErrorMessage>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />

          <Button
            type="submit"
            disabled={!isDirty || isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Updating..." : "Update Account"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAccount;
