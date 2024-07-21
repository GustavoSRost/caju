import { useState, useEffect, useCallback } from "react";
import { apiBase } from "~/server/api";
import { User } from "~/types/userTypes";

const useRegistrations = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await apiBase.get<User[]>('/registrations');
      setUsers(response.data);
      setStatus("succeeded");
    } catch (err) {
      setError("An error occurred while fetching users.");
      setStatus("failed");
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, status, error, fetchUsers };
};

export default useRegistrations;
