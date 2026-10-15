import { SidebarProvider } from "@/providers/SidebarContext";
import AdminSidebar from "../_components/shared/AdminSidebar";
import AdminHeader from "../_components/shared/AdminHeader";
import { AllUsersProvider } from "@/providers/AllUsersContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
