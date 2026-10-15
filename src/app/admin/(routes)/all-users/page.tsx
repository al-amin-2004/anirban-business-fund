"use client";

import { useMemo, useState } from "react";
import { useAllUsers } from "@/providers/AllUsersContext";
import { RoleBadge } from "@/app/_components/ui/RoleBadge";
import { Option, Select } from "@/app/_components/ui/Select";
import { IUser, Role } from "@/types";
import { role } from "@/constants/user";
import { EllipsisVertical } from "lucide-react";
import PagesTitle from "@/app/_components/ui/PagesTitle";
import Input from "@/app/_components/ui/Input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Page = () => {
  const { allUsers } = useAllUsers();
  const [search, setSearch] = useState<string>("");
  const [roleFilter, setRoleFilter] = useState<"all" | Role>("all");
  const [viewProfile, setViewProfile] = useState<IUser | null>(null);
  const [editProfile, setEditProfile] = useState<IUser | null>(null);
  const [changeRole, setChangeRole] = useState<IUser | null>(null);

  const filteredUsers = useMemo(() => {
    return allUsers.filter((user) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        user.fullName.toLowerCase().includes(keyword) ||
        user.username.toLowerCase().includes(keyword) ||
        user.email.toLowerCase().includes(keyword);

      const matchRole = roleFilter === "all" ? true : user.role === roleFilter;

      return matchSearch && matchRole;
    });
  }, [allUsers, search, roleFilter]);

  return (
    <main className="space-y-4 pb-4">
      {/* Page heading */}
      <PagesTitle
        title="All Users"
        description="Manage ABF all Users information."
      />

      {/* Filters */}
      <section className="flex items-center gap-4">
        <Input
          type="text"
          placeholder="Search by name, username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:max-w-90"
        />

        <Select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value as "all" | Role)}
          className="md:max-w-50"
        >
          <Option value="all">All Roles</Option>
          {role.map((r) => (
            <Option key={r} value={r}>
              {r}
            </Option>
          ))}
        </Select>
      </section>

      <section className="border rounded-xl overflow-hidden">
        <table className="w-full table-fixed">
          <thead className="h-12 bg-primary">
            <tr>
              <th className="border-x w-1/20">#</th>
              <th className="border-x w-5/20">Name</th>
              <th className="border-x w-4/20">Username</th>
              <th className="border-x w-5/20 ">Email</th>
              <th className="border-x w-3/20">Role</th>
              <th className="border-s w-2/20">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredUsers.map((user, i) => (
              <tr
                key={user._id}
                className="h-10 border-t text-center even:bg-muted-foreground/5"
              >
                <td className="px-2 border-x">{i + 1}</td>
                <td className="px-2 border-x text-start">{user.fullName}</td>
                <td className="px-2 border-x text-start">{user.username}</td>
                <td className="px-2 border-x text-start">{user.email}</td>
                <td className="px-2 border-x">
                  <RoleBadge role={user.role} />
                </td>
                <td className="px-2 border-x">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      <EllipsisVertical />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="p-1.5">
                      <DropdownMenuItem onClick={() => setViewProfile(user)}>
                        View Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setEditProfile(user)}>
                        Edit Profile
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setChangeRole(user)}>
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
    </main>
  );
};

export default Page;
