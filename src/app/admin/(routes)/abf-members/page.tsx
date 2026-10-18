"use client";

import { useMemo, useState } from "react";
import { IUser } from "@/types";
import { EllipsisVertical } from "lucide-react";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import Input from "@/app/_components/ui/Input";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAllUsers } from "@/providers/AllUsersContext";
import ViewProfile from "../../_components/ViewProfile";
import EditProfile from "../../_components/EditProfile";
import ChangeRole from "../../_components/ChangeRole";

const Page = () => {
  const { allUsers } = useAllUsers();
  const [search, setSearch] = useState("");

  const [viewProfile, setViewProfile] = useState<IUser | null>(null);
  const [editProfile, setEditProfile] = useState<IUser | null>(null);
  const [changeRole, setChangeRole] = useState<IUser | null>(null);

  const filteredMembers = useMemo(() => {
    return allUsers.filter((user) => {
      const allMembers = user.role === "member" || user.role === "treasurer";

      const keyword = search.toLowerCase();

      const matchSearch =
        user.fullName.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword);

      return allMembers && matchSearch;
    });
  }, [allUsers, search]);

  return (
    <main className="space-y-4 pb-4">
      {/* Page heading */}
      <PagesTitle
        title="Members"
        description="Manage ABF members and membership status information."
      />

      {/* Filters */}
      <Input
        type="text"
        placeholder="Search by name, username or email..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="md:max-w-90"
      />

      <section className="border rounded-xl overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="h-12 bg-primary">
            <tr>
              <th className="border-x w-1/16">#</th>
              <th className="border-x w-4/16">Name</th>
              <th className="border-x w-3/16">Username</th>
              <th className="border-x w-4/16">Email</th>
              <th className="border-x w-2/16">Account length</th>
              <th className="border-x w-2/16">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredMembers.map((member, i) => (
              <tr
                key={member._id}
                className="h-10 border-t text-center even:bg-muted-foreground/5"
              >
                <td className="px-2 border-x">{i + 1}</td>
                <td className="px-2 border-x text-start">{member.fullName}</td>
                <td className="px-2 border-x text-start">{member.username}</td>
                <td className="px-2 border-x text-start">{member.email}</td>
                <td className="px-2 border-x">1</td>
                <td className="px-2 border-x">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-1.5">
                      <DropdownMenuItem onClick={() => setViewProfile(member)}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditProfile(member)}>
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setChangeRole(member)}>
                        Change Role
                      </DropdownMenuItem>
                      <DropdownMenuItem disabled>Delete User</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ====== All action Dialog components here ====== */}
      <ViewProfile
        title="Member"
        open={!!viewProfile}
        onClose={() => setViewProfile(null)}
        user={viewProfile}
      />
      <EditProfile
        title="Member"
        open={!!editProfile}
        onClose={() => setEditProfile(null)}
        user={editProfile}
      />
      <ChangeRole
        title="Member"
        open={!!changeRole}
        onClose={() => setChangeRole(null)}
        user={changeRole}
      />
    </main>
  );
};

export default Page;
