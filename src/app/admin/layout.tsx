import { SidebarProvider } from "@/providers/SidebarContext";
import AdminSidebar from "../_components/shared/AdminSidebar";
import AdminHeader from "../_components/shared/AdminHeader";
import { AllUsersProvider } from "@/providers/AllUsersContext";
import { getAuthUser } from "@/helpers/getUser";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthUser();

  if (!auth.success) redirect("/signin");

  if (auth.role !== "admin") redirect("/");

  return (
    <AllUsersProvider>
      <SidebarProvider>
        <main className="h-screen flex overflow-hidden" aria-hidden={false}>
          <AdminSidebar />

          <div className="flex-1 overflow-y-scroll">
            <AdminHeader />
            <section className="px-6 lg:px-14">{children}</section>
          </div>
        </main>
      </SidebarProvider>
    </AllUsersProvider>
  );
}
