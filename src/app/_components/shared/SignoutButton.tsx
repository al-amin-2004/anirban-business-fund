import { FC } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

const SignoutButton: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok)
        return toast.add({
          type: "error",
          description: data?.message || "Signout failed!",
        });
      router.push("/");
      toast.add({ type: "success", description: data?.message });
    } catch (err) {
      console.error(err);
      toast.add({ type: "error", description: "Something went wrong!" });
    }
  };
  return (
    <Button variant="destructive" type="submit" onClick={handleLogout}>
      {children}
    </Button>
  );
};

export default SignoutButton;
