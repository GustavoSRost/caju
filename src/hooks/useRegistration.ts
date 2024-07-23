import { useState, useEffect, useCallback } from "react";
import { apiBase } from "~/server/api";
import { User } from "~/types/userTypes";
import { FormData } from "~/types/form";

const useRegistrations = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<"idle" | "loading" | "succeeded" | "failed">("idle");
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = useCallback(async (cpf?: FormData["cpf"]) => {
    setStatus("loading");
    setError(null);
    try {
      const params = cpf ? { cpf } : {};
      const response = await apiBase.get<User[]>('/registrations', { params });

      if (cpf && response.data.length === 0) {
        setError('Digite um CPF válido.');
      } else {
        setError(null);
      }
      
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
