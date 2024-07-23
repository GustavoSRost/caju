import { useState, useCallback } from "react";
import { apiBase } from "~/server/api";
import { User, UserState } from "../types/userTypes";
import { ColumnStatus } from "~/enums/ColumnStatus";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";


const useAction = () => {
  const [status, setStatus] = useState<UserState["status"]>("idle");
  const [error, setError] = useState<string | null>(null);

  const history = useHistory();



  const performAction = useCallback(
    async (action: ColumnStatus, user: User) => {
      setStatus("loading");
      const route = "/registrations/" + user.id;
      try {
        if (!Object.values(ColumnStatus).includes(action)) {
          throw new Error(`Unknown action: ${action}`);
        }

        if (action === ColumnStatus.APPROVED) {
          await apiBase.put(route, { ...user, status: ColumnStatus.APPROVED });
        }

        if (action === ColumnStatus.REPROVED) {
          await apiBase.put(route, { ...user, status: ColumnStatus.REPROVED });
        }

        if (action === ColumnStatus.REVIEW) {
          await apiBase.put(route, { ...user, status: ColumnStatus.REVIEW });
        }

        if (action === ColumnStatus.DELETED) {
          await apiBase.delete(route);
        }

        setStatus("succeeded");
      } catch (err) {
        setError("An error occurred while performing the action.");
        setStatus("failed");
        console.error("An error occurred while performing the action.",err);
      }
    },
    []
  );

  const createUser = useCallback(async (user: User) => {
    setStatus("loading");
    try {
      await apiBase.post("/registrations", {...user, status: ColumnStatus.REVIEW });
      history.push(routes.dashboard);
      setStatus("succeeded");
    } catch (err) {
      setError("An error occurred while creating the user.");
      setStatus("failed");
      console.error(err);
    }
  }, []);

  return { status, error, performAction, createUser };
};

export default useAction;
