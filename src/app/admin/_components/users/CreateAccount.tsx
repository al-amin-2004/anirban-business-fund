// "use client";

// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { IUser } from "@/types";
// import { Button } from "@/components/ui/button";
// import Input from "@/app/_components/ui/Input";
// import { toast } from "@/components/ui/toast";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";

// const schema = z
//   .object({
//     accName: z
//       .string()
//       .trim()
//       .min(2, "Account name is required")
//       .max(20, "Account name cannot exceed 20 characters"),
//     // accNumber: z.string().trim().min(1, "Account number is required"),
//     identification: z.object({
//       birthId: z.string().trim(),
//       nid: z.string().trim(),
//       dateOfBirth: z.string().min(1, "Date of birth is required"),
//     }),
//   })
//   .superRefine((data, ctx) => {
//     if (!data.identification.birthId && !data.identification.nid) {
//       ctx.addIssue({
//         code: "custom",
//         path: ["identification", "nid"],
//         message: "NID or Birth ID is required",
//       });
//     }
//   });

// type FormData = z.infer<typeof schema>;

// interface CreateAccountProps {
//   user: IUser | null;
//   open: boolean;
//   onClose: () => void;
// }

// const CreateAccount = ({ open, onClose, user }: CreateAccountProps) => {
//   const [submitting, setSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<FormData>({
//     resolver: zodResolver(schema),
//     defaultValues: {
//       accName: "",
//       identification: {
//         birthId: "",
//         nid: "",
//         dateOfBirth: "",
//       },
//     },
//   });

//   const closeDialog = () => {
//     reset();
//     onClose();
//   };

//   const onSubmit = async (values: FormData) => {
//     setSubmitting(true);

//     try {
//       const res = await fetch("/api/admin/accounts", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...values,
//           identification: {
//             birthId: values.identification.birthId || undefined,
//             nid: values.identification.nid || undefined,
//             dateOfBirth: values.identification.dateOfBirth,
//           },
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok || !data.success) {
//         toast.add({
//           type: "error",
//           description: data.message || "Failed to create account",
//         });
//         return;
//       }

//       toast.add({
//         type: "success",
//         description: "Account created successfully",
//       });
//       reset();
//       onClose();
//     } catch (error) {
//       console.error("Create account error:", error);
//       toast.add({
//         type: "error",
//         description: "Something went wrong. Please try again.",
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Dialog
//       open={open}
//       onOpenChange={(nextOpen) => {
//         if (!nextOpen && !submitting) closeDialog();
//       }}
//     >
//       <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
//         <DialogHeader>
//           <DialogTitle>Create Account</DialogTitle>
//           <DialogDescription>
//             Create a new ABF account for a member. NID or Birth ID and date of
//             birth are required.
//           </DialogDescription>
//         </DialogHeader>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//           <div className="grid gap-4 sm:grid-cols-2">
//             {/* Member */}
//             <div className="space-y-2">{user?.fullName}</div>

//             {/* Account Name */}
//             <div className="space-y-2">
//               <label htmlFor="accName" className="text-sm font-medium">
//                 Account Name <span className="text-destructive">*</span>
//               </label>

//               <Input
//                 id="accName"
//                 placeholder="e.g. Monthly Savings"
//                 {...register("accName")}
//               />

//               {errors.accName && (
//                 <p className="text-sm text-destructive">
//                   {errors.accName.message}
//                 </p>
//               )}
//             </div>
//           </div>

//           <div className="border-t pt-4">
//             <h3 className="mb-1 font-semibold">Identification</h3>
//             <p className="mb-4 text-sm text-muted-foreground">
//               Provide at least one: NID or Birth ID.
//             </p>

//             <div className="grid gap-4 sm:grid-cols-2">
//               {/* Birth ID */}
//               <div className="space-y-2">
//                 <label htmlFor="birthId" className="text-sm font-medium">
//                   Birth Registration ID
//                 </label>

//                 <Input
//                   id="birthId"
//                   placeholder="Enter Birth ID"
//                   {...register("identification.birthId")}
//                 />

//                 {errors.identification?.birthId && (
//                   <p className="text-sm text-destructive">
//                     {errors.identification.birthId.message}
//                   </p>
//                 )}
//               </div>

//               {/* NID */}
//               <div className="space-y-2">
//                 <label htmlFor="nid" className="text-sm font-medium">
//                   National ID (NID)
//                 </label>

//                 <Input
//                   id="nid"
//                   placeholder="Enter NID number"
//                   {...register("identification.nid")}
//                 />

//                 {errors.identification?.nid && (
//                   <p className="text-sm text-destructive">
//                     {errors.identification.nid.message}
//                   </p>
//                 )}
//               </div>

//               {/* Date of Birth */}
//               <div className="space-y-2 sm:col-span-2">
//                 <label htmlFor="dateOfBirth" className="text-sm font-medium">
//                   Date of Birth <span className="text-destructive">*</span>
//                 </label>

//                 <Input
//                   id="dateOfBirth"
//                   type="date"
//                   {...register("identification.dateOfBirth")}
//                 />

//                 {errors.identification?.dateOfBirth && (
//                   <p className="text-sm text-destructive">
//                     {errors.identification.dateOfBirth.message}
//                   </p>
//                 )}
//               </div>
//             </div>
//           </div>

//           <DialogFooter>
//             <Button
//               type="button"
//               variant="outline"
//               disabled={submitting}
//               onClick={closeDialog}
//             >
//               Cancel
//             </Button>

//             <Button type="submit" disabled={submitting}>
//               {submitting ? "Creating..." : "Create Account"}
//             </Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default CreateAccount;

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/types";
import { Button } from "@/components/ui/button";
import Input from "@/app/_components/ui/Input";
import { toast } from "@/components/ui/toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const schema = z
  .object({
    accName: z
      .string()
      .trim()
      .min(2, "Account name must be at least 2 characters")
      .max(20, "Account name cannot exceed 20 characters"),

    identification: z.object({
      birthId: z.string().trim(),
      nid: z.string().trim(),
      dateOfBirth: z.string().min(1, "Date of birth is required"),
    }),
  })
  .superRefine((data, ctx) => {
    if (!data.identification.birthId && !data.identification.nid) {
      ctx.addIssue({
        code: "custom",
        path: ["identification", "nid"],
        message: "NID or Birth ID is required",
      });
    }
  });

type FormData = z.infer<typeof schema>;

interface CreateAccountProps {
  user: IUser | null;
  open: boolean;
  onClose: () => void;
}

const CreateAccount = ({ open, onClose, user }: CreateAccountProps) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
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
