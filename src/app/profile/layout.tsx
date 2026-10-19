import { SidebarProvider } from "@/providers/SidebarContext";
import ProfileSidebar from "../_components/shared/ProfileSidebar";
import ProfileHeader from "../_components/shared/ProfileHeader";
import { UserProvider } from "@/providers/UserContext";
import { getAuthUser } from "@/helpers/getUser";
import { redirect } from "next/navigation";

export default async function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = await getAuthUser();
  if (!auth.success) redirect("/signin");

  return (
    <UserProvider>
      <SidebarProvider>
        <main className="h-screen flex overflow-hidden" aria-hidden={false}>
          <ProfileSidebar />

          <div className="flex-1 overflow-y-scroll">
            <ProfileHeader />
            <section className="px-6 lg:px-14">{children}</section>
          </div>
        </main>
      </SidebarProvider>
    </UserProvider>
  );
}
