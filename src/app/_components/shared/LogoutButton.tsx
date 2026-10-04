import { FC } from "react";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";

const LogoutButton: FC<{ children: React.ReactNode }> = ({ children }) => {
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/signout", { method: "POST" });
      const data = await res.json();
      if (!res.ok)
        return toast.add({
          type: "error",
          description: data?.message || "Logout failed!",
        });
      toast.add({ type: "success", description: data?.message });
      redirect("/");
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

export default LogoutButton;
