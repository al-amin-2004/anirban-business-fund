"use client";

import { IUser } from "@/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface UsersContextType {
  allUsers: IUser[];
  loading: boolean;
}

const UsersContext = createContext<UsersContextType>({
  allUsers: [],
  loading: true,
});

export const AllUsersProvider = ({ children }: { children: ReactNode }) => {
  const [allUsers, setAllUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(false);
      try {
        const res = await fetch("/api/users");
        if (!res.ok) throw new Error("Failed to fetch users");

        const data = await res.json();
        setAllUsers(data.success ? data.users : []);
      } catch (error) {
        console.error("Users fetch error:", error);
        setAllUsers([]);
      } finally {
        setLoading(false);
      }
    };
    void fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ allUsers, loading }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useAllUsers = () => useContext(UsersContext);
