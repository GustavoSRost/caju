// src/hooks/useActions.ts
import { useState, useCallback } from "react";
import { apiBase } from "~/server/api";
import { User, UserState } from "../types/userTypes";
import { ColumnStatus } from "~/enums/ColumnStatus";

const useAction = () => {
  const [status, setStatus] = useState<UserState["status"]>("idle");
  const [error, setError] = useState<string | null>(null);

  const performAction = useCallback(async (action: ColumnStatus, user: User) => {
    setStatus("loading");
    const route = "/registrations/" + user.id;
    try {
      switch (action) {
        case ColumnStatus.APPROVED:
          await apiBase.put(route, { ...user, status: ColumnStatus.APPROVED });
          break;
        case ColumnStatus.REPROVED:
          await apiBase.put(route, { ...user, status: ColumnStatus.REPROVED });
          break;
        case ColumnStatus.REVIEW:
          await apiBase.put(route, { ...user, status: ColumnStatus.REVIEW });
          break;
        case ColumnStatus.DELETED:
          await apiBase.delete(route);
          break;
        default:
          throw new Error(`Unknown action: ${action}`);
      }
      setStatus("succeeded");
    } catch (err) {
      setError("An error occurred while performing the action.");
      setStatus("failed");
      console.error(err);
    }
  }, []);

  return { status, error, performAction };
};

export default useAction;
